import React from 'react';
import "../index.css"
import { Switch,  Route,  useRouteMatch, Link } from "react-router-dom";
import Play from "./play"


export default function PlayWithBrawler() {
  let match = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${match.path}/:brawlerToPlay`}>
          <Play />
        </Route>
        <Route path={match.path}>
          <h1>Error!!!!</h1>
          <Link to="/">Home</Link>
        </Route>
      </Switch>
    </div>
  );
}