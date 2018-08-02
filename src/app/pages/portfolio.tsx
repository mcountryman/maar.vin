import * as React from "react";
import { Project } from "../components/project";

export class PortfolioPage extends React.Component {
  public render() {
    return (
      <div>
        <Project name="last" link="https://github.com/mcountryman/last">
        </Project>
      </div>
    );
  }
}
