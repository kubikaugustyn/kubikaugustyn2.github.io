import React from 'react';
import { trophyRoadsData } from './TrophyRoadsData'
import {cara, cupCount, imgUrl} from '../count'
import Avatar from "@material-ui/core/Avatar";
import ThingsCountToolbar from "../ThingsCountTooolbar";
import {Link} from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

export default function TrophyRoads() {
  return (
      <div>
        <ThingsCountToolbar />
        <br /><br /><br />
        <Link to={"/" + document.location.search}><ArrowBackIosIcon /></Link><h1>Trophy roads</h1>
        {trophyRoadsData.map((trophyRoad, index) => {
            return (
                <div key={index}>
                    {trophyRoad.count >= cupCount ?
                        <span className="selected">{trophyRoad.count}<Avatar src={imgUrl + "Cup.jpg"} />{cara}{trophyRoad.reward}<br /><hr /></span>
                        :
                        <span>{trophyRoad.count}<Avatar src={imgUrl + "Cup.jpg"} />{cara}{trophyRoad.reward}<br /><hr /></span>
                    }
                </div>
            );
        })}
      </div>
  );
}
