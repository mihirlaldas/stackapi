import Card from "./Card";
import React, { Component } from "react";
export class AnswerList extends Component {
  constructor(props) {
    super(props);
    let query = new URLSearchParams(props.location.search);
    this.state = {
      questionId: query.get("id"),
      question:
        JSON.parse(localStorage.getItem(`question-${query.get("id")}`)) || [],
      answers:
        JSON.parse(localStorage.getItem(`answers-${query.get("id")}`)) || [],
    };
  }
  componentDidMount() {
    // fetch question body
    if (this.state.question.length === 0) {
      fetch(
        `https://api.stackexchange.com/2.2/questions/${this.state.questionId}?order=desc&sort=activity&site=stackoverflow&filter=!-*jbN*LhAuu9`
      )
        .then((res) => res.json())
        .then((res) => {
          this.setState({
            question: res.items,
          });
          localStorage.setItem(
            `question-${this.state.questionId}`,
            JSON.stringify(res.items)
          );
        })
        .catch((err) => alert(err));
    }
    if (this.state.answers.length === 0) {
      fetch(
        `https://api.stackexchange.com/2.2/questions/${this.state.questionId}/answers?order=desc&sort=votes&site=stackoverflow&filter=!b1MMEAHHviRb4*`
      )
        .then((res) => res.json())
        .then((res) => {
          this.setState({
            answers: res.items,
          });
          localStorage.setItem(
            `answers-${this.state.questionId}`,
            JSON.stringify(res.items)
          );
        })
        .catch((err) => alert(err));
    }
  }
  render() {
    console.log(
      this.state.questionId,
      "question length:",
      this.state.question.length
    );
    return (
      <div>
        {this.state.question.map((ele) => (
          <Card
            key={ele.question_id}
            data={ele}
            isAnswer="true"
            {...this.props}
          />
        ))}

        <h3>Answers list</h3>
        {this.state.answers.map((ele) => (
          <Card
            key={ele.question_id}
            data={ele}
            isAnswer="true"
            {...this.props}
          />
        ))}
      </div>
    );
  }
}

export default AnswerList;
