import { useState } from "react";
import { BsCheckAll } from "react-icons/bs";

const hasNumber = /\d/,
  hasUppercase = /[A-Z]/,
  hasLowercase = /[a-z]/,
  hasSpecialChar = /[^A-Za-z0-9]/;

const App = () => {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("weak");
  const [score, setScore] = useState(0);

  const handlePasswordEvent = (e) => {
    setPassword(e.target.value);

    let score = 0;
    if (password.length > 3) {
      score = Math.min(6, Math.floor(password.length / 3));
      score +=
        +hasNumber.test(password) +
        +hasLowercase.test(password) +
        +hasUppercase.test(password) +
        +hasSpecialChar.test(password);
    }

    setScore(score);

    if (score > 8) {
      setStrength("strong");
    } else if (score > 5) {
      setStrength("medium");
    } else {
      setStrength("weak");
    }
  };

  return (
    <div className="container">
      <div className="title">
        <h1>Password Strength</h1>
        <div className="underline"></div>
      </div>

      <div className="wrapper">
        <input
          type="text"
          value={password}
          onChange={handlePasswordEvent}
          placeholder="Enter Your Password"
        />

        <div className="indicators">
          <span className={password.length >= 8 ? "active" : ""}>
            <BsCheckAll /> at least 8 characters long
          </span>
          <span className={hasUppercase.test(password) ? "active" : ""}>
            <BsCheckAll /> contains uppercase letter
          </span>
          <span className={hasLowercase.test(password) ? "active" : ""}>
            <BsCheckAll /> contains lowercase letter
          </span>
          <span className={hasNumber.test(password) ? "active" : ""}>
            <BsCheckAll /> contains numbers
          </span>
          <span className={hasSpecialChar.test(password) ? "active" : ""}>
            <BsCheckAll /> contains special characters
          </span>
        </div>

        <div className="password-strength">
          <p>
            Your Password is <span className={strength}>{strength}</span>
          </p>
          <div className="strength-bar">
            <div
              className="progressBar"
              style={{
                width: `${score * 10}%`,
                backgroundColor:
                  score > 5 ? (score > 8 ? "green" : "orange") : "red",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
