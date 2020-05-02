import { Route, Switch } from "react-router-dom";
import Home from "./Components/Home";
import QuestionList from "./Components/QuestionList";
import AnswerList from "./Components/AnswerList";
import NotFound from "./Components/NotFound";
import React from "react";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/questions" component={QuestionList} />

      <Route path="/question/:id/answer" component={AnswerList} />

      <Route component={NotFound} />
    </Switch>
  );
}
