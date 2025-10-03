"use strict";
let display = document.getElementById("display");
let buttons = document.querySelectorAll("BUTTON");
let expression = '';
function appendvalue(value) {
    expression += value;
    display.value = expression;
}
function calculate() {
    try {
        const result = eval_ex(expression);
        display.value = result.toString();
        expression = result.toString();
    }
    catch (error) {
        display.value = "error";
        expression = "";
    }
}
function eval_ex(expression) {
    if (/\/0(?!\d)/.test(expression)) {
        throw new Error("Division BY Zero");
    }
    const result = eval(expression);
    return result;
}
function cleardisplay() {
    display.value = '';
    expression = '';
}
buttons.forEach((button) => button.addEventListener('click', () => {
    const value = button.textContent || '';
    if (value === "C") {
        cleardisplay();
    }
    else if (value === "=") {
        calculate();
    }
    else {
        appendvalue(value);
    }
}));
//# sourceMappingURL=index.js.map