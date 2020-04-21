import React from 'react';
import "../index.css"
import { Switch,  Route,  useRouteMatch, Link } from "react-router-dom";
import Try from "./try"


export default function TryBrawler() {
  let match = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${match.path}/:brawlerToTry`}>
          <Try />
        </Route>
        <Route path={match.path}>
          <h1>Error!!!!</h1>
          <Link to="/">Home</Link>
        </Route>
      </Switch>
    </div>
  );
}