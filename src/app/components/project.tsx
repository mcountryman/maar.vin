import "./project.scss";

import * as React from "react";

interface IProps {
  name: string;
  link: string;
}

export class Project extends React.Component<IProps> {
  public render() {
    return (
      <article id="project">
        <div id="project-header">
          <a href={this.props.link}>{this.props.name}</a>
        </div>
        <div id="project-body">{this.props.children}</div>
      </article>
    );
  }
}
