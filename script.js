// basic math functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);

  if (operator === "+") return add(a, b);
  if (operator === "-") return subtract(a, b);
  if (operator === "*") return multiply(a, b);
  if (operator === "/") {
    if (b === 0) return "Nice try 😅";
    return divide(a, b);
  }
}

let firstNumber = "";
let operator = "";
let secondNumber = "";
let justCalculated = false;

const display = document.querySelector("#display");

function updateDisplay(value) {
  display.textContent = value;
}

// rounds long decimals so they fit on the screen
function roundResult(num) {
  if (typeof num === "string") return num;
  return Math.round(num * 100000) / 100000;
}

function inputNumber(num) {
  // start fresh if the user types a number right after pressing =
  if (justCalculated) {
    firstNumber = "";
    justCalculated = false;
  }

  if (operator === "") {
    firstNumber += num;
    updateDisplay(firstNumber);
  } else {
    secondNumber += num;
    updateDisplay(secondNumber);
  }
}

function inputDecimal() {
  if (justCalculated) {
    firstNumber = "";
    justCalculated = false;
  }

  if (operator === "") {
    if (firstNumber.includes(".")) return;
    firstNumber = firstNumber === "" ? "0." : firstNumber + ".";
    updateDisplay(firstNumber);
  } else {
    if (secondNumber.includes(".")) return;
    secondNumber = secondNumber === "" ? "0." : secondNumber + ".";
    updateDisplay(secondNumber);
  }
}

function inputOperator(op) {
  if (firstNumber === "") return;

  // if there are already two numbers, solve them first (ex. 12 + 7 - 1)
  if (secondNumber !== "") {
    calculate();
    if (firstNumber === "") return; // stop if it was a divide by 0
  }

  operator = op;
  justCalculated = false;
}

function calculate() {
  if (firstNumber === "" || operator === "" || secondNumber === "") return;

  const result = roundResult(operate(operator, firstNumber, secondNumber));
  updateDisplay(result);

  if (typeof result === "string") {
    // divide by 0 message, so just reset everything
    firstNumber = "";
  } else {
    firstNumber = String(result);
  }

  operator = "";
  secondNumber = "";
  justCalculated = true;
}

function clearAll() {
  firstNumber = "";
  operator = "";
  secondNumber = "";
  justCalculated = false;
  updateDisplay("0");
}

function backspace() {
  if (justCalculated) return;

  if (secondNumber !== "") {
    secondNumber = secondNumber.slice(0, -1);
    updateDisplay(secondNumber || "0");
  } else if (operator === "") {
    firstNumber = firstNumber.slice(0, -1);
    updateDisplay(firstNumber || "0");
  }
}

// button clicks
document.querySelectorAll(".number").forEach((btn) => {
  btn.addEventListener("click", () => inputNumber(btn.textContent));
});

document.querySelectorAll(".operator").forEach((btn) => {
  btn.addEventListener("click", () => inputOperator(btn.dataset.op));
});

document.querySelector("#decimal").addEventListener("click", inputDecimal);
document.querySelector("#equals").addEventListener("click", calculate);
document.querySelector("#clear").addEventListener("click", clearAll);
document.querySelector("#backspace").addEventListener("click", backspace);

// keyboard support
document.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") inputNumber(e.key);
  if (e.key === ".") inputDecimal();
  if (["+", "-", "*", "/"].includes(e.key)) inputOperator(e.key);
  if (e.key === "Enter" || e.key === "=") calculate();
  if (e.key === "Backspace") backspace();
  if (e.key === "Escape") clearAll();
});
