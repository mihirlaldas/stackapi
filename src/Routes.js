import { Route, Switch } from "react-router-dom";
import Home from "./Components/Home";
import QuestionList from "./Components/QuestionList";
import AnswerList from "./Components/AnswerList";
import NotFound from "./Components/NotFound";
import Navbar from "./Components/Navbar";

import React from "react";

export default function Routes(props) {
  return (
    <Switch>
      <Route
        path="/"
        exact
        render={(props) => (
          <>
            <Navbar {...props} />
            <Home {...props} />
          </>
        )}
      />
      <Route
        path="/questions"
        render={(props) => (
          <>
            <Navbar {...props} />
            <QuestionList {...props} />
          </>
        )}
      />

      <Route
        path="/question/:id/answer"
        render={(props) => (
          <>
            <Navbar {...props} />
            <AnswerList {...props} />
          </>
        )}
      />

      <Route component={NotFound} />
    </Switch>
  );
}
