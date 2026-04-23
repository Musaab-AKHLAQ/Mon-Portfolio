import { useState } from "react";
import "./Counter.css";

const Counter = () => {
  const [counter, setCounter] = useState(0);

  const handlePlus = () => {
    setCounter(counter + 1);
  };

  const handleMinus = () => {
    setCounter(counter - 1);
  };

  const handleReset = () => {
    setCounter(0);
  };
  return (
    <div className="Container">
      <div className="Row">
        {counter > 0 && (
          <button className="Big-Btn" onClick={handleMinus}>
            -
          </button>
        )}
        <div className="Counter">{counter}</div>
        {counter < 10 && (
          <button className="Big-Btn" onClick={handlePlus}>
            +
          </button>
        )}
      </div>
      <div className="Reset">
        <button className="Small-Btn" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Counter;
