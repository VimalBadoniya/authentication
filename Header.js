import React, { useContext } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import LoginContext from "../source/login-context";

const Header = () => {
  const ctx = useContext(LoginContext);
  //console.log(ctx);
  const logoutHandler = ()=>{
    ctx.setLoginState(false);
    ctx.setToken(null);
  };

  const guestLogoutHandler = ()=>{
    ctx.setGuestLoginState(false);
    ctx.setToken(null);
  }

  return (
    <header className="headerContainer">
      <h1>React Authentication</h1>
      <nav>
        {ctx.loginState && !ctx.guestLoginState && (
          <ul className="ul">
            <li className="li">
              <NavLink to="/profile" className="a">
                Profile
              </NavLink>
            </li>
            <li className="li">
              <NavLink to="/profile/change-password" className="a">
                Change Password
              </NavLink>
            </li>
            <li className="li">
              <NavLink to="/auth:login" className="a" onClick={logoutHandler}>
                Logout
              </NavLink>
            </li>
          </ul>
        )}

        {!ctx.loginState && !ctx.guestLoginState && (
          <ul className="ul">
            <li className="li">
              <NavLink to="/auth:login" className="a">
                Login
              </NavLink>
            </li>
            <li className="li">
              <NavLink to="/auth:signup" className="a">
                Signup
              </NavLink>
            </li>
            <li className="li">
              <NavLink to="/auth:guest-login" className="a">
                Guest Login
              </NavLink>
            </li>
          </ul>
        )}
        {ctx.guestLoginState && !ctx.loginState && (
          <ul className="ul">
            <li className="li">
              <NavLink to="/auth:signup:new" className="a">
                Create Account
              </NavLink>
            </li>
            <li className="li">
              <NavLink to="/auth:signup:new-user" className="a" onClick={guestLogoutHandler}>
                Logout
              </NavLink>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
