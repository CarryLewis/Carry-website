const mix = document.getElementById("mix");
const wipe = document.getElementById("wipe");
const left = document.querySelector(".left");
const right = document.querySelector(".right");

wipe.append(left.cloneNode(true));
const overlay = wipe.querySelector("svg");
overlay.classList.remove("right");
overlay.classList.add("left");

function setMix(value) {
  wipe.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
}

mix.addEventListener("input", () => setMix(Number(mix.value)));
setMix(50);

document.querySelectorAll("tbody tr").forEach((row) => {
  row.addEventListener("click", () => {
    const part = row.dataset.part;
    const on = row.classList.toggle("is-on");
    document.querySelectorAll("tbody tr").forEach((other) => {
      if (other !== row) other.classList.remove("is-on");
    });
    [left, overlay, right].forEach((svg) => {
      svg.classList.toggle("is-filter", on);
      svg.querySelectorAll(".part").forEach((item) => {
        item.classList.toggle("is-hot", on && item.classList.contains(part));
      });
    });
  });
});
