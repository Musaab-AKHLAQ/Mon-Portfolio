const StepTwo = ({ name, email, password, setStep }) => {
  return (
    <div className="results">
      <div>
        <span>Name : {name}</span>
        <span>Email : {email}</span>
        <span>Password : {password}</span>
      </div>
      <button className="back-button" onClick={() => setStep(1)}>
        Edit your information
      </button>
    </div>
  );
};

export default StepTwo;
