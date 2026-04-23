import { useState } from "react";
import "./App.css";

import Form from "./components/Form";
import StepTwo from "./components/StepTwo";
import Footer from "./components/Footer";

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [step, setStep] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      password !== confirmPassword ||
      password === "" ||
      confirmPassword === ""
    ) {
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
      setStep(2);
    }
  };

  return (
    <div className="container">
      {step === 1 ? (
        <h1>Create Account</h1>
      ) : step === 2 ? (
        <h1>Results</h1>
      ) : null}

      {step === 1 ? (
        <Form
          handleSubmit={handleSubmit}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          errorPassword={errorPassword}
          setErrorPassword={setErrorPassword}
        />
      ) : step === 2 ? (
        <StepTwo
          setStep={setStep}
          name={name}
          email={email}
          password={password}
        />
      ) : null}

      <Footer />
    </div>
  );
};

export default App;
