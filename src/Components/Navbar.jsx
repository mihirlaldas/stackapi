import React, { Component } from "react";
import { Link } from "react-router-dom";
export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: JSON.parse(localStorage.getItem("tags")) || [],
      inputTag: "",
    };
  }
  componentDidMount() {
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
  render() {
    return (
      <div className="shadow p-2 mb-2 bg-white d-flex">
        <h3 className="font-wight-light bg-dark text-white p-3 rounded shadow-lg">
          Stack-API
        </h3>
        {/* <Link to="/questions?tag=javascript">javascript questions</Link> */}
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search by tag"
            aria-label="Search"
            list="inputTag"
            name="inputTag"
            onChange={(e) => this.setState({ inputTag: e.target.value })}
          />
          <datalist id="inputTag">
            {this.state.tags.map((ele) => (
              <option value={ele}>{ele}</option>
            ))}
          </datalist>
          <button class="btn btn-outline-success my-2 my-sm-0">
            <Link to={`/questions?tag=${this.state.inputTag}`}>Search</Link>
          </button>
        </form>
      </div>
    );
  }
}

export default Navbar;
