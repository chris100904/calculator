let firstNum = "";
let secondNum = "";
let operation;
let getFirstNum = true;
let result;
let selectedButton;
let isZero = false;

const buttons = document.querySelectorAll(
  ".number, .operator, .clear, .negative, .equal, .decimal"
);
const display = document.querySelector(".display");
const content = document.querySelector(".display .content");

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    selectedButton = button.className;
    switch (button.className) {
      case "number":
        handleNumberInput(button.textContent);
        break;
      case "operator":
        handleOperatorInput(button.id);
        break;
      case "equal":
        operate();
        break;
      case "clear":
        clearDisplay();
        getFirstNum = true;
        firstNum = "";
        secondNum = "";
        break;
      case "decimal":
        handleDecimal();
        break;
    case "negative":
        if (content.textContent !== ""){
            if (getFirstNum){
                firstNum = String(Number(firstNum) * -1);
            }
            else {
                secondNum = String(Number(secondNum) * -1);
            }
            updateDisplay();
        }    
    }
  });
});

function operate() {
  switch (operation) {
    case "+":
    case "add":
      result = add(firstNum, secondNum);
      break;
    case "-":
    case "subtract":
      result = subtract(firstNum, secondNum);
      break;
    case "*":
    case "multiply":
      result = multiply(firstNum, secondNum);
      break;
    case "/":
    case "divide":
      result = divide(firstNum, secondNum);
      break;
  }
  content.textContent = result;
  firstNum = String(result);
  secondNum = "";
}

function add(a, b) {
  const sum = Number(a) + Number(b);
  return formatResult(sum);
}

function subtract(a, b) {
  const difference = Number(a) - Number(b);
  return formatResult(difference);
}

function multiply(a, b) {
  const product = Number(a) * Number(b);
  return formatResult(product);
}

function divide(a, b) {
  if (b == 0) {
    return "Undefined";
  }
  const quotient = Number(a) / Number(b);
  return formatResult(quotient);
}

function updateDisplay() {
  if (!isZero) {
    if (getFirstNum) {
      content.textContent = firstNum;
    } else {
      content.textContent = secondNum;
    }
  }
}

function clearDisplay() {
  content.textContent = "";
}

function adjustFontSize() {
  while (content.offsetWidth > display.offsetWidth) {
    const fontSize = parseFloat(getComputedStyle(content).fontSize);
    content.style.fontSize = fontSize - 1 + "px";
  }
}

function getDecimalPlaces(num) {
  const decimalPart = String(num).split(".")[1];
  return decimalPart ? decimalPart.length : 0;
}

function formatResult(result) {
  const decimalPlaces = getDecimalPlaces(result);
  if (Number.isInteger(result)) {
    return result.toFixed(0); // Display as an integer
  } else if (decimalPlaces > 2) {
    return result.toFixed(4).replace(/\.?0+$/, ""); // Remove trailing zeros for irrational numbers
  } else {
    return result.toFixed(2).replace(/\.?0+$/, ""); // Display 2 decimal places for other numbers
  }
}

// keyboard implementation

document.addEventListener("keydown", function (event) {
  const key = event.key;

  // Handle number keys
  if (/^\d$/.test(key)) {
    handleNumberInput(key);
  }

  // Handle operator keys
  if (key === "+" || key === "-" || key === "*" || key === "/") {
    handleOperatorInput(key);
  }

  // Handle equal key
  if (key === "=" || key === "Enter") {
    handleEqual();
  }

  // Handle clear key
  if (key === "Escape") {
    handleClear();
  }

  // Handle decimal key
  if (key === ".") {
    handleDecimal();
  }

  if (key === 'Backspace') {
    handleBackspace();
  }
});

function handleNumberInput(number) {
  if (!isZero) {
    if (getFirstNum) {
      firstNum += number;
      updateDisplay();
      if (Number(firstNum) == 0) {
        isZero = true;
      }
    } else {
      secondNum += number;
      updateDisplay();
      if (Number(secondNum) == 0) {
        isZero = true;
      }
    }
    adjustFontSize();
  }
}

function handleOperatorInput(op) {
  if (secondNum !== "") {
    operate();
  }
  operation = op;
  getFirstNum = false;
  isZero = false;
}

function handleEqual() {
  operate();
}

function handleClear() {
  clearDisplay();
  getFirstNum = true;
  firstNum = "";
  secondNum = "";
}

function handleDecimal(){
    if (!content.textContent.includes(".")) {
        if (getFirstNum) {
          if (firstNum == "") {
            firstNum += "0.";
          } else {
            firstNum += ".";
          }
        } else {
          if (secondNum == "") {
            secondNum += "0.";
          } else {
            secondNum += ".";
          }
        }
        isZero = false;
        updateDisplay();
      }
}

function handleBackspace(){
    if (getFirstNum){
        firstNum = firstNum.slice(0, firstNum.length -1);
    }
    else {
        secondNum = secondNum.slice(0, secondNum.length -1);
    }
    updateDisplay();
}