import React from 'react';
import { brawlerCount, brawlers } from "../count"
import "../index.css"
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {params} from "../URLParser";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

export default function brawlerList() {
  var builtBrawlerList = [];
  const classes = useStyles;

    for (var i = 0; i<brawlerCount; i++){
        console.log("Brawler img URL:", brawlers.imgURL[i]);
        builtBrawlerList.push(
            params["brawler"] === brawlers.name[i]
                ?
                <span className="square" key={i}>
                    <a className="no-underline" href={"/selectBrawler/" + brawlers.name[i] + document.location.search}>
                        <span className={classes.root}>
                            <Paper elevation={3}>
                            <center className="center selected">
                                {brawlers.name[i]}<br/>
                                <img alt={brawlers.name[i]} src={brawlers.imgURL[i]} /><br />
                                Selected.
                            </center>
                            </Paper>
                        </span>
                    </a>
                </span>
                :
                <span className="square" key={i}>
                    <a className="no-underline" href={"/selectBrawler/" + brawlers.name[i] + document.location.search}>
                        <span className={classes.root}>
                            <Paper elevation={3}>
                            <center className="center">
                                {brawlers.name[i]}<br/>
                                <img alt={brawlers.name[i]} src={brawlers.imgURL[i]} />
                            </center>
                            </Paper>
                        </span>
                    </a>
                </span>
        )
    }

  return (
      <div>
          {builtBrawlerList}
      </div>
  );
}