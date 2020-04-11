import React from 'react';
import { trophyRoadsData } from './TrophyRoadsData'
import {cara, cupCount, imgUrl} from '../count'
import Avatar from "@material-ui/core/Avatar";

export default function SingleLineGridList() {
  return (
      <div>
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
