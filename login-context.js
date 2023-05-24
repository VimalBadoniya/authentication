import React from "react";

const LoginContext = React.createContext({
  token : null , 
  setToken : ()=>{},
  loginState: false,
  guestLoginState: false,
  setLoginState: () => {},
  setGuestLoginState : ()=>{} ,
});

export default LoginContext;
