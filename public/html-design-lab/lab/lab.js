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

function renderKnowledge(container, items, kind) {
  if (!items.length) {
    container.innerHTML = `<li class="empty-note">Nothing in this layer yet.</li>`;
    return;
  }

  container.innerHTML = items
    .map((item) => {
      const meta = kind === "pattern" ? `${item.maturity} · ${item.kind}` : item.kind;
      const principle = item.principle || item.primary_strength;
      return `<li class="gallery-item">
        <div class="specimen" data-language="notebook">
          <span>${kind}</span>
          <span>${item.maturity || item.design_language || ""}</span>
        </div>
        <div class="gallery-body">
          <h2><a href="${item.path}">${item.name}</a></h2>
          <p>${principle}</p>
        </div>
        <div class="gallery-side">
          <span>${meta}</span>
          <a href="${item.path}">Open</a>
        </div>
      </li>`;
    })
    .join("");
}

function renderGraph(container, data) {
  container.innerHTML = data.edges
    .map((edge) => {
      const from = edge.from.replace(":", " · ");
      const to = edge.to.replace(":", " · ");
      return `<li class="graph-row">
        <span>${from}</span>
        <span class="graph-rel">${edge.rel.replaceAll("_", " ")}</span>
        <span>${to}</span>
      </li>`;
    })
    .join("");
}

function initKnowledge(data) {
  const list = document.querySelector("[data-knowledge]");
  const graph = document.querySelector("[data-graph]");
  const filters = document.querySelectorAll("[data-kfilter]");
  if (!list) return;

  const apply = (layer) => {
    if (layer === "graph") {
      list.hidden = true;
      if (graph) graph.hidden = false;
      renderGraph(graph, data);
      return;
    }
    list.hidden = false;
    if (graph) graph.hidden = true;
    if (layer === "references") renderKnowledge(list, data.references, "reference");
    else renderKnowledge(list, data.patterns, "pattern");
  };

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      filters.forEach((other) => other.setAttribute("aria-pressed", "false"));
      button.setAttribute("aria-pressed", "true");
      apply(button.dataset.kfilter);
    });
  });

  apply("patterns");
}

function renderFeaturedPatterns(container, data) {
  const featured = (data.featured_patterns || [])
    .map((id) => data.patterns.find((item) => item.id === id))
    .filter(Boolean);

  container.innerHTML = featured
    .map((item, index) => {
      const n = String(index + 1).padStart(2, "0");
      return `<li>
        <a href="${item.path.replace("../", "")}">
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

  if (indexUrl) {
    try {
      const data = await loadIndex(indexUrl);
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
      if (featured) renderFeaturedPatterns(featured, knowledge);
      initKnowledge(knowledge);
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
