import React, { Component } from "react";
import "../App.css";
export class Home extends Component {
  render() {
    return (
      <div className="home">
        <h1>Trends in Stack overflow</h1>
        <br />
        <ul>
          <li>
            Find top 10 questions for your choise tag- eg Python, Javascript
          </li>
          <li>See their best answers.</li>
        </ul>
      </div>
    );
  }
}

export default Home;
