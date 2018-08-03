import "./posts.scss";

import * as axios from "axios";
import * as React from "react";

import { IPost } from "../models/ipost";
import { Post } from "./post";

interface IState {
  posts: IPost[];
}

export class Posts extends React.Component<{}, IState> {
  constructor() {
    super({});

    this.state = {
      posts: [],
    };
  }

  public componentWillMount() {
    axios.default.get("/data/posts.json")
      .then((response) => {
        if (response.status === 200) {
          const posts = response.data.map((post: any) => ({
            content: post.content,
            created_date: new Date(post.created_date),
            title: post.title,
          }));

          this.setState({ posts });
        }
      })
      .catch((error) => {
        // ...
      })
    ;
  }

  public render() {
    return (
      <div id="posts">
        {
          this.state.posts.map((post) => (
            <Post title={post.title}
                  content={post.content}
                  created_date={post.created_date} />
          ))
        }
      </div>
    );
  }
}
