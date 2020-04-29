import { render } from "react-dom";
import { createElement } from "react";
import { App } from "./app/app";

render(
  createElement(App),
  document.getElementById("app"),
);
