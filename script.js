let result = "";
let currentOperator = "";
let history = [];

function appendNumber(number) {
  result += number;
  updateResult();
}

function appendOperator(operator) {
  if (result !== "") {
    currentOperator = operator;
    result += " " + operator + " ";
    updateResult();
  }
}

function updateResult() {
  document.getElementById("result").value = result;
}

function clearResult() {
  result = "";
  currentOperator = "";
  updateResult();
}

function calculate() {
  try {
    const calculatedResult = evaluateExpression(result);
    result = calculatedResult.toString();
    saveToHistory(result);
    updateResult();
  } catch (error) {
    result = "Error";
    updateResult();
  }
}

function evaluateExpression(expression) {
  const operators = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b
  };

  const tokens = expression.split(' ');
  let numbers = [];
  let currentOperator = null;

  for (const token of tokens) {
    if (['+', '-', '*', '/'].includes(token)) {
      currentOperator = token;
    } else {
      const number = parseFloat(token);
      if (!isNaN(number)) {
        if (currentOperator) {
          const previousNumber = numbers.pop();
          const result = operators[currentOperator](previousNumber, number);
          numbers.push(result);
          currentOperator = null;
        } else {
          numbers.push(number);
        }
      }
    }
  }

  return numbers.reduce((acc, val) => acc + val, 0);
}

function saveToHistory(result) {
  const expression = result.trim();
  if (expression !== "") {
    history.push(expression);
    updateHistoryList();
  }
}

function clearHistory() {
  history = [];
  updateHistoryList();
}

function updateHistoryList() {
  const historyList = document.getElementById("historyList");
  historyList.innerHTML = "";
  for (const expression of history) {
    const listItem = document.createElement("li");
    listItem.textContent = expression;
    historyList.appendChild(listItem);
  }
}
