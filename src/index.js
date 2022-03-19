import React from "react";
import ReactDOM from "react-dom";
import Main from "./components/Main";
import Store from "./components/Store";

ReactDOM.render(
  <React.StrictMode>
    <Store>
      <Main />
    </Store>
  </React.StrictMode>,
  document.getElementById("app")
);