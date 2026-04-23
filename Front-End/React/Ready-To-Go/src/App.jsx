import { useState } from "react";
import "./App.css";
import "./components/Header.css";
import "./components/Switch.css";

import Header from "./components/Header";
import Switch from "./components/Switch";

const App = () => {
  const [switch1, setSwitch1] = useState(false);
  const [switch2, setSwitch2] = useState(false);
  const [switch3, setSwitch3] = useState(false);

  return (
    <>
      <Header />
      <main>
        <div className="container">
          <div className="switches">
            <Switch switchButton={switch1} setSwitch={setSwitch1} />
            <Switch switchButton={switch2} setSwitch={setSwitch2} />
            <Switch switchButton={switch3} setSwitch={setSwitch3} />
          </div>
          <button
            className="reset-button"
            onClick={() => {
              setSwitch1(false);
              setSwitch2(false);
              setSwitch3(false);
            }}
          >
            EMERGENCY STOP ⚠️
          </button>

          <div
            className={`go-no-way ${switch1 && switch2 && switch3 ? "go" : "no-way"}`}
          >
            {switch1 && switch2 && switch3 ? "Go ! 🚀" : "No-way !"}
          </div>
        </div>
      </main>
      <footer>
        <p>
          Made with <span>Réact </span>at<span> Le Réacteur </span>by
          <span> Musaab AKHLAQ</span>
        </p>
      </footer>
    </>
  );
};
export default App;
