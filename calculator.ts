class Calculator {
  private current: string = '';
  private previous: string = '';
  private operator: string | null = null;
  private displayEl: HTMLInputElement;

  constructor(displayEl: HTMLInputElement) {
    this.displayEl = displayEl;
  }

  // Add digit or decimal
  inputDigit(d: string): void {
    if (d === '.' && this.current.includes('.')) return; // prevent multiple decimals
    this.current += d;
    this.updateDisplay();
  }

  // Set operator
  setOperator(op: string): void {
    if (this.current === '' && this.previous === '') return;

    if (this.previous !== '') {
      this.compute(); // chain calculations
    } else {
      this.previous = this.current;
    }

    this.current = '';
    this.operator = op;
  }

  // Perform calculation
  compute(): void {
    const a: number = parseFloat(this.previous);
    const b: number = parseFloat(this.current);

    if (isNaN(a) || isNaN(b)) return;

    let res: number;
    switch (this.operator) {
      case '+': res = a + b; break;
      case '-': res = a - b; break;
      case '*': res = a * b; break;
      case '/':
        if (b === 0) {
          this.displayEl.value = "Error (÷0)";
          this.clear();
          return;
        }
        res = a / b;
        break;
      default: return;
    }

    this.previous = String(res);
    this.current = '';
    this.operator = null;
    this.updateDisplay();
  }

  // Clear calculator
  clear(): void {
    this.current = '';
    this.previous = '';
    this.operator = null;
    this.updateDisplay();
  }

  // Update screen
  private updateDisplay(): void {
    this.displayEl.value = this.current || this.previous || '0';
  }
}

// ---------------------
// Connect to UI
// ---------------------
const display = document.getElementById('display') as HTMLInputElement;
const calc = new Calculator(display);

const buttons: string[] = [
  '7','8','9','/',
  '4','5','6','*',
  '1','2','3','-',
  '0','.','=','+',
  'C'
];

const container = document.getElementById('buttons')!;
buttons.forEach(label => {
  const btn = document.createElement('button');
  btn.textContent = label;
  btn.addEventListener('click', () => {
    if (!isNaN(Number(label)) || label === '.') {
      calc.inputDigit(label);
    } else if (label === 'C') {
      calc.clear();
    } else if (label === '=') {
      calc.compute();
    } else {
      calc.setOperator(label);
    }
  });
  container.appendChild(btn);
});
