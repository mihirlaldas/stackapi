import React, { Component } from "react";
import { Link } from "react-router-dom";
export class Navbar extends Component {
  render() {
    return (
      <div className="shadow p-4 mb-4 bg-white">
        <h1>Navbar</h1>
        <Link to="/questions?tag=javascript">javascript questions</Link>
      </div>
    );
  }
}

export default Navbar;
