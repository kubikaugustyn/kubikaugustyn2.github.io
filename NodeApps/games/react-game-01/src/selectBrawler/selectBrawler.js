import React from 'react';
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import BrawlerList from "./pageBuildingAlgorytmus"
import ThingsCountToolbar from "../ThingsCountTooolbar"
import Brawler from "./Brawler";
import {Link, Route, Switch, useRouteMatch} from "react-router-dom";

export default function SelectBrawler() {
    let match = useRouteMatch();
    /*const brawler = match.params.brawler
    console.log("match:", match)
    console.log("brawler:", brawler)*/

    return (
      <div>
          <Switch>
            <Route path={`${match.path}/:brawler`}>
              <Brawler />
            </Route>
            <Route path={match.path}>
                <ThingsCountToolbar  />
                <Link to={"/" + document.location.search}><ArrowBackIosIcon /></Link><h1>selectBrawler</h1>
                <BrawlerList />
            </Route>
          </Switch>
      </div>
    );
}