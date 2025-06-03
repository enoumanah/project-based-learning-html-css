const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys");
const display = calculator.querySelector(".calculator__display");

let firstValue = "";
let operator = "";
let previousKeyType = "";
let modValue = "";
let awaitingNextValue = false;

keys.addEventListener("click", (e) => {
  if (!e.target.matches("button")) return;

  const key = e.target;
  const action = key.dataset.action;
  const keyContent = key.textContent;
  const displayedNum = display.textContent;

  if (!action) {
    if (
      displayedNum === "0" ||
      previousKeyType === "operator" ||
      previousKeyType === "calculate"
    ) {
      display.textContent = keyContent;
    } else {
      display.textContent = displayedNum + keyContent;
    }
    previousKeyType = "number";
  }

  if (action === "decimal") {
    if (!displayedNum.includes(".")) {
      display.textContent = displayedNum + ".";
    } else if (
      previousKeyType === "operator" ||
      previousKeyType === "calculate"
    ) {
      display.textContent = "0.";
    }
    previousKeyType = "decimal";
  }

  if (
    action === "add" ||
    action === "subtract" ||
    action === "multiply" ||
    action === "divide"
  ) {
    const firstNum = firstValue;
    const operatorValue = operator;
    const secondNum = displayedNum;

    if (
      firstNum &&
      operatorValue &&
      previousKeyType !== "operator" &&
      previousKeyType !== "calculate"
    ) {
      const calcValue = calculate(firstNum, operatorValue, secondNum);
      display.textContent = calcValue;
      firstValue = calcValue;
    } else {
      firstValue = displayedNum;
    }

    operator = action;
    previousKeyType = "operator";
  }

  if (action === "clear") {
    display.textContent = "0";
    firstValue = "";
    operator = "";
    previousKeyType = "";
    modValue = "";
    awaitingNextValue = false;
  }

  if (action === "calculate") {
    let secondValue = displayedNum;
    if (firstValue) {
      if (previousKeyType === "calculate") {
        firstValue = displayedNum;
        secondValue = modValue;
      }
      display.textContent = calculate(firstValue, operator, secondValue);
    }
    modValue = secondValue;
    previousKeyType = "calculate";
  }
});

function calculate(n1, operator, n2) {
  const firstNum = parseFloat(n1);
  const secondNum = parseFloat(n2);
  if (operator === "add") return firstNum + secondNum;
  if (operator === "subtract") return firstNum - secondNum;
  if (operator === "multiply") return firstNum * secondNum;
  if (operator === "divide") return firstNum / secondNum;
}
