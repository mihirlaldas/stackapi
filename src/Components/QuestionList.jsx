import QuestionCard from "./QuestionCard";
import React, { Component } from "react";

export class QuestionList extends Component {
  constructor(props) {
    super(props);
    let query = new URLSearchParams(props.location.search);
    this.state = {
      // search tag fetched from url
      tag: query.get("tag"),

      questions:
        JSON.parse(localStorage.getItem(`q-${query.get("tag")}`)) || [],
    };
  }
  componentDidMount() {
    //   fetch once for testing
    if (this.state.questions.length === 0) {
      fetch(
        `https://api.stackexchange.com/2.2/questions?page=1&pagesize=10&order=desc&sort=creation&tagged=${this.state.tag}&site=stackoverflow&filter=!9Z(-wwK0y`
      )
        .then((res) => res.json())
        .then((res) => {
          localStorage.setItem(
            `q-${this.state.tag}`,
            JSON.stringify(res.items)
          );
          this.setState({
            questions: res.items,
          });
        })
        .catch((err) => alert(err));
    }
  }
  render() {
    return (
      <div>
        <h1 className="text-center">
          Top 10 newset questions of {this.state.tag}
        </h1>
        {this.state.questions.map((ele) => (
          <QuestionCard key={ele.question_id} data={ele} {...this.props} />
        ))}
      </div>
    );
  }
}

export default QuestionList;
