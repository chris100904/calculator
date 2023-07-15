let firstNum = ""
let secondNum = ""
let operation;
let getFirstNum = true;
let result;
let selectedButton; 
let isZero = false;

const buttons = document.querySelectorAll('.number, .operator, .clear, .negative, .equal');
const display = document.querySelector('.display');
const content = document.querySelector('.display .content');

buttons.forEach((button) => {
    button.addEventListener("click", function() {
        selectedButton = button.className;
        switch (button.className) {
            case "number":
                if (!isZero){
                    if (getFirstNum){
                        firstNum += button.textContent;
                        updateDisplay();
                        if (Number(firstNum) == 0){
                            isZero = true;
                        }
                    }
                    else{
                        secondNum += button.textContent;
                        updateDisplay();
                        if (Number(secondNum) == 0){
                            isZero = true;
                        }
                    }
                    adjustFontSize();
                    break;
                }
            // case "decimal":
            //     if 
            case "operator":
                // extra function for when secondNum exists but new operator is selected
                operation = button.id;
                getFirstNum = false;
                isZero = false;
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
                content.textContent = result;
                firstNum = String(result);
                secondNum = "";
                break;
        }
    })
});

function add(a, b) {
  return Number(a) + Number(b);
}

function subtract(a, b) {
  return Number(a) - Number(b);
}

function multiply(a, b) {
  return Number(a) * Number(b);
}

function divide(a, b) {
  return Number(a) / Number(b);
}

function updateDisplay(){
    if (!isZero){
        if (getFirstNum){
            content.textContent = firstNum;
        }
        else{
            content.textContent = secondNum;
        }
    }
        // if (content.textContent = "0"){
        //     isZero = true;
        // }
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