const nodes = [
  { id: "obs", label: "Observation", x: 90, y: 240, kind: "input", body: "A recorded particular. It has no theory yet; it only insists that something happened." },
  { id: "pat", label: "Pattern", x: 230, y: 140, kind: "structure", body: "Recurrence across observations. A pattern is a claim that the particulars are not isolated." },
  { id: "hyp", label: "Hypothesis", x: 230, y: 340, kind: "claim", body: "A provisional mechanism. It must be able to fail." },
  { id: "ev", label: "Evidence", x: 390, y: 240, kind: "test", body: "Structured observation collected to test a hypothesis — not to decorate it." },
  { id: "mec", label: "Mechanism", x: 540, y: 140, kind: "structure", body: "How the pattern is produced. Mechanism is causal, not merely correlative." },
  { id: "mod", label: "Model", x: 540, y: 340, kind: "claim", body: "A compact representation that can generate predictions." },
  { id: "pred", label: "Prediction", x: 680, y: 240, kind: "output", body: "A future observation implied by the model. The graph’s right edge." },
  { id: "ano", label: "Anomaly", x: 390, y: 80, kind: "tension", body: "An observation the current model cannot absorb. Anomaly is a relation, not a failure of the observer." },
  { id: "rev", label: "Revision", x: 390, y: 400, kind: "process", body: "The model changes. Revision is the loop that keeps the graph alive." },
];

const edges = [
  ["obs", "pat"],
  ["obs", "hyp"],
  ["pat", "hyp"],
  ["hyp", "ev"],
  ["pat", "ev"],
  ["ev", "mec"],
  ["ev", "mod"],
  ["mec", "mod"],
  ["mod", "pred"],
  ["ano", "pat"],
  ["ano", "mec"],
  ["rev", "hyp"],
  ["rev", "mod"],
  ["ano", "rev"],
];

const svg = document.getElementById("graph");
const dossier = document.querySelector(".dossier");
const byId = Object.fromEntries(nodes.map((node) => [node.id, node]));

const ns = "http://www.w3.org/2000/svg";

function el(name, attrs) {
  const node = document.createElementNS(ns, name);
  Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
  return node;
}

const edgeLayer = el("g", { class: "edges" });
const nodeLayer = el("g", { class: "nodes" });
svg.append(edgeLayer, nodeLayer);

edges.forEach(([a, b]) => {
  const line = el("line", {
    class: "edge",
    "data-edge": `${a}-${b}`,
    x1: byId[a].x,
    y1: byId[a].y,
    x2: byId[b].x,
    y2: byId[b].y,
  });
  edgeLayer.append(line);
});

nodes.forEach((node) => {
  const g = el("g", { class: "node", "data-id": node.id, tabindex: "0" });
  const label = el("text", { x: node.x, y: node.y + 32, "text-anchor": "middle" });
  label.textContent = node.label;
  g.append(el("circle", { cx: node.x, cy: node.y, r: 16 }), label);
  nodeLayer.append(g);
});

function neighbors(id) {
  return edges.flatMap(([a, b]) => {
    if (a === id) return [b];
    if (b === id) return [a];
    return [];
  });
}

function clearFocus() {
  svg.classList.remove("is-focus");
  svg.querySelectorAll(".is-hot").forEach((item) => item.classList.remove("is-hot"));
}

function focusNode(id) {
  const near = new Set([id, ...neighbors(id)]);
  svg.classList.add("is-focus");
  svg.querySelectorAll(".node").forEach((item) => {
    if (near.has(item.dataset.id)) item.classList.add("is-hot");
  });
  svg.querySelectorAll(".edge").forEach((item) => {
    const [a, b] = item.dataset.edge.split("-");
    if (a === id || b === id) item.classList.add("is-hot");
  });
}

function openDossier(id) {
  const node = byId[id];
  dossier.hidden = false;
  dossier.querySelector("[data-kind]").textContent = node.kind;
  dossier.querySelector("[data-title]").textContent = node.label;
  dossier.querySelector("[data-body]").textContent = node.body;
  dossier.querySelector("[data-related]").innerHTML = neighbors(id)
    .map((other) => `<li>${byId[other].label}</li>`)
    .join("");
}

svg.querySelectorAll(".node").forEach((item) => {
  item.addEventListener("mouseenter", () => focusNode(item.dataset.id));
  item.addEventListener("mouseleave", () => {
    if (dossier.hidden) clearFocus();
  });
  item.addEventListener("click", () => {
    focusNode(item.dataset.id);
    openDossier(item.dataset.id);
  });
  item.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      focusNode(item.dataset.id);
      openDossier(item.dataset.id);
    }
  });
});

document.querySelector("[data-close]").addEventListener("click", () => {
  dossier.hidden = true;
  clearFocus();
});
