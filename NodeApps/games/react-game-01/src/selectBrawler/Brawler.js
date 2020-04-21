import {Link, useParams} from "react-router-dom";
import {brawlerCount, brawlers, tab} from "../count";
import ThingsCountToolbar from "../ThingsCountTooolbar";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Button from "@material-ui/core/Button";
import React from "react";

export default function Brawler() {
  let { brawler } = useParams();
  let brawlerInd;
  for (var ind = 0;ind<brawlerCount;ind++){
    if (brawlers.name[ind] === brawler) {
      brawlerInd = ind
    }
  }

  //if brawlers.name isn't brawler cancel all
  if (brawlers.name[brawlerInd] !== brawler){
    return
  }

  return (
          <div>
      <ThingsCountToolbar  />
      <Link to={"/selectBrawler/" + document.location.search}><ArrowBackIosIcon /></Link>
      <center>
        <h1>{brawler}</h1>
        <img alt={brawlers.name[brawlerInd]} src={brawlers.imgURL[brawlerInd]} /><br />
        <Button variant="contained" color="primary" href={"/try/" + brawlers.name[brawlerInd]}>
          Try
        </Button>
        {tab}
        <Button variant="contained" color="primary" href={"/?brawler=" + brawlers.name[brawlerInd]}>
          Select
        </Button>
      </center>
    </div>
  );
}