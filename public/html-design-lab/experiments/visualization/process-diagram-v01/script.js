const status = document.querySelector("[data-status]");
const token = document.querySelector(".token");
const processor = document.querySelector(".processor");
const output = document.querySelector(".output");
const source = document.querySelector(".source");

const phases = [
  { x: 80, text: "Idle. Source holds a signal." },
  { x: 360, text: "Signal leaves A and propagates toward B." },
  { x: 360, text: "B activates. Internal state changes." },
  { x: 640, text: "Changed signal leaves B." },
  { x: 640, text: "C emerges. The process has produced something new." },
];

let phase = 0;
let playing = false;
let anim = null;

function reduced() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function setToken(x) {
  token.setAttribute("cx", String(x));
}

function apply(index, animateFrom) {
  phase = index;
  status.textContent = phases[index].text;
  source.classList.toggle("is-on", index >= 0);
  processor.classList.toggle("is-on", index >= 2);
  output.classList.toggle("is-on", index >= 4);
  token.classList.toggle("is-on", index >= 1);

  const to = phases[index].x;
  if (animateFrom == null || reduced()) {
    setToken(to);
    return Promise.resolve();
  }

  const from = animateFrom;
  const duration = 700;
  const start = performance.now();
  return new Promise((resolve) => {
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setToken(from + (to - from) * eased);
      if (t < 1) {
        anim = requestAnimationFrame(step);
      } else {
        resolve();
      }
    };
    anim = requestAnimationFrame(step);
  });
}

async function play() {
  if (playing) return;
  playing = true;
  if (anim) cancelAnimationFrame(anim);
  await apply(0);
  if (!playing) return;
  await apply(1, 80);
  if (!playing) return;
  await apply(2);
  if (!playing) return;
  await apply(3, 360);
  if (!playing) return;
  await apply(4);
  playing = false;
}

document.querySelector("[data-play]").addEventListener("click", play);
document.querySelector("[data-step]").addEventListener("click", () => {
  playing = false;
  if (anim) cancelAnimationFrame(anim);
  const next = phase >= phases.length - 1 ? 0 : phase + 1;
  const from = next === 1 ? 80 : next === 3 ? 360 : null;
  apply(next, from);
});
document.querySelector("[data-reset]").addEventListener("click", () => {
  playing = false;
  if (anim) cancelAnimationFrame(anim);
  apply(0);
});

apply(0);
