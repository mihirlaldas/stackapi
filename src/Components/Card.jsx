import React from "react";
import { Link } from "react-router-dom";
export default function QuestionCard(props) {
  let date = new Date(Number(props.data.creation_date) * 1000);
  console.log("card props:", props.data);
  return (
    <div>
      <div className="container my-4 shadow">
        <div className="row">
          <div className="col-md-2 col-4 text-center">
            {/* answers and views count */}
            <div className="bg-info text-white m-1 rounded">
              <p>{props.data.score}</p>
              <small>Votes</small>
            </div>
            <div className="bg-info text-white m-1 rounded">
              <p>{props.data.answer_count}</p>
              <small>answers</small>
            </div>
          </div>
          <div className="col-md-10 col-8">
            {/* question, tags,owner details */}
            <Link
              to={`/question/${props.data.question_id}/answer?id=${props.data.question_id}`}
            >
              <div className="text-truncate">{props.data.title}</div>
            </Link>

            {/* truncate for question list show . show full question on question id */}
            {props.isAnswer ? (
              <div>{props.data.body_markdown}</div>
            ) : (
              <div className="text-truncate">{props.data.body_markdown}</div>
            )}

            <div className="row">
              <div className="col-md-8 col-4">
                {props.data.tags &&
                  props.data.tags.map((ele) => (
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
                      src={props.data.owner.profile_image}
                      alt="question owner"
                      width="50px"
                    />
                  </div>
                  <div className="col-6">
                    <Link to={props.data.owner.link}>
                      {props.data.owner.display_name}
                    </Link>
                    <p className="text-primary">
                      &#11044; {props.data.owner.reputation}
                    </p>
                    <div className="d-flex justify-content-between mt-0 flex-wrap">
                      <small className="text-warning badge badge-info">
                        &#11044; {props.data.owner.badge_counts.gold}
                      </small>
                      <small className="text-success">
                        &#11044; {props.data.owner.badge_counts.silver}
                      </small>
                      <small className="text-info">
                        &#11044; {props.data.owner.badge_counts.bronze}
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
