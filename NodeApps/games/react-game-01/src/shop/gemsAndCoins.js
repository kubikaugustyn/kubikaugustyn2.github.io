import React from 'react';
import Diamond from "../img/diamond";
import Coin from "../img/coin";
import "../index.css"

export default function gemsAndCoins() {
    return (
      <div>
        <div className="center">
            <table>
                <tbody>
                    <tr>
                        <td>Coins<Coin /></td>

                        <td>50Kč = 300<Coin /></td>
                        <td>15<Diamond /> = 150<Coin /></td>
                        <td>10<Diamond /> = 95<Coin /></td>
                        <td>1<Diamond /> = 9<Coin /></td>
                    </tr>
                    <tr>
                        <td>Gems<Diamond /></td>

                        <td>50Kč = 30<Diamond /></td>
                        <td>150<Coin /> = 15<Diamond /></td>
                        <td>50<Coin /> = 4<Diamond /></td>
                        <td>100<Coin /> = 9<Diamond /></td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
    );
}