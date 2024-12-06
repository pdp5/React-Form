import { useState } from "react";
import Authenticate from "./Authenticate";
const SignUpForm = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log("user name: ", userName);
    console.log("password: ", password);

    async function sendData() {
      try {
        const response = await fetch(
          "https://fsa-jwt-practice.herokuapp.com/signup",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: userName, password: password }),
          }
        );
        const data = await response.json();
        console.log("data: ", data);
        console.log("token: ", data.token);
        setToken(data.token);
      } catch (error) {
        console.log(error);
      }
    }
    sendData();
    console.log(token);
    setUserName("");
    setPassword("");
  }
  return (
    <>
      {token ? (
        <div className="signup-msg-div">
          <h2>Thank You for Signing Up!!</h2>
          <Authenticate token={token} setToken={setToken} />
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="signup-form">
            <label>Email: </label>
            <input
              type="text"
              placeholder="example@gmail.com"
              required
              pattern="[A-Za-z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,}"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <label>Password: </label>
            <input
              type="text"
              required
              minLength={7}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="submit-btn" type="submit">
              Submit
            </button>
          </form>
          <Authenticate token={token} setToken={setToken} />
        </>
      )}
    </>
  );
};

export default SignUpForm;
