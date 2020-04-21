import {Link, useParams} from "react-router-dom";
import {brawlerCount, brawlers} from "../count";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import React from "react";

export default function Try() {
  let { brawlerToTry } = useParams();
  let brawlerInd;
  for (var ind = 0;ind<brawlerCount;ind++){
    if (brawlers.name[ind] === brawlerToTry) {
      brawlerInd = ind
    }
  }

  //if brawlers.name !== brawler cancel all
  if (brawlers.name[brawlerInd] !== brawlerToTry){
    return
  }

  return (
      <div>
          <Link to={"/selectBrawler1/" + brawlerToTry + "?brawler=" + brawlerToTry}><ArrowBackIosIcon /></Link>
          <h1>Trying {brawlerToTry}</h1>
          <img alt={brawlers.name[brawlerInd]} src={brawlers.imgURL[brawlerInd]} />
      </div>
  );
}