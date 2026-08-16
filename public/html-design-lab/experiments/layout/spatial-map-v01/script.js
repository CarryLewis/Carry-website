const viewport = document.getElementById("viewport");
const plane = document.getElementById("plane");
const note = document.querySelector("[data-note]");

const camera = { x: -40, y: -20, scale: 0.9 };
let dragging = false;
let last = { x: 0, y: 0 };

function apply() {
  plane.style.transform = `translate(${camera.x}px, ${camera.y}px) scale(${camera.scale})`;
  plane.classList.toggle("is-close", camera.scale >= 1.15);
}

function zoomBy(delta, origin) {
  const next = Math.min(2.2, Math.max(0.45, camera.scale * (delta > 0 ? 1.12 : 0.88)));
  const ox = origin?.x ?? viewport.clientWidth / 2;
  const oy = origin?.y ?? viewport.clientHeight / 2;
  const wx = (ox - camera.x) / camera.scale;
  const wy = (oy - camera.y) / camera.scale;
  camera.scale = next;
  camera.x = ox - wx * camera.scale;
  camera.y = oy - wy * camera.scale;
  apply();
}

viewport.addEventListener("pointerdown", (event) => {
  if (event.target.closest(".region")) return;
  dragging = true;
  viewport.classList.add("is-dragging");
  last = { x: event.clientX, y: event.clientY };
  viewport.setPointerCapture(event.pointerId);
});

viewport.addEventListener("pointermove", (event) => {
  if (!dragging) return;
  camera.x += event.clientX - last.x;
  camera.y += event.clientY - last.y;
  last = { x: event.clientX, y: event.clientY };
  apply();
});

viewport.addEventListener("pointerup", () => {
  dragging = false;
  viewport.classList.remove("is-dragging");
});

viewport.addEventListener(
  "wheel",
  (event) => {
    event.preventDefault();
    const rect = viewport.getBoundingClientRect();
    zoomBy(-event.deltaY, { x: event.clientX - rect.left, y: event.clientY - rect.top });
  },
  { passive: false }
);

document.querySelectorAll("[data-zoom]").forEach((button) => {
  button.addEventListener("click", () => zoomBy(Number(button.dataset.zoom)));
});

document.querySelector("[data-reset]").addEventListener("click", () => {
  camera.x = -40;
  camera.y = -20;
  camera.scale = 0.9;
  apply();
});

document.querySelectorAll(".region").forEach((region) => {
  region.addEventListener("click", (event) => {
    event.stopPropagation();
    document.querySelectorAll(".region").forEach((item) => item.classList.remove("is-on"));
    region.classList.add("is-on");
    note.innerHTML = `<strong>${region.dataset.title}</strong><br>${region.dataset.body}`;
  });
  region.addEventListener("dblclick", (event) => {
    event.stopPropagation();
    const rect = region.getBoundingClientRect();
    const view = viewport.getBoundingClientRect();
    const cx = rect.left + rect.width / 2 - view.left;
    const cy = rect.top + rect.height / 2 - view.top;
    camera.x += view.width / 2 - cx;
    camera.y += view.height / 2 - cy;
    camera.scale = Math.max(camera.scale, 1.2);
    apply();
  });
});

apply();
