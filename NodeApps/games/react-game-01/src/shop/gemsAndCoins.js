import React from 'react';

export default function gemsAndCoins() {
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
      </div>
    );
}