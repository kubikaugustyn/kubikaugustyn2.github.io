import React from 'react';
import { Link } from "react-router-dom";

export default function home() {
  return (
      <div>
        <h1>Home</h1>
        <Link to="/shop">Shop</Link>
        <Link to="/selectBrawler">Select Brawler</Link>
      </div>
  );
}