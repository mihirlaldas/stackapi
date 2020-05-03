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
  // fetch questionn by id
  fetchQuestion = (id) => {
    fetch(
      `https://api.stackexchange.com/2.2/questions/${id}?order=desc&sort=activity&site=stackoverflow&filter=!-*jbN*LhAuu9`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.items) {
          this.setState({
            question: res.items,
          });
          localStorage.setItem(`question-${id}`, JSON.stringify(res.items));
        } else {
          alert("server error !! Please enter correct question id");
        }
      })
      .catch((err) => alert(err));
  };
  // fetch answers by question id
  fetchAnswers = (id) => {
    fetch(
      `https://api.stackexchange.com/2.2/questions/${id}/answers?order=desc&sort=votes&site=stackoverflow&filter=!b1MMEAHHviRb4*`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.items) {
          this.setState({
            answers: res.items,
          });
          localStorage.setItem(`answers-${id}`, JSON.stringify(res.items));
        } else {
          alert(
            "server err ! answer not fetched. please enter correct question id"
          );
        }
      })
      .catch((err) => alert(err));
  };
  componentDidMount() {
    // fetch question body
    let query = new URLSearchParams(this.props.location.search);
    if (this.state.question.length === 0) {
      this.fetchQuestion(query.get("id"));
    }
    if (this.state.answers.length === 0) {
      this.fetchAnswers(query.get("id"));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      //fetch new data as url has changed
      let query = new URLSearchParams(this.props.location.search);
      this.setState({
        tag: query.get("tag"),
        // question:
        //   JSON.parse(localStorage.getItem(`q-${query.get("tag")}`)) || [],
        // answers:
        //   JSON.parse(localStorage.getItem(`answers-${query.get("tag")}`)) || [],
      });

      // fetch new question
      if (JSON.parse(localStorage.getItem(`q-${query.get("tag")}`))) {
        this.setState({
          question:
            JSON.parse(localStorage.getItem(`q-${query.get("tag")}`)) || [],
        });
      } else {
        this.fetchQuestion(query.get("id"));
      }

      // fetch new answers

      if (JSON.parse(localStorage.getItem(`answers-${query.get("tag")}`))) {
        this.setState({
          answers:
            JSON.parse(localStorage.getItem(`answers-${query.get("tag")}`)) ||
            [],
        });
      } else {
        this.fetchAnswers(query.get("id"));
      }
    }
  }
  render() {
    console.log(
      this.state.questionId,
      "question length:",
      this.state.question.length
    );
    return this.state.question.length === 0 ? (
      <div className="alert alert-danger">
        <strong>Please enter correct question id</strong>
      </div>
    ) : (
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
