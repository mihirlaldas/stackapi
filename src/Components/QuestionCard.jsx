import React from "react";
import { Link } from "react-router-dom";
export default function QuestionCard(props) {
  console.log(props);
  let htmlEle = document.createElement("div");
  htmlEle.innerHTML = props.data.body;
  return (
    <div>
      <div className="container my-4 shadow">
        <div className="row">
          <div className="col-2 text-center">
            {/* answers and views count */}
            <p className="text-info">{props.data.view_count}</p>
            <small>Views</small>
            <div className="p-1 bg-info text-white">
              <p>{props.data.answer_count}</p>
              <small>answers</small>
            </div>
          </div>
          <div className="col-10">
            {/* question, tags,owner details */}
            <Link to={`/question/${props.data.question_id}/answer`}>
              <div className="text-truncate">{props.data.title}</div>
            </Link>

            {/* parse html body */}
            {/* <Markdown>{props.data.body_markdown}</Markdown> */}
            <div className="text-truncate">{props.data.body_markdown}</div>
            <div className="row">
              <div className="col-8">
                {props.data.tags.map((ele) => (
                  <button key={ele} className="btn btn-info m-1">
                    {ele}
                  </button>
                ))}
              </div>
              <small className="col-4 ">
                <div>asked on {props.data.creation_date.toString()}</div>
                <div>
                  <img
                    src={props.data.owner.profile_image}
                    alt="question owner"
                    width="50px"
                  />
                  <Link to={props.data.owner.link}>
                    {props.data.owner.display_name}
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
