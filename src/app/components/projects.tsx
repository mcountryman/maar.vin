import "./projects.scss";

import * as axios from "axios";
import * as React from "react";

import { IProject } from "../models/iproject";
import { Project } from "./project";

interface IState {
  projects: IProject[];
}

export class Projects extends React.Component<{}, IState> {
  constructor() {
    super({});

    this.state = {
      projects: [],
    };
  }

  public componentWillMount() {
    axios.default.get("https://api.github.com/users/mcountryman/repos")
      .then((response) => {
        if (response.status === 200) {
          const projects = response.data

            // Ignore forked repos
            .filter((project: any) => !project.fork)

            // Sort newest to oldest
            .sort((a: any, b: any) => (
              (new Date(b.updated_at).getTime()) -
              (new Date(a.updated_at).getTime())
            ))

            // Sort most popular to least
            .sort((a: any, b: any) => (
              (b.stargazers_count + b.watchers_count + b.forks) -
              (a.stargazers_count + a.watchers_count + a.forks)
            ))

            .map((project: any) => ({
              content: project.description,
              link: project.html_url,
              name: project.name,
            }))
          ;

          this.setState({ projects });
        }
      })
      .catch((error) => {
        // ...
      })
    ;
  }

  public render() {
    return (
      <div id="projects">
        {
          this.state.projects.map((project) => (
            <Project name={project.name}
                     link={project.link}
                     content={project.content}
            />
          ))
        }
      </div>
    );
  }
}
