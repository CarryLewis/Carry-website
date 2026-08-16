const main = document.querySelector("main");

function play() {
  main.classList.remove("is-run");
  void main.offsetWidth;
  main.classList.add("is-run");
}

document.querySelector("[data-replay]").addEventListener("click", play);
play();
