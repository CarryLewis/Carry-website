const notes = {
  1: { title: "Core", body: "The inner mass. Structure, not decoration — the region the other parts serve.", mass: "core" },
  2: { title: "Chamber", body: "The enclosing volume. It gives the core a context and a boundary.", mass: "chamber" },
  3: { title: "Conduit", body: "A path, not a box. It encodes transfer between chamber and port.", mass: "conduit" },
  4: { title: "Port", body: "Where the system meets the outside. Scale changes here: inside vs environment.", mass: "port" },
  5: { title: "Axis", body: "A baseline for reading. Without it the plate floats; with it, parts have height.", mass: "axis" },
};

const plate = document.getElementById("plate");
const callout = document.querySelector(".callout");

function clear() {
  plate.classList.remove("is-focus");
  plate.querySelectorAll(".is-hot, .is-on").forEach((item) => item.classList.remove("is-hot", "is-on"));
  callout.hidden = true;
}

function open(id) {
  const note = notes[id];
  clear();
  plate.classList.add("is-focus");
  plate.querySelector(`[data-id="${id}"]`).classList.add("is-on");
  plate.querySelector(`.${note.mass}`).classList.add("is-hot");
  callout.hidden = false;
  callout.querySelector("[data-num]").textContent = `0${id}`;
  callout.querySelector("[data-title]").textContent = note.title;
  callout.querySelector("[data-body]").textContent = note.body;
}

plate.querySelectorAll(".hot").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    if (button.classList.contains("is-on")) {
      clear();
      return;
    }
    open(button.dataset.id);
  });
});

plate.addEventListener("click", (event) => {
  if (event.target === plate || event.target.closest("svg")) clear();
});
