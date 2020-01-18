import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function TextButtons() {
  const classes = useStyles();



  return (
    <div className={classes.root}>
      <Button color="secondary" onClick={function onClickProc() {console.log('Search...')}}><SearchIcon /></Button>
    </div>
  );
}
