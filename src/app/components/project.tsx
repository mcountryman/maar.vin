import * as React from "react";
import Markdown from "react-markdown";
import { IProject } from "../models/iproject";

export class Project extends React.Component<IProject> {
  public render() {
    return (
      <article id="project">
        <a id="project-header" href={this.props.link}>
          <h4>{this.props.name}</h4>
        </a>
        <Markdown source={this.props.content}></Markdown>
      </article>
    );
  }
}
