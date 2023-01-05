import { Component } from "react";
import "./styles.css";

import Stats from "./Stats";

import buttonStartAgain from "./images/ButtonStartAgain.png";

class StartAlready extends Component {
  render() {
    return (
      <tr class="help">
        <td colspan="3" class="card" align="center" valign="top" width="100%">
          <h4>
            Vous avez déjà joué aujourd'hui.
            <br />
            Voulez-vous rejouer ?
          </h4>
          <Stats
            nbHist={this.props.nbHist}
            moyHist={this.props.moyHist}
            streakHist={this.props.streakHist}
          />
          <br />
          <input
            alt="startAgain"
            type="image"
            src={buttonStartAgain}
            onClick={this.props.onStartAgain}
            width="250px"
            height="52px"
          />
        </td>
      </tr>
    );
  }
}

export default StartAlready;
