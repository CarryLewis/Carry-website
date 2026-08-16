const events = [
  { year: 0, t: 8, title: "Question", body: "A gap in the current map. Nothing is modeled yet; the timeline has a reason to start." },
  { year: 2, t: 24, title: "First collection", body: "Particulars accumulate. They are not yet a pattern — only a pile with dates." },
  { year: 5, t: 40, title: "Pattern named", body: "Recurrence is claimed. The claim is cheap until it survives a test." },
  { year: 7, t: 56, title: "Mechanism proposed", body: "A causal story is offered. The timeline now has a hypothesis, not only a sequence." },
  { year: 9, t: 72, title: "Anomaly", body: "An observation the mechanism cannot absorb. Time does not stop; the model must." },
  { year: 12, t: 90, title: "Revision", body: "The model changes. Later events will be read differently because this one happened." },
];

const list = document.querySelector(".events");
const playhead = document.getElementById("playhead");
const yearLabel = document.querySelector("[data-year]");
const detail = document.querySelector(".detail");

list.innerHTML = events
  .map(
    (event, index) => `<li data-index="${index}" style="left:${event.t}%">
      <button type="button" aria-label="${event.title}"></button>
      <span>${event.title}</span>
    </li>`
  )
  .join("");

function yearFromT(t) {
  return Math.round((t / 100) * 12);
}

function render(t, selected) {
  yearLabel.textContent = `Year ${yearFromT(t)}`;
  list.querySelectorAll("li").forEach((item, index) => {
    const event = events[index];
    item.classList.toggle("is-on", t >= event.t);
    item.classList.toggle("is-current", selected === index);
  });
}

function openDetail(index) {
  const event = events[index];
  detail.hidden = false;
  detail.querySelector("[data-when]").textContent = `Year ${event.year}`;
  detail.querySelector("[data-title]").textContent = event.title;
  detail.querySelector("[data-body]").textContent = event.body;
  render(Number(playhead.value), index);
}

playhead.addEventListener("input", () => {
  render(Number(playhead.value), null);
});

list.querySelectorAll("button").forEach((button, index) => {
  button.addEventListener("click", () => {
    playhead.value = String(events[index].t);
    openDetail(index);
  });
});

render(0, null);
