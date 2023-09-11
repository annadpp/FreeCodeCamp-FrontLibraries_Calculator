import { createContext, useState } from "react";
import ReactSwitch from "react-switch";
import "./App.css";

export interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

function App() {
  const [answer, setAnswer] = useState("");
  const [expression, setExpression] = useState("");
  const [theme, setTheme] = useState<string>("dark");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  const et = expression.trim(); //deletes spaces

  const isOperator = (symbol: string) => {
    return /[*/+-]/.test(symbol);
  };

  const buttonPress = (symbol: string) => {
    if (symbol === "clear") {
      setAnswer("");
      setExpression("0");
    } else if (symbol === "negative") {
      if (answer === "") return;
      setAnswer(
        answer.toString().charAt(0) === "-" ? answer.slice(1) : "-" + answer
      );
    } else if (symbol === "percentage") {
      if (answer === "") return;
      setAnswer((parseFloat(answer) / 100).toString());
    } else if (isOperator(symbol)) {
      setExpression(et + " " + symbol + " ");
    } else if (symbol === "=") {
      calculate();
    } else if (symbol === "0") {
      if (expression.charAt(0) !== "0") {
        setExpression(expression + symbol);
      }
    } else if (symbol === ".") {
      //split by operators and get last number
      const lastNumber = expression.split(/[-+/*]/g).pop();
      //if last number already has a decimal, don't add another
      if (lastNumber?.includes(".")) return;
      setExpression(expression + symbol);
    } else {
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + symbol);
      } else {
        setExpression(expression + symbol);
      }
    }
  };

  const calculate = () => {
    //if last char is an operator, do nothing
    if (isOperator(et.charAt(expression.length - 1))) return;
    //clean the expression so only uses last operator if two in a row
    const parts = et.split(" ");
    const newParts = [];

    //loop through parts backwards
    for (let i = parts.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join(" ");
    //checks if operator starting newExpression => makes answer
    if (isOperator(newExpression.charAt(0))) {
      setAnswer(eval(answer + newExpression) as string);
    } else {
      setAnswer(eval(newExpression) as string);
    }
    setExpression("");
  };

  return (
    <>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div
          className={`container flex justify-center max-w-[100vw] h-[100vh] z-50 ${
            theme === "light" ? "bg-[#F1F6F3]" : "bg-lightgrey"
          }`}
          id={theme}
        >
          <div className="flex flex-col items-center justify-center">
            <h1
              className={`mb-6 ${
                theme === "light" ? "text-darkblue" : "text-lightpink"
              }`}
            >
              Calculator
            </h1>
            <div id="calculator">
              <div
                id="display"
                className={`text-right rounded-t-lg border-2 border-b-0 border-black stroke-black  max-w-[300px] h-20 overflow-hidden px-3 ${
                  theme === "light"
                    ? "text-custard bg-lightblue"
                    : "text-creme bg-black"
                }`}
              >
                <div id="answer" className="overflow-hidden h-1/2 mb-2">
                  <p>{answer}</p>
                </div>
                <div id="expression" className="text-lightgrey overflow-hidden">
                  {expression}
                </div>
              </div>
              <div
                id="buttons"
                className="grid grid-cols-[repeat(4,45px)] gap-2 bg-darkpink p-5 rounded-b-lg border-2 border-black justify-center items-center"
              >
                <button
                  className="upper"
                  id="clear"
                  onClick={() => buttonPress("clear")}
                >
                  C
                </button>
                <button
                  className="upper"
                  id="negative"
                  onClick={() => buttonPress("negative")}
                >
                  +/-
                </button>
                <button
                  className="upper"
                  id="percentage"
                  onClick={() => buttonPress("percentage")}
                >
                  %
                </button>
                <button
                  className="right"
                  id="divide"
                  onClick={() => buttonPress("/")}
                >
                  ÷
                </button>
                <button
                  className="middle"
                  id="seven"
                  onClick={() => buttonPress("7")}
                >
                  7
                </button>
                <button
                  className="middle"
                  id="eight"
                  onClick={() => buttonPress("8")}
                >
                  8
                </button>
                <button
                  className="middle"
                  id="nine"
                  onClick={() => buttonPress("9")}
                >
                  9
                </button>
                <button
                  className="right"
                  id="multiply"
                  onClick={() => buttonPress("*")}
                >
                  ×
                </button>
                <button
                  className="middle"
                  id="four"
                  onClick={() => buttonPress("4")}
                >
                  4
                </button>
                <button
                  className="middle"
                  id="five"
                  onClick={() => buttonPress("5")}
                >
                  5
                </button>
                <button
                  className="middle"
                  id="six"
                  onClick={() => buttonPress("6")}
                >
                  6
                </button>
                <button
                  className="right"
                  id="subtract"
                  onClick={() => buttonPress("-")}
                >
                  −
                </button>
                <button
                  className="middle"
                  id="one"
                  onClick={() => buttonPress("1")}
                >
                  1
                </button>
                <button
                  className="middle"
                  id="two"
                  onClick={() => buttonPress("2")}
                >
                  2
                </button>
                <button
                  className="middle"
                  id="three"
                  onClick={() => buttonPress("3")}
                >
                  3
                </button>
                <button
                  className="right"
                  id="add"
                  onClick={() => buttonPress("+")}
                >
                  +
                </button>
                <button
                  className="middle"
                  id="zero"
                  onClick={() => buttonPress("0")}
                >
                  0
                </button>
                <button
                  className="middle"
                  id="decimal"
                  onClick={() => buttonPress(".")}
                >
                  .
                </button>
                <button
                  className="right"
                  id="equals"
                  onClick={() => buttonPress("=")}
                >
                  =
                </button>
              </div>
            </div>
            <div className="switch mt-8 flex justify-center items-center bg-darkgrey rounded-[20px] p-[1.5px]">
              <ReactSwitch
                onChange={toggleTheme}
                checked={theme === "dark"}
                onColor="#ffe1e1"
                offColor="#b8e1f5"
                onHandleColor="#faf4e1"
                offHandleColor="#ffe1e1"
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 0px 0px 1.5px rgba(0, 0, 0, 1)"
                activeBoxShadow="0px 0px 0px 1.5px rgba(0, 0, 0, 1)"
              />
            </div>
          </div>
        </div>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
