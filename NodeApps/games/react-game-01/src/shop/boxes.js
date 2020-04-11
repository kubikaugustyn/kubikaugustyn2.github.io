import React from 'react';
//import get from "./get"
import { imgUrl, imgWidth } from "../count";

export default function boxes() {
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