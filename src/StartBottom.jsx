import { Component } from "react";
import "./styles.css";

import buttonStart from "./images/ButtonStart.png";

class StartBottom extends Component {
  render() {
    return (
      <tr>
        <td></td>
        <td>
          <div className="white">
            <h4>
              Le chrono se met en marche dès que vous lancez le jeu.
              <br />
              Serez-vous le plus rapide ?
            </h4>
          </div>
          <input
            alt="start"
            type="image"
            src={buttonStart}
            onClick={this.props.play}
            width="250px"
            height="52px"
          />
        </td>
        <td></td>
      </tr>
    );
  }
}

export default StartBottom;
