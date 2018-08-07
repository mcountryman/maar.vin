import "normalize.css";
import "./app.scss";

import * as React from "react";
import { HashRouter as Router } from "react-router-dom";

import { Contacts } from "./components/contacts";
import { Footer } from "./components/footer";
import { Navigation } from "./components/navigation";
import { Projects } from "./components/projects";

export class App extends React.Component {
  public render() {
    return (
      <Router>
        <div id="container">
          <Navigation/>
          <main>
            <Contacts/>
            <Projects/>
          </main>
          <Footer/>
        </div>
      </Router>
    );
  }
}
