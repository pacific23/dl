import { Component } from "react";
import "./styles.css";

class Stats extends Component {
  render() {
    return (
      <table align="center">
        <tbody>
          <tr className="help" align="center">
            <td>
              <h4>Total défis joués</h4>
            </td>
            <td>
              <h4>{this.props.nbHist}</h4>
            </td>
          </tr>
          <tr class="help" align="center">
            <td>
              <h4>Temps moyen</h4>
            </td>
            <td>
              <h4>{this.props.moyHist}s</h4>
            </td>
          </tr>
          <tr class="help" align="center">
            <td>
              <h4>Série en cours</h4>
            </td>
            <td>
              <h4>{this.props.streakHist}</h4>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Stats;
