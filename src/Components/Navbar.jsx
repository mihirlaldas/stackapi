import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // tags is the list of tags availbale on stackoverflow
      tags: JSON.parse(localStorage.getItem("tags")) || [],
      inputTag: "",
      questionId: null,
    };
  }
  componentDidMount() {
    //   fetch tag list only once and keep it in localstorage
    if (this.state.tags.length === 0) {
      fetch(
        "https://api.stackexchange.com/2.2/tags?order=desc&sort=popular&site=stackoverflow"
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          this.setState({
            tags: res.items.map((ele) => ele["name"]),
          });
          localStorage.setItem(
            "tags",
            JSON.stringify(res.items.map((ele) => ele["name"]))
          );
        })
        .catch((err) => alert(err));
    }
  }
  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleTagSubmit = (event) => {
    event.preventDefault();

    // check tags
    let isPressent = false;
    this.state.tags.forEach((ele) => {
      if (ele === this.state.inputTag) {
        this.props.history.push(`/questions?tag=${this.state.inputTag}`);
        isPressent = true;
      }
    });
    if (!isPressent) alert("incorrect tag");
    this.setState({
      inputTag: "",
    });
  };

  handleQuestionIdSubmit = (e) => {
    e.preventDefault();

    this.props.history.push(
      `/question/${this.state.questionId}/answer?id=${this.state.questionId}`
    );
  };
  render() {
    return (
      <div className="shadow p-2 mb-2 bg-white d-flex justify-content-around">
        <Link to="/">
          <h3 className="font-weight-light bg-dark text-white p-1 rounded shadow-lg">
            stack
            <span className="font-weight-bold text-warning">apps</span>
          </h3>
        </Link>
        <form
          className="form-inline my-2 my-lg-0"
          onSubmit={this.handleTagSubmit}
        >
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search by tag"
            aria-label="Search"
            list="inputTag"
            value={this.state.inputTag}
            name="inputTag"
            onChange={this.handleChange}
          />
          <datalist id="inputTag">
            {this.state.tags.map((ele) => (
              <option value={ele}>{ele}</option>
            ))}
          </datalist>

          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
        <form
          className="form-inline my-2 my-lg-0"
          onSubmit={this.handleQuestionIdSubmit}
        >
          <input
            type="number"
            name="questionId"
            minlength="7"
            placeholder="question_id"
            className="form-control mr-sm-2"
            onChange={this.handleChange}
          />
          <button className="btn btn-outline-info my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default Navbar;
