import React, { useContext, useRef } from "react";
import LoginContext from "../source/login-context";

const ChangePassword = () => {
  const ctx = useContext(LoginContext);
  const passwordRef = useRef();
  const changePasswordHandler = (ev) => {
    ev.preventDefault();
    const token = ctx.token;
    const password = passwordRef.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAN4HhrzA2P9oL3JiL9Fei1YDyXVxdIRWY",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
       // console.log(response);
        return response.json()
        
      }).then((data)=>{console.log(data)})
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h1>New Password</h1>
      <form onSubmit={changePasswordHandler}>
        <input
          type="password"
          placeholder="type new password"
          required
          ref={passwordRef}
        />
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
