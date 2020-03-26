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

                        <td>50Kč = 150<Coin /></td>
                        <td>20<Diamond /> = 150<Coin /></td>
                        <td>10<Diamond /> = 75<Coin /></td>
                        <td>1<Diamond /> = 7<Coin /></td>
                    </tr>
                    <tr>
                        <td>Gems<Diamond /></td>

                        <td>50Kč = 30<Diamond /></td>
                        <td>440<Coin /> = 15<Diamond /></td>
                        <td>30<Coin /> = 1<Diamond /></td>
                        <td>280<Coin /> = 9<Diamond /></td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
    );
}