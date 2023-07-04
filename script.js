let firstNum = ""
let secondNum = ""
let operation;
let getFirstNum = true;

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
        content.textContent = firstNum + " ";
    }
}

function adjustFontSize() {
  
    // Reduce font size until content fits within the display
    while (content.offsetWidth > display.offsetWidth) {
      const fontSize = parseFloat(getComputedStyle(content).fontSize);
      content.style.fontSize = (fontSize - 1) + 'px';
    }
}