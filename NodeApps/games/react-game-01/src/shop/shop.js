import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import "../index.css";
import { coinCount, tab, diamondCount } from "../count";

import Boxes from "./boxes";
import GemsAndCoins from "./gemsAndCoins";
import PowerPoints from "./powerPoints";
import Skins from "./skins";
import StarSkins from "./starSkins";

import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Shop() {
  const classes = useStyles;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const imgUrl = "https://kubikaugustyn.github.io/NodeApps/games/react-game-01/src/img/";

  return (
    <div className={classes.root}>
      <Link to="/"><ArrowBackIosIcon /></Link><h1>Shop</h1>
        <div className="bg-blue">
            <AppBar position="static" className="right">
                <Toolbar>
                    <Avatar src={imgUrl + "Coin.png"} />{coinCount}{tab}
                    <Avatar src={imgUrl + "Diamond.png"} />{diamondCount}{tab}
                </Toolbar>
            </AppBar>
        </div>
        <div className="bg-yellow">
          <AppBar position="static" className="bg-gn-yl">
            <Tabs value={value} onChange={handleChange} className="bg-gn-yl text-black">
              <Tab label="Power points" {...a11yProps(0)} />
              <Tab label="Skins" {...a11yProps(1)} />
              <Tab label="Star skins" {...a11yProps(2)} />
              <Tab label="Boxes" {...a11yProps(3)} />
              <Tab label="Gems and coins" {...a11yProps(4)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <h2>Power points</h2>
            <PowerPoints />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <h2>Skins</h2>
            <Skins />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <h2>Star skins</h2>
            <StarSkins />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <h2>Boxes</h2>
            <Boxes />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <GemsAndCoins />
          </TabPanel>
        </div>
    </div>
  );
}