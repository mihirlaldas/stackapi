import React, { Component } from "react";
import { Link } from "react-router-dom";
export class QuestionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
    };
  }

  //   componentDidUpdate(prevProps, prevState) {
  //     if (prevProps !== this.props) {
  //       //fetch new data as url has changed
  //       this.setState({ data: this.props.data });
  //     }
  //   }

  render() {
    return (
      <div>
        <div className="container my-4 shadow">
          <div className="row">
            <div className="col-2 text-center">
              {/* answers and views count */}
              <p className="text-info">{this.state.data.view_count}</p>
              <small>Views</small>
              <div className="p-1 bg-info text-white">
                <p>{this.state.data.answer_count}</p>
                <small>answers</small>
              </div>
            </div>
            <div className="col-10">
              {/* question, tags,owner details */}
              <Link to={`/question/${this.state.data.question_id}/answer`}>
                <div className="text-truncate">{this.state.data.title}</div>
              </Link>

              {/* parse html body */}
              {/* <Markdown>{props.data.body_markdown}</Markdown> */}
              <div className="text-truncate">
                {this.state.data.body_markdown}
              </div>
              <div className="row">
                <div className="col-8">
                  {this.state.data.tags.map((ele) => (
                    <button key={ele} className="btn btn-info m-1">
                      {ele}
                    </button>
                  ))}
                </div>
                <small className="col-4 ">
                  <div>asked on {this.state.data.creation_date.toString()}</div>
                  <div>
                    <img
                      src={this.state.data.owner.profile_image}
                      alt="question owner"
                      width="50px"
                    />
                    <Link to={this.state.data.owner.link}>
                      {this.state.data.owner.display_name}
                    </Link>
                  </div>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default QuestionCard;
