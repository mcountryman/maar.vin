import * as React from "react";
import { Link } from "react-router-dom";

import "./navigation.scss";

export const Navigation = () => (
  <nav>
    <div id="links">
      <Link to="/">maar.vin</Link>
    </div>
  </nav>
);
