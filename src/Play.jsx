import { Component } from "react";
import "./styles.css";

import Help from "./Help";
import Card from "./Card";
import PlayBirds from "./PlayBirds";
import PlayHotel from "./PlayHotel";

class Play extends Component {
  state = {
    showHelp: 0
  };

  clickHelp() {
    if (this.state.showHelp === 0) this.setState({ showHelp: 1 });
    else this.setState({ showHelp: 0 });
  }

  render() {
    return (
      <table className="main">
        <tbody>
          {this.state.showHelp === 1 ? (
            <Help whichgame={this.props.whichgame} />
          ) : null}
          <Card
            whichgame={this.props.whichgame}
            adjustBanner={this.props.adjustBanner}
            sizex={this.props.sizex}
            lvl={this.props.lvl}
            clickHelp={() => this.clickHelp()}
            showHelp={this.state.showHelp}
          />
          {this.props.whichgame === 0 ? (
            <PlayBirds
              solution={this.props.solution}
              adjust={this.props.adjust}
              addHistoricalMove={this.props.addHistoricalMove}
              addMove={() => this.props.addMove()}
              addTry={() => this.props.addTry()}
              victory={() => this.props.victory()}
            />
          ) : null}
          {this.props.whichgame === 1 ? (
            <PlayHotel
              solution={this.props.solution}
              adjust={this.props.adjust}
              addHistoricalMove={this.props.addHistoricalMove}
              addMove={() => this.props.addMove()}
              addTry={() => this.props.addTry()}
              victory={() => this.props.victory()}
            />
          ) : null}
        </tbody>
      </table>
    );
  }
}

export default Play;
