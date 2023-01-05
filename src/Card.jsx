import { Component } from "react";
import "./styles.css";

import gammeLogic from "./images/GammeLogic.png";
import logoBirds from "./images/LogoBirds.png";
import logoHotel from "./images/LogoHotel.png";
import buttonBuy from "./images/ButtonBuy.png";
import buttonHelp from "./images/ButtonHelp.png";
import buttonHelpClose from "./images/ButtonHelpClose.png";

var todayGame = [logoBirds, logoHotel];

class Card extends Component {
  render() {
    return (
      <tr style={{ position: "relative" }}>
        {this.props.sizex > 499 ? (
          <td className="card" align="center" valign="top" width="20%">
            <img alt="logo" src={gammeLogic} width="58px" height="43px" />
            <br />
            <br />
            <img
              alt="logo"
              src={todayGame[this.props.whichgame]}
              width="70%"
              height="70%"
            />
          </td>
        ) : (
          <td></td>
        )}
        <td>
          <h3>
            <span style={{ position: "absolute", top: "0px", right: "0px" }}>
              {this.props.showHelp === 0 ? (
                <input
                  alt="help"
                  type="image"
                  id="imgHelp"
                  src={buttonHelp}
                  onClick={this.props.clickHelp}
                  width="20%"
                />
              ) : (
                <input
                  alt="help"
                  type="image"
                  id="imgHelp"
                  src={buttonHelpClose}
                  onClick={this.props.clickHelp}
                  width="20%"
                />
              )}
            </span>
          </h3>
          <img
            src={
              "https://www.pcspace.com/logicbird/daychallenge/" +
              this.props.lvl +
              ".png"
            }
            id="card"
            alt="card"
            draggable="false"
            width="350"
            height="auto"
          />
        </td>
        {this.props.sizex > 499 ? (
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
        ) : (
          <td></td>
        )}
      </tr>
    );
  }
}

export default Card;
