import * as React from "react";
import { Link } from "react-router-dom";

import "./navigation.scss";

export class Navigation extends React.Component {
  public render() {
    return (
      <nav>
        <div id="links">
          <Link to="/">maar.vin</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/portfolio">Portfolio</Link>
        </div>
      </nav>
    );
  }
}
