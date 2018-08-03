import * as React from "react";
import { Link } from "react-router-dom";

import "./navigation.scss";

interface IState {
  collapse: boolean;
}

export class Navigation extends React.Component<{}, IState> {
  constructor() {
    super({});

    this.state = {
      collapse: false,
    };
  }

  public onHamburger = () => {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  public renderHamburger() {
    return (
      <img id="hamburger"
           src={
              this.state.collapse ?
                "/assets/iconmonstr-fast-food-4.svg" :
                "/assets/iconmonstr-x-mark-3.svg"
           }
           onClick={this.onHamburger}></img>
    );
  }

  public render() {
    return (
      <nav className={this.state.collapse ? "collapsed" : ""}>
        <div id="links">
          <Link to="/">maar.vin</Link>
          { this.renderHamburger() }
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/portfolio">Portfolio</Link>
        </div>
      </nav>
    );
  }
}
