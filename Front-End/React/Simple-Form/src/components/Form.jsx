import { useState } from "react";

const Form = ({
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  errorPassword,
  setErrorPassword,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <span>Name</span>
      <input
        value={name}
        placeholder="Musaab AKHLAQ"
        onChange={(e) => setName(e.target.value)}
      />
      <span>Email</span>
      <input
        value={email}
        placeholder="musaabakhlaq@gmail.com"
        onChange={(e) => setEmail(e.target.value)}
      />
      <span>Password</span>
      <div>
        <input
          className={errorPassword ? "error" : null}
          value={password}
          type={showPassword ? "text" : "password"}
          placeholder="Cef5A@La"
          onChange={(e) => {
            setErrorPassword(false);
            setPassword(e.target.value);
          }}
        />
        <span
          class="material-symbols-outlined password-icon"
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        >
          visibility
        </span>
      </div>
      <span>Confirm Password</span>
      <div>
        <input
          className={errorPassword ? "error" : null}
          value={confirmPassword}
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Cef5A@La"
          onChange={(e) => {
            setErrorPassword(false);
            setConfirmPassword(e.target.value);
          }}
        />
        <span
          class="material-symbols-outlined password-icon"
          onClick={() => {
            setShowConfirmPassword(!showConfirmPassword);
          }}
        >
          visibility
        </span>
      </div>
      {errorPassword && (
        <span className="error-message">
          Les mots de passes ne sont pas identiques !
        </span>
      )}
      <button className="submit-button" type="submit">
        Register
      </button>
    </form>
  );
};

export default Form;
