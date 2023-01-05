import { Component } from "react";
import "./styles.css";

import gammeLogic from "./images/GammeLogic.png";
import miniGamme from "./images/MiniGamme.png";
import birds from "./images/Birds.png";
import hotel from "./images/Hotel.png";
import buttonBuy from "./images/ButtonBuy.png";

var todayGame = [birds, hotel];

class StartTop extends Component {
  render() {
    return (
      <tr>
        <td className="card" align="center" valign="top" width="20%">
          <img alt="logo" src={gammeLogic} width="58px" height="43px" />
          <br />
          <br />
          <img alt="logo" src={miniGamme} width="50px" height="50px" />
        </td>
        <td>
          <img
            alt="logo"
            src={todayGame[this.props.whichgame]}
            width="50%"
            height="50%"
          />
        </td>
        <td width="20%">
          <input
            alt="buy"
            type="image"
            src={buttonBuy}
            onClick={() =>
              window.open("https://blackrockgames.fr/boutiques", "_blank")
            }
            width="70%"
            height="70%"
          />
        </td>
      </tr>
    );
  }
}

export default StartTop;
