import React from 'react';
import { Link } from "react-router-dom";
import ThingsCountToolbar from "./thingsCountTooolbar"
import { brawlerInd, brawlers } from "./count";
import {params} from "./URLParser";
import "./index.css"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const elem = document.documentElement;

function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

if(document.location.pathname === "/") {
    //console.log(params.brawler);
    if (params.brawler === "" || params.brawler === undefined || params.brawler === null) {
        document.location.href = document.location.origin + "/selectBrawler"
    }
}

export default function home() {
  const classes = useStyles;
  function play() {
      if(brawlers.name[brawlerInd]!=="undefined"){
          document.location.pathname = "/play/" + brawlers.name[brawlerInd]
      }
  }
  return (
      <div>
        <ThingsCountToolbar />
        <center>
            <h1>Home</h1>
            <Link to={"/shop/" + document.location.search}>Shop</Link><div> </div>
            <Link to={"/selectBrawler/" + document.location.search}>Select Brawler</Link><div> </div>
            <button onClick={openFullscreen}>Open fullscreen</button><br />
            <button onClick={closeFullscreen}>Close fullscreen</button><br />
            <h1>{brawlers.name[brawlerInd]}</h1><br/>
            <img alt={brawlers.name[brawlerInd]} src={brawlers.imgURL[brawlerInd]} />
        </center>
        <div className={classes.root + " right"}>
            <Button variant="contained" color="secondary" onClick={play.bind(this)}>
                Play
            </Button>
        </div>
        {/*<img alt={brawlers.name[brawlerInd]} src={brawlers.imgURL[brawlerInd]} />
        <h1>{brawlers.name[brawlerInd]}</h1><br/>*/}
      </div>
  );
}