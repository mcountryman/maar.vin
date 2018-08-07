import * as React from "react";

import "./contacts.scss";

export class Contacts extends React.Component {
  public render() {
    return (
      <div id="contacts">
        <a id="social-icon" href="https://github.com/mcountryman">
          <img src="/assets/iconmonstr-github-1.svg" width="100%"></img>
        </a>
        <a id="social-icon" href="https://twitter.com/maarv1n">
          <img src="/assets/iconmonstr-twitter-1.svg" width="100%"></img>
        </a>
        <a id="social-icon" href="https://www.linkedin.com/in/marvincountryman/">
          <img src="/assets/iconmonstr-linkedin-1.svg" width="100%"></img>
        </a>
      </div>
    );
  }
}
