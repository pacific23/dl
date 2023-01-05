import { Component } from "react";
import "./styles.css";

import logoBankiiiz from "./images/LogoBankiiiz.jpg";

var sentenceLine1 = [
  "Chargement...",
  "Aujourd'hui,",
  "A vous de jouer !",
  "Victoire !"
];
var sentenceLine2 = ["", "jouez à...", "", ""];

class Header extends Component {
  render() {
    return (
      <table className="main">
        <tbody>
          <tr className="top" height={Math.trunc(50 * this.props.adjustBanner)}>
            <td align="center" valign="bottom" width="20%" height="20%">
              <img alt="logo" src={logoBankiiiz} width="50px" height="50px" />
            </td>
            <td align="center" valign="center" width="60%" height="60%">
              <h4>
                {sentenceLine1[this.props.gameState]}
                <br />
                {sentenceLine2[this.props.gameState]}
              </h4>
            </td>
            <td align="center" width="20%"></td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Header;
