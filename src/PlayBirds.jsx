import { Component } from "react";
import "./styles.css";
import { DragDropContainer, DropTarget } from "react-drag-drop-container";

import buttonValidBirds from "./images/ButtonValidBirds.png";
import buttonFaux from "./images/ButtonFaux.png";
import buttonBravo from "./images/ButtonBravo.png";
import bird0 from "./images/Bird0.png";
import bird1 from "./images/Bird1.png";
import bird2 from "./images/Bird2.png";
import bird3 from "./images/Bird3.png";
import bird4 from "./images/Bird4.png";
import bird5 from "./images/Bird5.png";
import birdX from "./images/BirdX.png";

var imageBird = [bird0, bird1, bird2, bird3, bird4, bird5, birdX];

class PlayBirds extends Component {
  state = {
    buttonValid: 0,
    draggedBird: -1,
    targetLine: -1,
    line: [6, 6, 6, 6, 6, 6],
    birds: [1, 1, 1, 1, 1, 1],
    birdsDraggable: ["", "", "", "", "", ""],
    linesDraggable: ["True", "True", "True", "True", "True", "True"]
  };

  drag = (event) => {
    // On vient de prendre un oiseau de la ligne du haut
    this.state.draggedBird = event.idBird;
  };

  dragLine = (event) => {
    // On vient de prendre un oiseau de la ligne du bas
    this.state.draggedBird = this.state.line[event.idLine];
  };

  hit = (event) => {
    // On va lâcher l'oiseau
  };

  isThisMoveCorrectBirds = (bird, pos) => {
    return parseInt(this.props.solution.substr(pos, 1), 10) === bird;
  };

  drop = (event) => {
    //   clearTimeout(timeout);
    //   this.createTimer();
    this.props.addMove();
    // On vient de lâcher l'oiseau
    this.state.targetLine = event.dropData.idLine;
    if (this.state.targetLine === -1) {
      // On lâche l'oiseau sur la ligne du haut
      //        this.props.addHistoricalMove(1); // Neutral move
      this.state.birds[this.state.draggedBird] = 1;
      document.getElementById("bird" + this.state.draggedBird).src =
        imageBird[this.state.draggedBird];
      this.state.birdsDraggable[this.state.draggedBird] = "";
      for (var i = 0; i < this.props.solution.length; i++) {
        if (this.state.line[i] === this.state.draggedBird) {
          this.state.line[i] = 6;
          this.state.linesDraggable[i] = "True";
        }
      }
      this.setState({ draggedBird: 0 });
    } else {
      // On lâche l'oiseau en bas
      if (
        this.isThisMoveCorrectBirds(
          this.state.draggedBird,
          this.state.targetLine
        )
      ) {
        this.props.addHistoricalMove(0); // Correct move
      } else {
        this.props.addHistoricalMove(2); // Incorrect move
      }
      if (this.state.line[this.state.targetLine] === 6) {
        // Laché sur une case vide
        // On commence par retirer toute copie de cet oiseau
        for (var j = 0; j < this.props.solution.length; j++) {
          if (this.state.line[j] === this.state.draggedBird) {
            this.state.line[j] = 6;
            this.state.linesDraggable[i] = "True";
          }
        }
        // On applique le déplacement
        this.state.birds[this.state.draggedBird] = 0.2;
        this.state.line[this.state.targetLine] = this.state.draggedBird;
        document.getElementById("line" + this.state.targetLine).src =
          imageBird[this.state.draggedBird];
        this.state.birdsDraggable[this.state.draggedBird] = "False";
        this.state.linesDraggable[this.state.targetLine] = "";
        this.setState({ draggedBird: 0 });
      } else {
        // On doit faire un swap
        for (var i = 0; i < this.props.solution.length; i++) {
          if (this.state.line[i] === this.state.draggedBird) {
            this.state.line[i] = 6;
            this.state.linesDraggable[i] = "True";
          }
        }

        var swappedBird = this.state.line[this.state.targetLine];
        document.getElementById("bird" + swappedBird).src =
          imageBird[swappedBird];
        this.state.birdsDraggable[swappedBird] = "";
        this.state.birds[swappedBird] = 1;

        // On applique le déplacement
        this.state.birds[this.state.draggedBird] = 0.2;
        this.state.line[this.state.targetLine] = this.state.draggedBird;
        document.getElementById("line" + this.state.targetLine).src =
          imageBird[this.state.draggedBird];
        this.state.birdsDraggable[this.state.draggedBird] = "False";
        this.state.linesDraggable[this.state.targetLine] = "";
        this.setState({ draggedBird: 0 });
      }
    }
    // Vérification si tous les oiseaux ont été déplacés
    var nbBird = 0;
    for (var i = 0; i < this.props.solution.length; i++) {
      if (this.state.line[i] != 6) {
        nbBird++;
      }
    }
    if (nbBird == this.props.solution.length) {
      this.setState({ buttonValid: 1 });
    } else {
      this.setState({ buttonValid: 0 });
    }
  };

  checkSol = () => {
    if (this.state.gameState == 2) {
      return;
    }
    this.props.addTry();
    // Vérification si le niveau est terminé
    var nbokBird = 0;
    for (var i = 0; i < this.props.solution.length; i++) {
      if (parseInt(this.props.solution.substr(i, 1)) === this.state.line[i]) {
        nbokBird++;
      }
    }
    if (nbokBird == this.props.solution.length) {
      for (var i = 0; i < this.props.solution.length; i++) {
        this.state.birdsDraggable[i] = "False";
        this.state.linesDraggable[i] = "False";
      }
      this.setState({ buttonValid: 3 });
      this.props.victory();
      /*      alert(
          "Coups : " +
            this.state.nbMoves +
            " / Essais : " +
            this.state.nbTry +
            " / Temps : " +
            timeFinal
        );*/
    } else {
      this.setState({ buttonValid: 2 });
    }
  };

  render() {
    return (
      <tr>
        <td colSpan="3">
          <div>
            <DropTarget
              targetKey="line"
              onHit={this.hit}
              dropData={{ idLine: -1 }}
            >
              {this.renderBird(0)}
              {this.renderBird(1)}
              {this.renderBird(2)}
              {this.props.solution.length > 3 ? this.renderBird(3) : null}
              {this.props.solution.length > 4 ? this.renderBird(4) : null}
              {this.props.solution.length > 5 ? this.renderBird(5) : null}
            </DropTarget>
          </div>
          <div>
            {this.renderTarget(0)}
            {this.renderTarget(1)}
            {this.renderTarget(2)}
            {this.props.solution.length > 3 ? this.renderTarget(3) : null}
            {this.props.solution.length > 4 ? this.renderTarget(4) : null}
            {this.props.solution.length > 5 ? this.renderTarget(5) : null}
          </div>
          {this.state.buttonValid === 0 ? (
            <input
              alt="valid"
              type="image"
              style={{ opacity: 0.3 }}
              src={buttonValidBirds}
              width="50%"
              height="50%"
            />
          ) : null}
          {this.state.buttonValid === 1 ? (
            <input
              alt="valid"
              type="image"
              src={buttonValidBirds}
              onClick={this.checkSol}
              width="50%"
              height="50%"
            />
          ) : null}
          {this.state.buttonValid === 2 ? (
            <input
              alt="valid"
              type="image"
              src={buttonFaux}
              width="50%"
              height="50%"
            />
          ) : null}
          {this.state.buttonValid === 3 ? (
            <input
              alt="valid"
              type="image"
              src={buttonBravo}
              width="50%"
              height="50%"
            />
          ) : null}
        </td>
      </tr>
    );
  }

  renderBird(id) {
    return (
      <DragDropContainer
        targetKey="line"
        onDragStart={this.drag}
        onDrop={this.drop}
        dragData={{ idBird: id }}
        noDragging={this.state.birdsDraggable[id]}
      >
        <img
          src={imageBird[id]}
          id={"bird" + id}
          alt={"bird" + id}
          draggable="false"
          width={Math.trunc(130 * this.props.adjust)}
          height={Math.trunc(130 * this.props.adjust)}
          style={{ opacity: this.state.birds[id] }}
        />
      </DragDropContainer>
    );
  }

  renderTarget(id) {
    return (
      <DragDropContainer
        targetKey="line"
        onDragStart={this.dragLine}
        onDrop={this.drop}
        dragData={{ idLine: id }}
        noDragging={this.state.linesDraggable[id]}
      >
        <DropTarget targetKey="line" onHit={this.hit} dropData={{ idLine: id }}>
          <img
            src={imageBird[this.state.line[id]]}
            id={"line" + id}
            alt={"line" + id}
            draggable="false"
            width={Math.trunc(130 * this.props.adjust)}
            height={Math.trunc(130 * this.props.adjust)}
          />
        </DropTarget>
      </DragDropContainer>
    );
  }
}

export default PlayBirds;
