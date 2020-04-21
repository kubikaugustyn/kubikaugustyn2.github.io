import React from "react";
import { params } from "./URLParser"
import MaximizeSharpIcon from '@material-ui/icons/MaximizeSharp';

export const coinCount = "7416469";
export const diamondCount = "72194";
export const cupCount = "48317";
export const tab = <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>;
export const imgWidth = "10%";
export const imgUrl = "https://kubikaugustyn.github.io/NodeApps/games/react-game-01/src/img/";
export const brawlers = {
    "myLength" : "4",
    "imgURL" : {
        "0" : imgUrl + "arnoldImg.jpg",
        "1" : imgUrl + "arnoldImg1.jpg",
        "2" : imgUrl + "arnoldImg2.jpg",
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
var brawlerInd1;
function zabalZbytecnosti1() {
    // eslint-disable-next-line no-unused-vars
    let brawlerIsTrue = false;
    if (params !==["brawler"]){
        brawlerIsTrue = false
    }
    for (var inde = 0;inde<brawlerCount; inde++){
        if (brawlers.name[inde] === params["brawler"]){
            brawlerInd1 = inde
        }
    }
}
zabalZbytecnosti1();
export const brawlerInd = brawlerInd1;
export const shopLink = "/shop?brawler=" + brawlers.name[brawlerInd];
export const cara = (<span>
       <MaximizeSharpIcon /><MaximizeSharpIcon /><MaximizeSharpIcon /><MaximizeSharpIcon /><MaximizeSharpIcon /><MaximizeSharpIcon /><MaximizeSharpIcon /><MaximizeSharpIcon /><MaximizeSharpIcon /><MaximizeSharpIcon /><MaximizeSharpIcon /><MaximizeSharpIcon /><MaximizeSharpIcon /><MaximizeSharpIcon /><MaximizeSharpIcon /><MaximizeSharpIcon /><MaximizeSharpIcon /><MaximizeSharpIcon /><MaximizeSharpIcon /><MaximizeSharpIcon /><MaximizeSharpIcon /><MaximizeSharpIcon /><MaximizeSharpIcon /><MaximizeSharpIcon /><MaximizeSharpIcon /><MaximizeSharpIcon /><MaximizeSharpIcon /><MaximizeSharpIcon />
    </span>);