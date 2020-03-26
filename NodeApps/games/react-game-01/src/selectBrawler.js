import React from 'react';
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

export default function selectBrawler() {
  return (
      <div>
        <Link to="/"><ArrowBackIosIcon /></Link><h1>selectBrawler</h1>
        <div>selectBrawler</div>
      </div>
  );
}