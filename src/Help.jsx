import { Component } from "react";
import "./styles.css";

import rule1 from "./images/Rule1.png";
import rule2 from "./images/Rule2.png";
import rule3 from "./images/Rule3.png";
import rule4 from "./images/Rule4.png";
import rule5 from "./images/Rule5.png";
import rule6 from "./images/Rule6.png";
import rule7 from "./images/Rule7.png";
import rule10 from "./images/Rule10.png";
import rule11 from "./images/Rule11.png";
import rule12 from "./images/Rule12.png";
import rule13 from "./images/Rule13.png";
import rule14 from "./images/Rule14.png";
import rule15 from "./images/Rule15.png";
import rule16 from "./images/Rule16.png";
import rule17 from "./images/Rule17.png";
import rule18 from "./images/Rule18.png";
import rule19 from "./images/Rule19.png";

var helpSentence = [
  "Replacez les oiseaux au bon endroit ! Voici un aperçu des règles de placement des oiseaux :",
  "Replacez vos amis les monstres au bon endroit ! Voici un aperçu des règles de placement des monstres :"
];

class Help extends Component {
  render() {
    return (
      <tr className="help">
        <td
          colSpan="3"
          className="card"
          align="center"
          valign="top"
          width="100%"
        >
          {this.props.whichgame === 0 ? (
            <div>
              <h4>{helpSentence[this.props.whichgame]}</h4>
              <img alt="rule" src={rule1} width="25%" height="25%" />
              &nbsp;&nbsp;
              <img alt="rule" src={rule2} width="25%" height="25%" />
              &nbsp;&nbsp;
              <img alt="rule" src={rule3} width="25%" height="25%" />
              &nbsp;&nbsp;
              <img alt="rule" src={rule4} width="25%" height="25%" />
              &nbsp;&nbsp;
              <img alt="rule" src={rule5} width="25%" height="25%" />
              &nbsp;&nbsp;
              <img alt="rule" src={rule6} width="25%" height="25%" />
              &nbsp;&nbsp;
              <img alt="rule" src={rule7} width="25%" height="25%" />
            </div>
          ) : null}
          {this.props.whichgame === 1 ? (
            <div>
              <h4>{helpSentence[this.props.whichgame]}</h4>
              <img alt="rule" src={rule10} width="15%" height="15%" />
              &nbsp;&nbsp;
              <img alt="rule" src={rule11} width="15%" height="15%" />
              &nbsp;&nbsp;
              <img alt="rule" src={rule12} width="15%" height="15%" />
              &nbsp;&nbsp;
              <img alt="rule" src={rule13} width="15%" height="15%" />
              &nbsp;&nbsp;
              <img alt="rule" src={rule14} width="15%" height="15%" />
              &nbsp;&nbsp;
              <img alt="rule" src={rule15} width="15%" height="15%" />
              &nbsp;&nbsp;
              <img alt="rule" src={rule16} width="15%" height="15%" />
              &nbsp;&nbsp;
              <img alt="rule" src={rule17} width="15%" height="15%" />
              &nbsp;&nbsp;
              <img alt="rule" src={rule18} width="15%" height="15%" />
              &nbsp;&nbsp;
              <img alt="rule" src={rule19} width="15%" height="15%" />
            </div>
          ) : null}
        </td>
      </tr>
    );
  }
}

export default Help;
