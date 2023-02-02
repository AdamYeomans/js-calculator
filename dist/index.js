// Calculator
// Plan of action:

// Storage of data:
// Store data in an array
// First value is n1
// 2nd is operation type
// 3rd is n2

// Pressing a button will input it's value or operation into the array.

// Pressing value will put data into n1
// If operation is set, put into n2

// Values are stored as strings, append values to end of string.

// If operation is pressed without n1, set n1 to 0
// If operation is pressed when an operation has already been set, change operation
// If operation is pressed after 2nd value; equate then take that as n1, with operation. Proceed to n2 entering.

// If equals is pressed, equate then display result. Enter result as n1, wipe rest of array.

data = ["", "", ""];
// Stage tracks what stage we are in. Pressing an operation moves stage from 0 to 2 (As it is stage 1);
stage = 0;

// Place event listeners

for (let index = 0; index < 10; index++) {
    let button = document.getElementById(String(index));
    // console.log(button);
    button.onclick = function () { appendItem(index, stage) };
}

operands = ['divide', 'multiply', 'add', 'subtract'];
for (let index = 0; index < operands.length; index++) {
    const element = operands[index];
    let button = document.getElementById(element);
    button.onclick = function () { appendOperand(button.id) };
}

let button = document.getElementById("equate");
button.onclick = function () { equate() };

button = document.getElementById("clear");
button.onclick = function () { clear() };

button = document.getElementById("decimal");
button.onclick = function () { appendItem(convertSymbol(button.id), stage) };

button = document.getElementById("backspace");
button.onclick = function () { backspace() };

// Keyboard event listener
document.addEventListener('keydown', function (event) {
    console.log(event.key)
    switch(event.key) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
            appendItem(event.key, stage);
            break;
        case "/":
            appendOperand("divide");
            break;
        case "*":
            appendOperand("multiply");
            break;
        case "-":
            appendOperand("subtract");
            break;
        case "+":
            appendOperand("add");
            break;
        case "Enter":
            equate();
            break;
        case "Backspace":
            backspace();
        case "Escape":
            clear();
    }
});


// Functions

function appendItem(value, stageOnButton) {
    if (stageOnButton == -1) {
        // After equate, clicking a number will clear.
        data[0] = "";
        stage = 0;
        data[0] += value;
        console.log(data);
        console.log(stage)
        display();
    }
    else {
        data[stageOnButton] += value;
        console.log(data);
        display();
    }
}

function appendOperand(operand) {
    if (stage === -1) {
        // After equate, if an operand is pressed,  set and proceed to stage 2.
        data[1] = operand;
        stage = 2;
    }
    else if (stage === 2 && data[2] !== "") {
        // Handling of when 2nd number has been inputted.
        // Equate, set stage to 2.
        equate();
        stage = 2;
        data[1] = operand;
    }
    else if (stage === 2 && data[2] === "") {
        // Handling for when 2nd operand is hit after first operand has already been.
        data[1] = operand;
    }
    else if (stage === 0 && data[0] === "") {
        // Handling of when first input is empty and operand was entered.
        data[0] += "0";
        stage += 2;
        data[1] = operand;
    }
    else {
        stage += 2;
        data[1] = operand;
    }
    display();
}

function equate() {
    if (stage === 0 || data[1] === "" || stage === -1) {
        // When nothing has been entered, or when no operation has been entered, do nothing
        return;
    }
    else if (data[1] === "add") {
        data[0] = Number(data[0]) + Number(data[2]);
        data[1] = "";
        data[2] = "";
    }
    else if (data[1] === "subtract") {
        data[0] = Number(data[0]) - Number(data[2]);
        data[1] = "";
        data[2] = "";
    }
    else if (data[1] === "divide") {
        if (Number(data[2]) === 0) {
            alert("Cannot divide by 0");
            data[2] = "";
            return;
        }
        data[0] = Number(data[0]) / Number(data[2]);
        data[1] = "";
        data[2] = "";
    }
    else if (data[1] === "multiply") {
        data[0] = Number(data[0]) * Number(data[2]);
        data[1] = "";
        data[2] = "";
    }
    data[0] = String(data[0]);
    console.log(data);
    stage = -1;
    display();
}

function convertSymbol(text) {
    if (text === "add") {
        return "+";
    }
    else if (text === "subtract") {
        return "-";
    }
    else if (text === "divide") {
        return "÷";
    }
    else if (text === "multiply") {
        return "×";
    }
    else if (text === "decimal") {
        return ".";
    }
}

function display() {
    let displayElement = document.getElementById("display-text");
    if (stage === 0 || stage === -1) {
        displayElement.innerText = data[0];
    }
    else if (stage === 2) {
        displayElement.innerText = data[0] + " " + convertSymbol(data[1]) + " " + data[2];
    }
}

function clear() {
    stage = 0;
    for (let index = 0; index < data.length; index++) {
        data[index] = "";
    }
    display();
}

function backspace() {
    if (stage === 0 && data[0] != "") {
        // Backspacing from first number
        data[0] = data[0].slice(0, -1);
    }
    else if (stage === 2 && data[2] === "") {
        // Entering 2nd number but 2nd number is empty. Backspace the operand.
        stage = 0;
        data[1] = "";
    }
    else if (stage === 2 && data[2] !== "") {
        data[2] = data[2].slice(0, -1);
    }
    else if (stage === -1 && data[0] != "") {
        data[0] = data[0].slice(0, -1);
        stage = 0;
    }
    console.log(data)
    display();
}