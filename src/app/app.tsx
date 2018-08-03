import "normalize.css";
import "./app.scss";

import * as React from "react";
import { HashRouter as Router, Route } from "react-router-dom";

import { Footer } from "./components/footer";
import { Navigation } from "./components/navigation";
import { BlogPage } from "./pages/blog";
import { ContactPage } from "./pages/contact";
import { HomePage } from "./pages/home";
import { PortfolioPage } from "./pages/portfolio";

export class App extends React.Component {
  public render() {
    return (
      <Router>
        <div id="container">
          <Navigation/>
          <main>
            <Route path="/" component={HomePage} exact={true} />
            <Route path="/blog" component={BlogPage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/portfolio" component={PortfolioPage} />
          </main>
          <Footer/>
        </div>
      </Router>
    );
  }
}
