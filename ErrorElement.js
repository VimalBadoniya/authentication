import React from "react";
import Header from "./Header";

const ErrorElement = () => {
  return (
    <div>
      <Header />
      <section className="centered">
        <h2>Oops ! Page Not Found , Please try Visiting Other Page </h2>
      </section>
    </div>
  );
};

export default ErrorElement;
