import * as React from "react";

export class ContactPage extends React.Component {
  public render() {
    return (
      <div id="center">
        <a id="social-icon" href="https://github.com/mcountryman">
          <img src="/dist/iconmonstr-github-1.svg" width="100%"></img>
        </a>
        <a id="social-icon" href="https://twitter.com/maarv1n">
          <img src="/dist/iconmonstr-twitter-1.svg" width="100%"></img>
        </a>
        <a id="social-icon" href="https://www.linkedin.com/in/marvincountryman/">
          <img src="/dist/iconmonstr-linkedin-1.svg" width="100%"></img>
        </a>
      </div>
    );
  }
}
