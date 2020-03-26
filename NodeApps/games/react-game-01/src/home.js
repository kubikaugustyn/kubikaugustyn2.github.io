import React from 'react';
import { Link } from "react-router-dom";

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

export default function home() {
  return (
      <div>
        <h1>Home</h1>
        <Link to="/shop">Shop</Link><div> </div>
        <Link to="/selectBrawler">Select Brawler</Link><div> </div>
        <button onClick={openFullscreen}>Open fullscreen</button>
        <button onClick={closeFullscreen}>Close fullscreen</button>
      </div>
  );
}