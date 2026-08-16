const attentionChip = document.querySelector(".motion-chip");
const stateStage = document.getElementById("motion-state");

document.querySelectorAll("[data-replay]").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.replay === "attention") {
      attentionChip.classList.remove("run");
      void attentionChip.offsetWidth;
      attentionChip.classList.add("run");
    }
    if (button.dataset.replay === "state") {
      stateStage.classList.remove("is-on");
      void stateStage.offsetWidth;
      stateStage.classList.add("is-on");
    }
  });
});

const disclose = document.querySelector(".disclose");
const disclosed = document.getElementById("disclosed");
if (disclose && disclosed) {
  disclose.addEventListener("click", () => {
    const open = disclose.getAttribute("aria-expanded") === "true";
    disclose.setAttribute("aria-expanded", String(!open));
    disclosed.hidden = open;
    disclose.textContent = open ? "Show the nested note" : "Hide the nested note";
  });
}

const graph = document.querySelector(".mini-graph");
const caption = document.querySelector("[data-graph-caption]");
if (graph) {
  const nodes = [...graph.querySelectorAll(".node")];
  const edges = [...graph.querySelectorAll("line")];

  const clear = () => {
    graph.classList.remove("is-focus");
    nodes.forEach((node) => node.classList.remove("is-hot"));
    edges.forEach((edge) => edge.classList.remove("is-hot"));
    if (caption) caption.textContent = "Neighborhood idle.";
  };

  const focusNode = (node) => {
    const id = node.dataset.node;
    const neighbors = (node.dataset.neighbors || "").split(",");
    graph.classList.add("is-focus");
    nodes.forEach((item) => {
      if (item === node || neighbors.includes(item.dataset.node)) {
        item.classList.add("is-hot");
      }
    });
    edges.forEach((edge) => {
      const pair = edge.dataset.edge.split("-");
      if (pair.includes(id)) edge.classList.add("is-hot");
    });
    if (caption) {
      caption.textContent = `Focus ${id.toUpperCase()} · neighbors ${neighbors.join(", ").toUpperCase()}`;
    }
  };

  nodes.forEach((node) => {
    node.addEventListener("mouseenter", () => focusNode(node));
    node.addEventListener("mouseleave", clear);
    node.addEventListener("focus", () => focusNode(node));
    node.addEventListener("blur", clear);
    node.setAttribute("tabindex", "0");
  });
}
