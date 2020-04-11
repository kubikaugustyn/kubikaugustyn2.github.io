import React from 'react';
import Shop from "./shop/Shop"
import Home from "./home"
import SelectBrawler from "./selectBrawler/selectBrawler";
import SelectBrawler1 from "./selectBrawler/brawler/SelectBrawler1"
import {  BrowserRouter as Router,  Switch,  Route} from "react-router-dom";
import "./URLParser"
import TryBrawler from "./try/tryBrawler";
import PlayWithBrawler from "./play/playWithBrawler";
import TrophyRoads from "./TrophyRoads/TrophyRoads";


export default function App() {
  return (
    <Router>
      <div>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/trophyRoads">
            <TrophyRoads />
          </Route>
          <Route path="/play">
            <PlayWithBrawler />
          </Route>
          <Route path="/try">
            <TryBrawler />
          </Route>
          <Route path="/selectBrawler1">
            <SelectBrawler1 />
          </Route>
          <Route path="/shop">
            <Shop />
          </Route>
          <Route path="/selectBrawler">
            <SelectBrawler />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}