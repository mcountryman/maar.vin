import * as React from "react";

export class HomePage extends React.Component {
  public render() {
    const today = new Date();
    const bestDay = new Date(1994, 7, 23);
    const years = (today.getTime() - bestDay.getTime()) / 31536000000 ;

    return (
      <div>
        <h3>Hey, I'm a {Math.round(years)}y old developer from Germany.</h3>
        <br/>
        <p>Thanks for checking out my website!</p>
      </div>
    );
  }
}
