const captions = {
  1: "A exists. No claim yet.",
  2: "A relates to B. The first claim.",
  3: "C becomes possible. Emergence.",
  4: "The system can be named.",
};

const stage = document.querySelector(".stage");
const caption = document.querySelector("[data-caption]");
const sections = document.querySelectorAll("[data-stage]");

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    const n = visible.target.dataset.stage;
    stage.dataset.active = n;
    caption.textContent = captions[n];
  },
  { rootMargin: "-35% 0px -45% 0px", threshold: [0.1, 0.4, 0.7] }
);

sections.forEach((section) => observer.observe(section));
stage.dataset.active = "1";
