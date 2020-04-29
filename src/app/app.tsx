import "normalize.css";
import "./app.scss";

import React from "react";

import { Contacts } from "./components/contacts";
import { Footer } from "./components/footer";
import { Navigation } from "./components/navigation";
import { Projects } from "./components/projects";

export class App extends React.Component {
  public render() {
    return (
      <div id="container">
        <Navigation/>
        <main>
          <Contacts/>
          <Projects/>
        </main>
        <Footer/>
      </div>
    );
  }
}
