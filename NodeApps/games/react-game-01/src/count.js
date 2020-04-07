import React from "react";
import { params } from "./URLParser"

export const coinCount = "7416469";
export const diamondCount = "72194";
export const tab = <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>;
export const imgWidth = "10%";
export const imgUrl = "https://kubikaugustyn.github.io/NodeApps/games/react-game-01/src/img/";
export const brawlers = {
    "myLength" : "4",
    "imgURL" : {
        "0" : imgUrl + "arnoldImg.jpg",
        "1" : imgUrl + "arnoldImg.jpg",
        "2" : imgUrl + "arnoldImg.jpg",
        "3" : imgUrl + "arnoldImg.jpg"
    },
    "name" : {
        "0" : "Arnold",
        "1" : "Arnold1",
        "2" : "Arnold2",
        "3" : "Arnold3"
    },
    "dfx" : ""
};
export const brawlerCount = brawlers.myLength;
export const selectedBrawler = params["brawler"];
console.log("selectedBrawler:", selectedBrawler);

var brawlerIsTrue;
if (params !==["brawler"]){
    brawlerIsTrue = false
}

var brawlerInd1;
for (var inde = 0;inde<brawlers.myLength; inde++){
    if (brawlers.name[inde] === params["brawler"]){
        brawlerInd1 = inde
    }
}

export const brawlerInd = brawlerInd1;