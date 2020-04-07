import React from 'react';
//import get from "./get"

export default function boxes() {
  const imgUrl = "https://kubikaugustyn.github.io/NodeApps/games/react-game-01/src/img/";
  const imgWidth = "10%";

  return (
      <div>
        <div className="center">
            <table>
                <tbody>
                    <tr>
                        <td><img width={imgWidth} alt="Box" src={imgUrl + "Box.png"} /></td>
                        <td><img width={imgWidth} alt="bigBox" src={imgUrl + "bigBox.png"} /></td>
                    </tr>
                    <tr>
                        <td><img width={imgWidth} alt="megaBox" src={imgUrl + "megaBox.png"} /></td>
                        <td><img width={imgWidth} alt="magicBox" src={imgUrl + "magicBox.png"} /></td>
                    </tr>
                </tbody>
            </table>
        </div>
        {/*<img width={imgWidth} alt="Box" src={imgUrl + "Box.png"} />
        <img width={imgWidth} alt="bigBox" src={imgUrl + "bigBox.png"} />
        <img width={imgWidth} alt="megaBox" src={imgUrl + "megaBox.png"} />
        <img width={imgWidth} alt="magicBox" src={imgUrl + "magicBox.png"} />*/}
      </div>
  );
}