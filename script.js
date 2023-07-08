let firstNum = ""
let secondNum = ""
let operation;
let getFirstNum = true;
let result;

const buttons = document.querySelectorAll('.number, .operator, .single, .double');
const display = document.querySelector('.display');
const content = document.querySelector('.display .content');

buttons.forEach((button) => {
    button.addEventListener("click", function() {
        switch (button.className) {
            case "number":
                if (getFirstNum){
                    firstNum += button.textContent;
                    updateDisplay();
                }
                else{
                    secondNum += button.textContent;
                    updateDisplay();
                }
                adjustFontSize();
                break;
            case "operator":
                // extra function for when secondNum exists but new operator is selected
                operation = button.id;
                getFirstNum = false;
                // clearDisplay();
                break;
            case "equal":
                switch (operation) {
                    case "add":
                        result = add(firstNum, secondNum);
                        break;
                    case "subtract":
                        result = subtract(firstNum, secondNum);
                        break;
                    case "multiply":
                        result = multiply(firstNum, secondNum);
                        break;
                    case "divide":
                        result = divide(firstNum, secondNum);
                        break;
                }
                // content.textContent += result;
        }
    })
});

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

function operate(a, b, operator) {
  switch (operator) {
    case "+":
      add(a, b);
      break;
    case "-":
      subtract(a, b);
      break;
    case "*":
      multiply(a, b);
      break;
    case "/":
      divide(a, b);
      break;
  }
}

function updateDisplay(){
    if (getFirstNum){
        content.textContent = firstNum;
    }
    else{
        content.textContent = secondNum;
    }
}

function clearDisplay(){
    // need to add something to only clear the bottom row when top row is storing previous operation
    // think of the logic
    content.textContent = "";
}

function adjustFontSize() {
    // Reduce font size until content fits within the display
    while (content.offsetWidth > display.offsetWidth) {
      const fontSize = parseFloat(getComputedStyle(content).fontSize);
      content.style.fontSize = (fontSize - 1) + 'px';
    }
}