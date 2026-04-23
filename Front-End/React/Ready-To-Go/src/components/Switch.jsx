const Switch = ({ switchButton, setSwitch }) => {
  return (
    <div className="switch">
      <div
        onClick={() => setSwitch(true)}
        className={switchButton ? "on" : "off"}
      >
        ON
      </div>
      <div
        onClick={() => setSwitch(false)}
        className={switchButton ? "off" : "on"}
      >
        OFF
      </div>
    </div>
  );
};

export default Switch;
