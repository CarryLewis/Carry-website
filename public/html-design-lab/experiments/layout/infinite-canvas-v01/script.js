const viewport = document.getElementById("viewport");
const world = document.getElementById("world");
const reader = document.querySelector(".reader");

const camera = { x: -80, y: -40 };
const velocity = { x: 0, y: 0 };
let dragging = false;
let last = { x: 0, y: 0, t: 0 };

function apply() {
  world.style.transform = `translate(${camera.x}px, ${camera.y}px)`;
}

viewport.addEventListener("pointerdown", (event) => {
  if (event.target.closest("article")) return;
  dragging = true;
  velocity.x = 0;
  velocity.y = 0;
  last = { x: event.clientX, y: event.clientY, t: performance.now() };
  viewport.classList.add("is-dragging");
  viewport.setPointerCapture(event.pointerId);
});

viewport.addEventListener("pointermove", (event) => {
  if (!dragging) return;
  const now = performance.now();
  const dx = event.clientX - last.x;
  const dy = event.clientY - last.y;
  camera.x += dx;
  camera.y += dy;
  const dt = Math.max(now - last.t, 1);
  velocity.x = dx / dt;
  velocity.y = dy / dt;
  last = { x: event.clientX, y: event.clientY, t: now };
  apply();
});

function coast() {
  if (dragging) return;
  velocity.x *= 0.92;
  velocity.y *= 0.92;
  if (Math.abs(velocity.x) < 0.02 && Math.abs(velocity.y) < 0.02) return;
  camera.x += velocity.x * 16;
  camera.y += velocity.y * 16;
  apply();
  requestAnimationFrame(coast);
}

viewport.addEventListener("pointerup", () => {
  dragging = false;
  viewport.classList.remove("is-dragging");
  requestAnimationFrame(coast);
});

document.querySelectorAll("[data-note]").forEach((note) => {
  note.addEventListener("click", (event) => {
    event.stopPropagation();
    document.querySelectorAll("[data-note]").forEach((item) => item.classList.remove("is-on"));
    note.classList.add("is-on");
    reader.hidden = false;
    reader.querySelector("[data-read]").textContent = note.dataset.note;
    const rect = note.getBoundingClientRect();
    const view = viewport.getBoundingClientRect();
    camera.x += view.width * 0.38 - (rect.left - view.left);
    camera.y += view.height * 0.45 - (rect.top - view.top);
    apply();
  });
});

document.querySelector("[data-close]").addEventListener("click", () => {
  reader.hidden = true;
});

apply();
