class Model {
  constructor() {
    this.ARRAY_BUTTON = [
      {
        name: "add",
        text: "+",
        type: "operator",
      },
      {
        name: "subtract",
        text: "-",
        type: "operator",
      },
      {
        name: "multiply",
        text: "*",
        type: "operator",
      },
      {
        name: "divide",
        text: "/",
        type: "operator",
      },
      {
        name: "7",
        text: 7,
        type: "number",
      },
      {
        name: "8",
        text: 8,
        type: "number",
      },
      {
        name: "9",
        text: 9,
        type: "number",
      },
      {
        name: "calculate",
        text: "=",
        type: "calculate",
      },

      {
        name: "4",
        text: 4,
        type: "number",
      },
      {
        name: "5",
        text: 5,
        type: "number",
      },
      {
        name: "6",
        text: 6,
        type: "number",
      },

      {
        name: "1",
        text: 1,
        type: "number",
      },
      {
        name: "2",
        text: 2,
        type: "number",
      },
      {
        name: "3",
        text: 3,
        type: "number",
      },

      {
        name: "0",
        text: 0,
        type: "number",
      },
      {
        name: "dot",
        text: ".",
        type: "decimal",
      },

      {
        name: "clear",
        text: "AC",
        type: "clear",
      },
    ];
    this.num1;
    this.num2;
    this.operator;
    this.keyContent = "0";
    this.preType;
  }

  calculate = () => {
    if (this.operator === "add") {
      return (this.result = parseFloat(this.num1) + parseFloat(this.num2));
    }
    if (this.operator === "subtract") {
      return (this.result = parseFloat(this.num1) - parseFloat(this.num2));
    }
    if (this.operator === "multiply") {
      return (this.result = parseFloat(this.num1) * parseFloat(this.num2));
    }
    if (this.operator === "divide" && this.num2 !== "0") {
      return (this.result = parseFloat(this.num1) / parseFloat(this.num2));
    } else return (this.result = "Error");
  };
  numberButton = (displayNum, keyValue) => {
    if (
      displayNum === "0" ||
      this.preType === "operator" ||
      this.preType === "result"
    ) {
      this.keyContent = keyValue;
    } else {
      this.keyContent = displayNum + keyValue;
    }
    this.preType = "number";
  };
  operatorButton = (keyValue, keyDisplay) => {
    if (this.operator === undefined) {
      this.preType = "operator";
      this.num1 = this.keyContent;
      this.keyContent = keyDisplay;
      this.operator = keyValue;
    } else {
      this.num1 = this.calculate(this.num1, this.operator, this.keyContent);
      this.preType = "operator";
      this.operator = keyValue;
      this.keyContent = keyDisplay;
    }
  };
  clearButon = () => {
    this.keyContent = "0";
    this.operator = undefined;
    this.preType = "clear";
  };
  decimalButton = () => {
    if (!this.keyContent.includes(".") && this.preType != "operator") {
      this.keyContent = `${this.keyContent}.`;
    } else if (this.preType == "operator") {
      this.keyContent = "0.";
    }
  };
  equaButton = () => {
    this.num2 = this.keyContent;

    if (this.num1 != undefined && this.operator && this.preType != "operator") {
      this.keyContent = this.calculate(this.num1, this.operator, this.num2);
      this.preType = "result";
      this.operator = undefined;
    }
    if (this.operator === undefined) {
      this.preType = "result";
    } else {
      this.keyContent = "Error";
      this.operator = undefined;
    }
  };

  getKeyContent = () => {
    return this.keyContent;
  };
}

class View {
  constructor() {
    this.container = this.getElement(".main");
    this.title = this.createElement("h3");
    this.title.textContent = "Calculator";
    this.calculator = this.createElement("div", "calculator");
    this.display = this.createElement("div", "calculator__display");
    this.display.innerHTML = "0";
    this.button = this.createElement("div", "calculator__keys");
    this.calculator.append(this.title, this.display, this.button);
    this.container.append(this.calculator);
  }
  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }

  getElement(selector) {
    const element = document.querySelector(selector);
    return element;
  }
  render(buttons) {
    buttons.forEach((button) => {
      if (button.type == "number") {
        this.button.innerHTML += `<button class="${button.type}">${button.text}</button>`;
      } else
        this.button.innerHTML += `<button class="${button.type}" data-action = ${button.name}>${button.text}</button>`;
    });
  }

  displayNum = (value) => {
    this.display.innerHTML = value;
  };

  getDisplay = () => {
    return this.display.innerHTML;
  };

  bindNumber = (handler) => {
    this.button.addEventListener("click", (e) => {
      if (e.target.className == "number") {
        const keyValue = e.target.innerHTML;
        handler(keyValue);
      }
    });
  };
  bindDecimal = (handler) => {
    this.button.addEventListener("click", (e) => {
      if (e.target.className === "decimal") {
        console.log("decimal");
        handler();
      }
    });
  };
  bindAction = (handler) => {
    this.button.addEventListener("click", (e) => {
      if (e.target.className === "operator") {
        const keyValue = e.target.dataset.action;
        const keyDisplay = e.target.innerHTML;
        console.log(keyDisplay);
        handler(keyValue, keyDisplay);
      }
    });
  };

  bindClear = (handler) => {
    this.button.addEventListener("click", (e) => {
      if (e.target.dataset.action === "clear") {
        handler();
      }
    });
  };

  bindEqua = (handler) => {
    this.button.addEventListener("click", (e) => {
      if (e.target.dataset.action === "calculate") {
        handler();
      }
    });
  };
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.view.render(this.model.ARRAY_BUTTON);
    this.view.bindNumber(this.handleNumber);
    this.view.bindClear(this.handleClear);
    this.view.bindAction(this.handleOperation);
    this.view.bindEqua(this.handleCalculate);
    this.view.bindDecimal(this.handleDecimal);
  }
  handleNumber = (keyValue) => {
    this.model.numberButton(this.view.getDisplay(), keyValue);
    this.view.displayNum(this.model.getKeyContent());
  };
  handleOperation = (keyValue, keyDisplay) => {
    this.model.operatorButton(keyValue, keyDisplay);
    this.view.displayNum(this.model.getKeyContent());
  };
  handleDecimal = () => {
    this.model.decimalButton();
    this.view.displayNum(this.model.getKeyContent());
  };
  handleClear = () => {
    this.model.clearButon();
    this.view.displayNum(this.model.getKeyContent());
  };
  handleCalculate = () => {
    this.model.equaButton();
    this.view.displayNum(this.model.getKeyContent());
  };
}

const app = new Controller(new Model(), new View());
const app2 = new Controller(new Model(), new View());
const app3 = new Controller(new Model(), new View());
