import * as React from "react";
import { Link } from "react-router-dom";

import "./navigation.scss";

export class Navigation extends React.Component {
  public render() {
    return (
      <nav>
        <ul id="links">
          <li><Link to="/">maar.vin</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/portfolio">Portfolio</Link></li>
        </ul>
      </nav>
    );
  }
}
