async function loadIndex(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Could not load experiment index");
  }
  return response.json();
}

function experimentHref(experiment, fromLabFolder) {
  if (fromLabFolder) return experiment.path;
  return experiment.path.replace("../", "");
}

function renderRecent(container, data, fromLabFolder) {
  const featured = data.featured
    .map((id) => data.experiments.find((item) => item.id === id))
    .filter(Boolean);

  container.innerHTML = featured
    .map((item, index) => {
      const href = experimentHref(item, fromLabFolder);
      const n = String(index + 1).padStart(2, "0");
      return `<li>
        <a href="${href}">
          <span class="recent-idx">${n}</span>
          <span>
            <span class="recent-name">${item.name}</span>
            <span class="recent-short">${item.short}</span>
          </span>
          <span class="recent-meta">${item.category}</span>
        </a>
      </li>`;
    })
    .join("");
}

function renderGallery(container, experiments) {
  if (!experiments.length) {
    container.innerHTML = `<li class="empty-note">No experiments in this category yet.</li>`;
    return;
  }

  container.innerHTML = experiments
    .map((item) => {
      const uses = item.recommended_for.slice(0, 2).join(" · ");
      return `<li class="gallery-item">
        <div class="specimen" data-language="${item.visual_language}">
          <span>${item.visual_language}</span>
          <span>${item.category}</span>
        </div>
        <div class="gallery-body">
          <h2><a href="${item.path}">${item.name}</a></h2>
          <p>${item.short}</p>
          <div class="tags">
            ${item.tags.map((tag) => `<span>${tag}</span>`).join("")}
          </div>
        </div>
        <div class="gallery-side">
          <span>${item.complexity} complexity</span>
          <span>${item.interaction}</span>
          <span>${uses}</span>
          <a href="${item.path}">Open</a>
        </div>
      </li>`;
    })
    .join("");
}

function initGallery(data) {
  const list = document.querySelector("[data-gallery]");
  const filters = document.querySelectorAll("[data-filter]");
  if (!list) return;

  const apply = (category) => {
    const next =
      category === "all"
        ? data.experiments
        : data.experiments.filter((item) => item.category === category);
    renderGallery(list, next);
  };

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      filters.forEach((other) => other.setAttribute("aria-pressed", "false"));
      button.setAttribute("aria-pressed", "true");
      apply(button.dataset.filter);
    });
  });

  const requested = new URLSearchParams(location.search).get("category");
  const start =
    document.querySelector(`[data-filter="${requested}"]`) ||
    document.querySelector('[data-filter="all"]');
  if (start) {
    filters.forEach((other) => other.setAttribute("aria-pressed", "false"));
    start.setAttribute("aria-pressed", "true");
    apply(start.dataset.filter);
  } else {
    apply("all");
  }
}

function initLanguageSwitcher() {
  const sheet = document.getElementById("language-sheet");
  const buttons = document.querySelectorAll("[data-lang]");
  if (!sheet || !buttons.length) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      sheet.href = `../tokens/languages/${button.dataset.lang}.css`;
      buttons.forEach((other) => other.setAttribute("aria-pressed", "false"));
      button.setAttribute("aria-pressed", "true");
    });
  });
}

function experimentIndex(experiments) {
  return Object.fromEntries((experiments || []).map((item) => [item.id, item]));
}

function firstExperiment(item, byId, patterns) {
  const direct = (item.experiments || []).map((id) => byId[id]).find(Boolean);
  if (direct) return direct;
  if (item.patterns && patterns) {
    const pattern = patterns.find((row) => item.patterns.includes(row.id));
    return firstExperiment(pattern || {}, byId);
  }
  return undefined;
}

function knowledgeOpenHref(item, byId, patterns) {
  const specimen = firstExperiment(item, byId, patterns);
  return specimen ? specimen.path : item.path;
}

function renderKnowledge(container, items, kind, byId, patterns) {
  if (!items.length) {
    container.innerHTML = `<li class="empty-note">Nothing in this layer yet.</li>`;
    return;
  }

  container.innerHTML = items
    .map((item) => {
      const language = item.design_language || "notebook";
      const meta =
        kind === "pattern"
          ? `${item.maturity} · ${item.kind}`
          : `${item.kind} · ${item.design_language || "reference"}`;
      const principle = item.principle || item.primary_strength;
      const tags = [...(item.interactions || []), ...(item.motions || [])];
      const specimens = (item.experiments || [])
        .map((id) => byId[id])
        .filter(Boolean);
      const openHref = knowledgeOpenHref(item, byId, patterns);
      const specimen = firstExperiment(item, byId, patterns);
      const openLabel = specimen ? "Open specimen" : "Open notes";
      return `<li class="gallery-item">
        <div class="specimen" data-language="${language}">
          <span>${kind}</span>
          <span>${item.maturity || item.design_language || ""}</span>
        </div>
        <div class="gallery-body">
          <h2><a href="${openHref}">${item.name}</a></h2>
          <p>${principle}</p>
          ${
            tags.length
              ? `<div class="tags">${tags.map((tag) => `<span>${tag}</span>`).join("")}</div>`
              : ""
          }
        </div>
        <div class="gallery-side">
          <span>${meta}</span>
          ${specimens.map((exp) => `<span>${exp.name}</span>`).join("")}
          <a href="${openHref}">${openLabel}</a>
        </div>
      </li>`;
    })
    .join("");
}

function svgEl(name, attrs) {
  const node = document.createElementNS("http://www.w3.org/2000/svg", name);
  Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
  return node;
}

function knowledgeNodes(data, byId) {
  const referenceNodes = (data.references || []).map((item) => ({
    key: `reference:${item.id}`,
    kind: "reference",
    label: item.name,
    item,
  }));
  const patternNodes = (data.patterns || []).map((item) => ({
    key: `pattern:${item.id}`,
    kind: item.kind === "composite" ? "composite" : "pattern",
    label: item.name,
    item,
  }));
  const experimentIds = [
    ...new Set(
      (data.patterns || []).flatMap((item) => item.experiments || []),
    ),
  ];
  const experimentNodes = experimentIds
    .map((id) => byId[id])
    .filter(Boolean)
    .map((item) => ({
      key: `experiment:${item.id}`,
      kind: "experiment",
      label: item.name,
      item,
    }));
  return { referenceNodes, patternNodes, experimentNodes };
}

function placeColumn(nodes, x, height, pad) {
  const usable = height - pad * 2;
  return nodes.map((node, index) => {
    const t = nodes.length === 1 ? 0.5 : index / (nodes.length - 1);
    return { ...node, x, y: pad + t * usable };
  });
}

function renderGraph(board, data, byId) {
  const svg = board.querySelector("[data-graph-svg]");
  const list = board.querySelector("[data-graph]");
  const dossier = board.querySelector("[data-graph-dossier]");
  if (!svg) return;

  const width = 1120;
  const height = 680;
  const { referenceNodes, patternNodes, experimentNodes } = knowledgeNodes(
    data,
    byId,
  );
  const placed = [
    ...placeColumn(referenceNodes, 110, height, 56),
    ...placeColumn(patternNodes, 420, height, 36),
    ...placeColumn(experimentNodes, 900, height, 40),
  ];
  const byKey = Object.fromEntries(placed.map((node) => [node.key, node]));
  const edges = (data.edges || []).filter(
    (edge) => byKey[edge.from] && byKey[edge.to],
  );

  svg.replaceChildren();
  const edgeLayer = svgEl("g", { class: "graph-edges" });
  const nodeLayer = svgEl("g", { class: "graph-nodes" });
  svg.append(
    svgEl("rect", {
      width: String(width),
      height: String(height),
      class: "graph-grid",
    }),
  );
  const labels = [
    ["Reference", 110],
    ["Pattern", 420],
    ["Experiment", 900],
  ];
  labels.forEach(([label, x]) => {
    const text = svgEl("text", {
      x: String(x),
      y: "22",
      class: "graph-col",
      "text-anchor": "middle",
    });
    text.textContent = label;
    svg.append(text);
  });
  svg.append(edgeLayer, nodeLayer);

  edges.forEach((edge) => {
    const from = byKey[edge.from];
    const to = byKey[edge.to];
    const line = svgEl("line", {
      class: "graph-edge",
      "data-from": edge.from,
      "data-to": edge.to,
      x1: String(from.x),
      y1: String(from.y),
      x2: String(to.x),
      y2: String(to.y),
    });
    const title = svgEl("title", {});
    title.textContent = `${from.label} ${edge.rel.replaceAll("_", " ")} ${to.label}`;
    line.append(title);
    edgeLayer.append(line);
  });

  placed.forEach((node) => {
    const group = svgEl("g", {
      class: "graph-node",
      "data-key": node.key,
      "data-kind": node.kind,
      tabindex: "0",
      role: "button",
    });
    group.setAttribute("aria-label", `${node.kind} ${node.label}`);
    const side = node.kind === "reference" ? "end" : "start";
    const labelX = node.kind === "reference" ? node.x - 14 : node.x + 14;
    const label = svgEl("text", {
      x: String(labelX),
      y: String(node.y + 4),
      "text-anchor": side,
    });
    label.textContent = node.label;
    group.append(
      svgEl("circle", { cx: String(node.x), cy: String(node.y), r: "7" }),
      label,
    );
    nodeLayer.append(group);
  });

  const neighborsOf = (key) => {
    const near = new Set([key]);
    edges.forEach((edge) => {
      if (edge.from === key) near.add(edge.to);
      if (edge.to === key) near.add(edge.from);
    });
    return near;
  };

  const clearFocus = () => {
    svg.classList.remove("is-focus");
    svg.querySelectorAll(".is-hot").forEach((item) => item.classList.remove("is-hot"));
  };

  const focusKey = (key) => {
    const near = neighborsOf(key);
    svg.classList.add("is-focus");
    svg.querySelectorAll(".graph-node").forEach((item) => {
      item.classList.toggle("is-hot", near.has(item.dataset.key));
    });
    svg.querySelectorAll(".graph-edge").forEach((item) => {
      const hot =
        near.has(item.dataset.from) && near.has(item.dataset.to);
      item.classList.toggle("is-hot", hot);
    });
  };

  const showDossier = (key) => {
    const node = byKey[key];
    if (!dossier || !node) return;
    const item = node.item;
    const principle = item.principle || item.primary_strength || item.short || "";
    const href = knowledgeOpenHref(item, byId, data.patterns);
    const specimen = firstExperiment(item, byId, data.patterns);
    const related = edges
      .filter((edge) => edge.from === key || edge.to === key)
      .map((edge) => {
        const other = edge.from === key ? edge.to : edge.from;
        return `${edge.rel.replaceAll("_", " ")} · ${byKey[other]?.label || other}`;
      });
    dossier.innerHTML = `
      <p class="label">${node.kind}</p>
      <h2>${node.label}</h2>
      <p>${principle}</p>
      ${
        related.length
          ? `<ul class="graph-related">${related.map((row) => `<li>${row}</li>`).join("")}</ul>`
          : ""
      }
      <a href="${href}">${specimen ? "Open specimen" : "Open notes"}</a>
    `;
  };

  const emptyDossier = () => {
    if (!dossier) return;
    dossier.innerHTML = `
      <p class="label">Pipeline</p>
      <h2>Form follows the relation.</h2>
      <p>This is a relationship network, so it is a graph. Hover a node to keep the map and see the neighborhood. Click to open a dossier.</p>
    `;
  };

  let sticky = null;
  const activate = (key, stick) => {
    if (!key) {
      sticky = null;
      clearFocus();
      emptyDossier();
      return;
    }
    focusKey(key);
    showDossier(key);
    if (stick) sticky = key;
  };

  svg.querySelectorAll(".graph-node").forEach((group) => {
    const key = group.dataset.key;
    group.addEventListener("pointerenter", () => activate(key, false));
    group.addEventListener("focus", () => activate(key, false));
    group.addEventListener("click", () => activate(key, true));
    group.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activate(key, true);
      }
    });
  });
  svg.querySelector(".graph-grid")?.addEventListener("pointerenter", () => {
    if (!sticky) activate(null, false);
  });
  svg.addEventListener("pointerleave", () => {
    if (sticky) {
      activate(sticky, true);
      return;
    }
    activate(null, false);
  });

  emptyDossier();

  if (list) {
    list.innerHTML = edges
      .map((edge) => {
        const from = byKey[edge.from];
        const to = byKey[edge.to];
        const href = knowledgeOpenHref(to.item, byId, data.patterns);
        return `<li class="graph-row">
          <span>${from.label}</span>
          <span class="graph-rel">${edge.rel.replaceAll("_", " ")}</span>
          <a href="${href}">${to.label}</a>
        </li>`;
      })
      .join("");
  }
}

function initKnowledge(data, experiments) {
  const list = document.querySelector("[data-knowledge]");
  const board = document.querySelector("[data-graph-board]");
  const filters = document.querySelectorAll("[data-kfilter]");
  if (!list) return;
  const byId = experimentIndex(experiments);

  const apply = (layer) => {
    const isGraph = layer === "graph";
    list.hidden = isGraph;
    if (board) board.hidden = !isGraph;
    if (isGraph) {
      renderGraph(board, data, byId);
      return;
    }
    if (layer === "references") {
      renderKnowledge(list, data.references, "reference", byId, data.patterns);
    } else {
      renderKnowledge(list, data.patterns, "pattern", byId, data.patterns);
    }
  };

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      filters.forEach((other) => other.setAttribute("aria-pressed", "false"));
      button.setAttribute("aria-pressed", "true");
      const layer = button.dataset.kfilter;
      apply(layer);
      const url = new URL(location.href);
      if (layer === "patterns") url.searchParams.delete("layer");
      else url.searchParams.set("layer", layer);
      history.replaceState(null, "", url);
    });
  });

  const requested = new URLSearchParams(location.search).get("layer");
  const start =
    document.querySelector(`[data-kfilter="${requested}"]`) ||
    document.querySelector('[data-kfilter="patterns"]');
  if (start) {
    filters.forEach((other) => other.setAttribute("aria-pressed", "false"));
    start.setAttribute("aria-pressed", "true");
    apply(start.dataset.kfilter);
  } else {
    apply("patterns");
  }
}

function renderFeaturedPatterns(container, data, experiments) {
  const byId = experimentIndex(experiments);
  const featured = (data.featured_patterns || [])
    .map((id) => data.patterns.find((item) => item.id === id))
    .filter(Boolean);

  container.innerHTML = featured
    .map((item, index) => {
      const n = String(index + 1).padStart(2, "0");
      const href = knowledgeOpenHref(item, byId, data.patterns).replace(
        "../",
        "",
      );
      return `<li>
        <a href="${href}">
          <span class="recent-idx">${n}</span>
          <span>
            <span class="recent-name">${item.name}</span>
            <span class="recent-short">${item.principle}</span>
          </span>
          <span class="recent-meta">${item.maturity}</span>
        </a>
      </li>`;
    })
    .join("");
}

function initOwnPages(data, fromLabFolder) {
  const list = document.querySelector("[data-own-pages]");
  const recent = document.querySelector("[data-own-recent]");
  const pages = data.pages || [];

  if (list) {
    list.innerHTML = pages
      .map((item) => {
        const href = experimentHref(item, fromLabFolder);
        return `<li class="gallery-item">
          <div class="specimen" data-language="${item.visual_language}">
            <span>${item.status}</span>
            <span>${item.project}</span>
          </div>
          <div class="gallery-body">
            <h2><a href="${href}">${item.name}</a></h2>
            <p>${item.short}</p>
            <div class="tags">
              ${item.tags.map((tag) => `<span>${tag}</span>`).join("")}
            </div>
          </div>
          <div class="gallery-side">
            <span>${item.structure}</span>
            <span>${item.form}</span>
            <span>${item.interaction}</span>
            <a href="${href}">Open</a>
          </div>
        </li>`;
      })
      .join("");
  }

  if (recent) {
    const featured = (data.featured || [])
      .map((id) => pages.find((item) => item.id === id))
      .filter(Boolean);
    recent.innerHTML = featured
      .map((item, index) => {
        const href = experimentHref(item, fromLabFolder);
        const n = String(index + 1).padStart(2, "0");
        return `<li>
          <a href="${href}">
            <span class="recent-idx">${n}</span>
            <span>
              <span class="recent-name">${item.name}</span>
              <span class="recent-short">${item.short}</span>
            </span>
            <span class="recent-meta">${item.status}</span>
          </a>
        </li>`;
      })
      .join("");
  }
}

async function boot() {
  const root = document.body;
  const indexUrl = root.dataset.indexUrl;
  const knowledgeUrl = root.dataset.knowledgeUrl;
  const projectsUrl = root.dataset.projectsUrl;
  initLanguageSwitcher();

  const fail = (selector, message) => {
    const node = document.querySelector(selector);
    if (node) node.innerHTML = `<li class="empty-note">${message} <code>python3 -m http.server 8080</code></li>`;
  };

  let experiments = [];

  if (indexUrl) {
    try {
      const data = await loadIndex(indexUrl);
      experiments = data.experiments || [];
      const recent = document.querySelector("[data-recent]");
      if (recent) {
        renderRecent(recent, data, root.dataset.fromLab === "true");
      }
      initGallery(data);
    } catch (error) {
      fail("[data-recent]", "Serve the lab over HTTP to load experiments.");
      fail("[data-gallery]", "Serve the lab over HTTP to load the index.");
      console.warn(error);
    }
  }

  if (knowledgeUrl) {
    try {
      const knowledge = await loadIndex(knowledgeUrl);
      const featured = document.querySelector("[data-featured-patterns]");
      if (featured) renderFeaturedPatterns(featured, knowledge, experiments);
      initKnowledge(knowledge, experiments);
    } catch (error) {
      fail("[data-featured-patterns]", "Serve the lab over HTTP to load patterns.");
      fail("[data-knowledge]", "Serve the lab over HTTP to load knowledge.");
      console.warn(error);
    }
  }

  if (projectsUrl) {
    try {
      const projects = await loadIndex(projectsUrl);
      initOwnPages(projects, root.dataset.fromLab === "true");
    } catch (error) {
      fail("[data-own-pages]", "Serve the lab over HTTP to load own HTML.");
      fail("[data-own-recent]", "Serve the lab over HTTP to load own HTML.");
      console.warn(error);
    }
  }
}

boot();
