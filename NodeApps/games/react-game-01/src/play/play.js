import {Link, useParams} from "react-router-dom";
import {brawlerCount, brawlers} from "../count";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import React from "react";

export default function Play() {
  let { brawlerToPlay } = useParams();
  let brawlerInd;
  for (var ind = 0;ind<brawlerCount;ind++){
    if (brawlers.name[ind] === brawlerToPlay) {
      brawlerInd = ind
    }
  }

  //if brawlers.name isn't brawler cancel all
  if (brawlers.name[brawlerInd] !== brawlerToPlay){
    return
  }

  return (
      <div>
          <Link to={"/?brawler=" + brawlerToPlay}><ArrowBackIosIcon /></Link>
          <h1>Playing with {brawlerToPlay}</h1>
          <img alt={brawlers.name[brawlerInd]} src={brawlers.imgURL[brawlerInd]} />
      </div>
  );
}