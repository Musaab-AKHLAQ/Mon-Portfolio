const Counter = ({ item, index, counters, setCounters }) => {
  const handlePlus = () => {
    const newTab = [...counters];
    newTab[index] = newTab[index] + 1;
    setCounters(newTab);
  };

  const handleMinus = () => {
    const newTab = [...counters];
    newTab[index] = newTab[index] - 1;
    setCounters(newTab);
  };

  const handleReset = () => {
    const newTab = [...counters];
    newTab[index] = 0;
    setCounters(newTab);
  };

  return (
    <div className="counter">
      <div className="control">
        {item > 0 && <button onClick={handleMinus}> - </button>}
        <span>{item}</span>
        {item < 10 && <button onClick={handlePlus}> + </button>}
      </div>
      <div className="reset-btn">
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default Counter;
