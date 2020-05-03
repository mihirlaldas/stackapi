import Card from "./Card";
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
    this.fetchData(query.get("tag"));
  }
  fetchData = (tag) => {
    fetch(
      `https://api.stackexchange.com/2.2/questions?page=1&pagesize=10&order=desc&sort=votes&tagged=${tag}&site=stackoverflow&filter=!b1MMEAHEe79zMq`
    )
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem(`q-${this.state.tag}`, JSON.stringify(res.items));
        this.setState({
          questions: res.items,
        });
      })
      .catch((err) => alert(err));
  };
  componentDidMount() {
    //   fetch once for testing
    let query = new URLSearchParams(this.props.location.search);

    if (this.state.questions.length === 0) {
      this.fetchData(query.get("tag"));
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      //fetch new data as url has changed
      let query = new URLSearchParams(this.props.location.search);
      this.fetchData(query.get("tag"));

      this.setState({
        tag: query.get("tag"),
        questions:
          JSON.parse(localStorage.getItem(`q-${query.get("tag")}`)) || [],
      });
    }
  }
  render() {
    return (
      <div>
        <h3 className="text-center">
          Voted top 10 questions of {this.state.tag}
        </h3>
        {this.state.questions.map((ele) => (
          <Card key={ele.question_id} data={ele} {...this.props} />
        ))}
      </div>
    );
  }
}

export default QuestionList;
