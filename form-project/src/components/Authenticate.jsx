import { useState } from "react";
import SignUpForm from "./SignUpForm";
const Authenticate = ({ token, setToken }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [data, setData] = useState("");
  function handleClick() {
    async function authenticate() {
      try {
        const response = await fetch(
          "https://fsa-jwt-practice.herokuapp.com/authenticate",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setData(data);
        console.log(data);
        if (data.success) {
          setAuthenticated(true);
        }
        setButtonClicked(true);
      } catch (error) {
        console.log(error);
      }
    }
    authenticate();
  }
  function handleBackSignUpbtn() {
    setSignUp(true);
    setToken("");
  }

  return (
    <>
      {signUp ? (
        <SignUpForm />
      ) : (
        <>
          {authenticated ? (
            <div className="authenticated-msg">
              <h2>{data.message}</h2>
              <h3>Welcome {data.data.username}</h3>
              <button onClick={handleBackSignUpbtn}>Back to SignUp</button>
            </div>
          ) : (
            <div className="button">
              {buttonClicked && <h2>You're not authenticated!!</h2>}
              <button className="authenticate-btn" onClick={handleClick}>
                Authenticate
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Authenticate;
