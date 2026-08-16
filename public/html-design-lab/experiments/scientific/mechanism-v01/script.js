const SETPOINT = 37;
const GAIN = 0.55;

const state = {
  variable: SETPOINT,
  error: 0,
  effector: 0,
};

const els = {
  variable: document.querySelector("[data-variable]"),
  error: document.querySelector("[data-error]"),
  effector: document.querySelector("[data-effector]"),
  status: document.querySelector("[data-status]"),
  effectorBlock: document.querySelector('[data-block="effector"]'),
  integrator: document.querySelector('[data-block="integrator"]'),
  sensor: document.querySelector('[data-block="sensor"]'),
  variableBlock: document.querySelector('[data-block="variable"]'),
};

let timer = null;

function render() {
  els.variable.textContent = state.variable.toFixed(2);
  els.error.textContent = state.error.toFixed(2);
  els.effector.textContent = state.effector.toFixed(2);
  const drive = Math.min(1, Math.abs(state.error) / 1.4);
  els.effectorBlock.style.opacity = String(0.35 + drive * 0.65);
  els.variableBlock.classList.toggle("is-hot", Math.abs(state.variable - SETPOINT) > 0.12);
  els.sensor.classList.toggle("is-hot", Math.abs(state.error) > 0.08);
  els.integrator.classList.toggle("is-hot", Math.abs(state.error) > 0.08);
  els.effectorBlock.classList.toggle("is-hot", state.effector > 0.08);

  if (Math.abs(state.variable - SETPOINT) < 0.05) {
    els.status.textContent = "At setpoint. Error ≈ 0. Effector silent.";
  } else if (state.variable > SETPOINT) {
    els.status.textContent =
      "Variable above setpoint. Error is negative. Heat-loss effector increases; variable should fall.";
  } else {
    els.status.textContent =
      "Variable below setpoint. Heat-loss effector is off. The loop is negative feedback, not a heater in this diagram.";
  }
}

function tick() {
  state.error = SETPOINT - state.variable;
  state.effector = Math.max(0, -state.error) * GAIN;
  state.variable -= state.effector * 0.35;
  render();
  if (Math.abs(state.variable - SETPOINT) < 0.05) {
    stop();
    state.variable = SETPOINT;
    state.error = 0;
    state.effector = 0;
    render();
  }
}

function stop() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

function play() {
  stop();
  timer = setInterval(tick, 160);
}

document.querySelector("[data-disturb]").addEventListener("click", () => {
  state.variable += 1.2;
  state.error = SETPOINT - state.variable;
  render();
});

document.querySelector("[data-play]").addEventListener("click", play);
document.querySelector("[data-reset]").addEventListener("click", () => {
  stop();
  state.variable = SETPOINT;
  state.error = 0;
  state.effector = 0;
  render();
});

render();
