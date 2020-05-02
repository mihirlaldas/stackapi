import React from "react";
import { Link } from "react-router-dom";

export default function QuestionCard() {
  return (
    <div>
      <h1>Question Card</h1>
      <Link to="/question/12345678/answer">Answer</Link>
    </div>
  );
}
