const display = document.getElementById("display");
const buttons = document.getElementById("buttons");

let firstValue = null;
let operator = null;
let waitingSecondValue = false;

function updateDisplay(value) {
  display.textContent = value;
}

function inputNumber(num) {
  if (waitingSecondValue) {
    updateDisplay(num);
    waitingSecondValue = false;
  } else {
    updateDisplay(display.textContent === "0" ? num : display.textContent + num);
  }
}

function inputDecimal() {
  if (!display.textContent.includes(".")) {
    updateDisplay(display.textContent + ".");
  }
}

function handleOperator(op) {
  firstValue = parseFloat(display.textContent);
  operator = op;
  waitingSecondValue = true;
}

function calculate() {
  const secondValue = parseFloat(display.textContent);
  let result = 0;

  if (operator === "+") result = firstValue + secondValue;
  if (operator === "-") result = firstValue - secondValue;
  if (operator === "*") result = firstValue * secondValue;
  if (operator === "/") result = firstValue / secondValue;

  updateDisplay(result);
  firstValue = result;
  operator = null;
}

function clearAll() {
  firstValue = null;
  operator = null;
  waitingSecondValue = false;
  updateDisplay("0");
}

// EVENT DELEGATION
buttons.addEventListener("click", (e) => {
  const target = e.target;

  if (!target.matches("button")) return;

  const value = target.dataset.value;
  const action = target.dataset.action;

  if (value) {
    if (!isNaN(value)) {
      inputNumber(value);
    } else if (value === ".") {
      inputDecimal();
    } else {
      handleOperator(value);
    }
  }

  if (action === "equals") {
    calculate();
  }

  if (action === "clear") {
    clearAll();
  }
});

// KEYBOARD SUPPORT
document.addEventListener("keydown", (e) => {
  if (!isNaN(e.key)) inputNumber(e.key);
  if (e.key === ".") inputDecimal();
  if (["+", "-", "*", "/"].includes(e.key)) handleOperator(e.key);
  if (e.key === "Enter") calculate();
  if (e.key === "Escape") clearAll();
});