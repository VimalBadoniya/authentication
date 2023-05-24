import React, { useState } from "react";
import LoginContext from "./login-context";

const LoginContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [guestLogin, setGuestLogin] = useState(false);
  const [isToken , setIsToken] = useState(null);

  const loginHandler = (abc) => {
    setIsLoggedIn(abc);
    
    // console.log("inside state updating");
  };

  const guestLoginHandler = (xyz) => {
    setGuestLogin(xyz);
    
  };

  const tokenHandler = (token)=>{
    setIsToken(token)
  }

  const contextObj = {
    loginState: isLoggedIn,
    guestLoginState: guestLogin,
    token : isToken ,
    setToken : tokenHandler ,
    setLoginState: loginHandler,
    setGuestLoginState: guestLoginHandler,
  };
  return (
    <LoginContext.Provider value={contextObj}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
