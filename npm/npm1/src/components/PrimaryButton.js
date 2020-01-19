import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import {lightBlue} from "@material-ui/core/colors"

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },

  blue: {
      color: lightBlue,
  },
}));
//"" className={classes.root}""
export default function TextButtons() {
  const classes = useStyles();



  return (
    <div className="zindex">
      <Button className={classes.blue} onClick={function onClickProc() {console.log('Search...')}}><SearchIcon /></Button>
    </div>
  );
}
