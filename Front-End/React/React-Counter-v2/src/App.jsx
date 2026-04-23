import "./App.css";
import { useState } from "react";

import Header from "./components/Header";
import Counter from "./components/Counter";
import Footer from "./components/Footer";

const App = () => {
  const [counters, setCounters] = useState([0]);

  return (
    <div className="container">
      <Header />
      <main>
        <section>
          {counters.length < 3 && (
            <button
              onClick={() => {
                if (counters.length < 3) {
                  const newTab = [...counters];
                  newTab.push(0);
                  setCounters(newTab);
                }
              }}
            >
              Add Counter
            </button>
          )}
        </section>
        <section>
          {counters.map((item, index) => (
            <Counter
              key={index}
              item={item}
              index={index}
              counters={counters}
              setCounters={setCounters}
            />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;
