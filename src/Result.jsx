import { Component } from "react";
import "./styles.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

import buttonBuy from "./images/ButtonBuy.png";

class Result extends Component {
  state = {
    copyText: "Partager votre score"
  };

  render() {
    return (
      <tr>
        <td></td>
        <td>
          <table align="center">
            <tbody>
              <tr className="help" align="center">
                <td>
                  <h3>
                    {this.props.emoticon +
                      "https://defilogic.bankiiiz.com #" +
                      this.props.idDefi +
                      this.props.emoticon}
                    <br />
                    {this.props.trophy}
                    <br />
                    {"⏱" + this.props.timeFinal + "s⏱"}
                    <br />
                    {this.props.nbTry + " tentative(s) : " + this.props.essais}
                    <br />
                    {this.props.historicalMoves.length +
                      " mouvements : " +
                      this.props.lineMvt}
                    <br />
                    <CopyToClipboard
                      text={this.props.textToCopy}
                      onCopy={() =>
                        this.setState({ copyText: "Texte copié !" })
                      }
                    >
                      <button>{this.state.copyText}</button>
                    </CopyToClipboard>
                  </h3>
                  <input
                    alt="buy"
                    type="image"
                    src={buttonBuy}
                    onClick={() =>
                      window.open(
                        "https://blackrockgames.fr/boutiques",
                        "_blank"
                      )
                    }
                    width="30%"
                    height="30%"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </td>
        <td></td>
      </tr>
    );
  }
}

export default Result;
