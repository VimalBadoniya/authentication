import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./AuthPage.css";
import LoginContext from "../source/login-context";

function AuthPage(props) {
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const ctx = useContext(LoginContext);

  const loginHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAN4HhrzA2P9oL3JiL9Fei1YDyXVxdIRWY",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (response) => {
        setIsLoading(false);
        if (response.ok) {
          
          ctx.setLoginState(true);
          navigate("/profile");
          return response.json();
        } else {
          const data = await response.json();
          console.log(data);
          throw new Error(data.error.errors);
        }
      })
      .then((data) => {
        console.log(data);
        console.log(data.idToken);
        ctx.setToken(data.idToken)
      })
      .catch((error) => {
        console.log(error);
        alert("Login Failed");
      });
  };

  const guestLoginHandler = (event) => {
    //showing firebase error - admin only operation
    event.preventDefault();
    setIsLoading(true);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAN4HhrzA2P9oL3JiL9Fei1YDyXVxdIRWY",
      {
        method: "POST",
        body: JSON.stringify({
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        setIsLoading(false);
        if (response.ok) {
          ctx.setGuestLoginState(true);
          navigate("/profile");
        } else {
          return response.json().then((data) => {
            console.log(data);
            alert(data.error.errors);
          });
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Login Failed");
      });
  };

  const signupHandler = (event) => {
    // we can make URL dynamic only and use only 1 code to change the url , so we will not need 2 seperate handlers for login and signup
    event.preventDefault();
    setIsLoading(true);
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAN4HhrzA2P9oL3JiL9Fei1YDyXVxdIRWY",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        setIsLoading(false);
        if (response.ok) {
          ctx.setLoginState(true);
          navigate("/profile");
        } else {
          return response.json().then((data) => {
            alert(data.error.errors);
          });
        }
      })
      .catch((err) => {
        console.log(err + "    haooo catchy");
      });
  };

  return (
    <React.Fragment>
      {props.loginpage && (
        <div className="centered signup-div">
          <div className="centered heading">
            <h2>Login</h2>
          </div>
          <div>
            <form className="login-form" onSubmit={loginHandler}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="input"
                required
                ref={emailRef}
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="input"
                required
                ref={passwordRef}
              />
              {isLoading ? (
                <h3>Sending Data Please Wait</h3>
              ) : (
                <button className="button" type="submit">
                  Login
                </button>
              )}
              <NavLink to="/auth:signup" className="color">
                New User ? Create New Account
              </NavLink>
            </form>
          </div>
        </div>
      )}

      {props.signuppage && (
        <div className="centered signup-div">
          <div className="centered heading">
            <h2>Signup</h2>
          </div>
          <div>
            <form className="login-form" onSubmit={signupHandler}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="input"
                required
                ref={emailRef}
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="input"
                required
                ref={passwordRef}
              />
              {isLoading ? (
                <h3>Sending Data Please Wait</h3>
              ) : (
                <button className="button" type="submit">
                  Signup
                </button>
              )}
              <NavLink to="/auth:login" className="color">
                Existing User ? Login Here
              </NavLink>
            </form>
          </div>
        </div>
      )}

      {props.guestloginpage && (
        <div className="centered signup-div">
          <div className="centered heading">
            <h2>Login as Guest</h2>
          </div>
          <div>
            <form className="login-form" onSubmit={guestLoginHandler}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="input"
                required
                ref={emailRef}
              />
              <label htmlFor="number">Phone</label>
              <input
                type="number"
                id="number"
                name="number"
                className="input"
                required
                ref={passwordRef}
              />
              {isLoading ? (
                <h3>Sending Data Please Wait</h3>
              ) : (
                <button className="button" type="submit">
                  Guest Login
                </button>
              )}
              <NavLink to="/auth:signup" className="color">
                Create New Account Here
              </NavLink>
            </form>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default AuthPage;
