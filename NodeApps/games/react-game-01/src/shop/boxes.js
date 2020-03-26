import React from 'react';

export default function boxes() {
  const imgUrl = "https://kubikaugustyn.github.io/NodeApps/games/react-game-01/src/img/";

  return (
      <div>
        <img alt="Box" src={imgUrl + "Box.png"} />
        <img alt="bigBox" src={imgUrl + "bigBox.png"} />
        <img alt="megaBox" src={imgUrl + "megaBox.png"} />
        <img alt="magicBox" src={imgUrl + "magicBox.png"} />
      </div>
  );
}