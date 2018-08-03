import * as React from "react";
import Markdown from "react-markdown";
import { IPost } from "../models/ipost";

interface IState {
  expanded: boolean;
}

export class Post extends React.Component<IPost, IState> {
  constructor(props: IPost) {
    super(props);

    this.state = {
      expanded: false,
    };
  }

  public getStyle(): any {
    if (!this.state.expanded) {
      return {
        "max-height": "10rem",
      };
    }

    return {};
  }

  public onClick = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  public render() {
    return (
      <article id="post">
        <h3 id="post-title">{this.props.title}</h3>
        <div id="post-body" onClick={this.onClick} style={this.getStyle()}>
          <div id="post-date">{"Published - " + this.props.created_date.toLocaleDateString()}</div>
          <div id="post-content">
            <Markdown source={this.props.content}/>
          </div>
        </div>
      </article>
    );
  }
}
