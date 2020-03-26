import React from "react";
import {imgUrl, imgWidth} from "../count";

export default function Coin() {
    return(
        <img alt="Coin" src={imgUrl + "Coin.png"} width={imgWidth} />
    )
}