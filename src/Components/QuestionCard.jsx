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
    let date = new Date(Number(this.state.data.creation_date) * 1000);
    return (
      <div>
        <div className="container my-4 shadow">
          <div className="row">
            <div className="col-md-2 col-4 text-center">
              {/* answers and views count */}
              <div className="bg-info text-white m-1 rounded">
                <p>{this.state.data.score}</p>
                <small>Votes</small>
              </div>
              <div className="bg-info text-white m-1 rounded">
                <p>{this.state.data.answer_count}</p>
                <small>answers</small>
              </div>
            </div>
            <div className="col-md-10 col-8">
              {/* question, tags,owner details */}
              <Link to={`/question/${date}/answer`}>
                <div className="text-truncate">{this.state.data.title}</div>
              </Link>

              {/* parse html body */}
              {/* <Markdown>{props.data.body_markdown}</Markdown> */}
              <div className="text-truncate">
                {this.state.data.body_markdown}
              </div>
              <div className="row">
                <div className="col-md-8 col-4">
                  {this.state.data.tags.map((ele) => (
                    <span key={ele} className="badge badge-info m-1">
                      {ele}
                    </span>
                  ))}
                </div>
                <small className="col-md-4 col-8">
                  <div>asked on {date.toDateString()}</div>
                  <div className="row no-gutters">
                    <div className="col-6">
                      <img
                        src={this.state.data.owner.profile_image}
                        alt="question owner"
                        width="50px"
                      />
                    </div>
                    <div className="col-6">
                      <Link to={this.state.data.owner.link}>
                        {this.state.data.owner.display_name}
                      </Link>
                      <p className="text-primary">
                        &#11044; {this.state.data.owner.reputation}
                      </p>
                      <div className="d-flex justify-content-between mt-0 flex-wrap">
                        <small className="text-warning badge badge-info">
                          &#11044; {this.state.data.owner.badge_counts.gold}
                        </small>
                        <small className="text-success">
                          &#11044; {this.state.data.owner.badge_counts.silver}
                        </small>
                        <small className="text-info">
                          &#11044; {this.state.data.owner.badge_counts.bronze}
                        </small>
                      </div>
                    </div>
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
