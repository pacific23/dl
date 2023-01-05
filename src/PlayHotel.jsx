import { Component } from "react";
import "./styles.css";
import { DragDropContainer, DropTarget } from "react-drag-drop-container";

import buttonValidHotel from "./images/ButtonValidHotel.png";
import buttonFaux from "./images/ButtonFaux.png";
import buttonBravo from "./images/ButtonBravo.png";
import char0 from "./images/Char0.png";
import char1 from "./images/Char1.png";
import char2 from "./images/Char2.png";
import char3 from "./images/Char3.png";
import char4 from "./images/Char4.png";
import char5 from "./images/Char5.png";
import charX from "./images/CharX.png";
import stage1 from "./images/Stage1.jpg";
import stage2 from "./images/Stage2.jpg";
import stage3 from "./images/Stage3.jpg";
import stage4 from "./images/Stage4.jpg";

var imageChar = [char0, char1, char2, char3, char4, char5, charX];

class PlayHotel extends Component {
  state = {
    buttonValid: 0,
    draggedChar: -1,
    targetLine: -1,
    targetX: 0,
    line: [6, 6, 6, 6, 6, 6],
    char: [1, 1, 1, 1, 1, 1],
    charDraggable: ["", "", "", "", "", ""],
    position: [
      [6, 6, 6, 6],
      [6, 6, 6, 6],
      [6, 6, 6, 6],
      [6, 6, 6, 6]
    ],
    posDraggable: [
      ["True", "True", "True", "True"],
      ["True", "True", "True", "True"],
      ["True", "True", "True", "True"],
      ["True", "True", "True", "True"]
    ]
  };

  drag = (event) => {
    // On vient de prendre un monstre de la ligne du haut
    this.state.draggedChar = event.idChar;
  };

  dragLine = (event) => {
    // On vient de prendre un monstre de l'hotel'
    this.state.draggedChar = this.state.position[event.idLine][event.idPos];
  };

  hit = (event) => {
    // On va lâcher le monstre
  };

  isThisMoveCorrectHotel = (char, pos) => {
    return parseInt(this.props.solution.substr(char, 1)) === pos;
  };

  drop = (event) => {
    this.props.addMove();
    // On vient de lâcher le monstre
    this.state.targetLine = event.dropData.idLine;
    this.state.targetX = event.dropData.idPos;
    //    console.log(this.state.targetLine);
    //    console.log(this.state.targetX);
    if (this.state.targetLine === -1) {
      // On lâche l'oiseau sur la ligne du haut
      this.state.char[this.state.draggedChar] = 1;
      document.getElementById("char" + this.state.draggedChar).src =
        imageChar[this.state.draggedChar];
      this.state.charDraggable[this.state.draggedChar] = "";
      for (var i = 0; i < 4; i++) {
        for (var x = 0; x < 4; x++) {
          if (this.state.position[i][x] === this.state.draggedChar) {
            this.state.position[i][x] = 6;
            this.state.posDraggable[i][x] = "True";
          }
        }
      }
      this.setState({ draggedChar: 0 });
    } else {
      if (
        this.state.position[this.state.targetLine][this.state.targetX] === 6
      ) {
        if (
          this.isThisMoveCorrectHotel(
            this.state.draggedChar,
            this.state.targetLine
          )
        ) {
          this.props.addHistoricalMove(0); // Correct move
        } else {
          this.props.addHistoricalMove(2); // Incorrect move
        } // Laché sur une case vide
        // On commence par retirer toute copie de ce monstre
        for (i = 0; i < 4; i++) {
          for (x = 0; x < 4; x++) {
            if (this.state.position[i][x] === this.state.draggedChar) {
              this.state.position[i][x] = 6;
              this.state.posDraggable[i][x] = "True";
            }
          }
        }

        // On applique le déplacement
        this.state.char[this.state.draggedChar] = 0.2;
        this.state.position[this.state.targetLine][
          this.state.targetX
        ] = this.state.draggedChar;
        document.getElementById(
          "pos" + this.state.targetLine + this.state.targetX
        ).src = imageChar[this.state.draggedChar];
        this.state.charDraggable[this.state.draggedChar] = "False";
        this.state.posDraggable[this.state.targetLine][this.state.targetX] = "";
        this.setState({ draggedChar: 0 });
      } else {
        // On doit faire un swap
        for (i = 0; i < 4; i++) {
          for (x = 0; x < 4; x++) {
            if (this.state.position[i][x] === this.state.draggedChar) {
              this.state.position[i][x] = 6;
              this.state.posDraggable[i][x] = "True";
            }
          }
        }

        var swappedChar = this.state.position[this.state.targetLine][
          this.state.targetX
        ];
        document.getElementById("char" + swappedChar).src =
          imageChar[swappedChar];
        this.state.charDraggable[swappedChar] = "";
        this.state.char[swappedChar] = 1;

        // On applique le déplacement
        this.state.char[this.state.draggedChar] = 0.2;
        this.state.position[this.state.targetLine][
          this.state.targetX
        ] = this.state.draggedChar;
        document.getElementById(
          "pos" + this.state.targetLine + this.state.targetX
        ).src = imageChar[this.state.draggedChar];
        this.state.charDraggable[this.state.draggedChar] = "False";
        this.state.posDraggable[this.state.targetLine][this.state.targetX] = "";
        this.setState({ draggedChar: 0 });
      }
    }
    // On déplace tous les éléments à gauche
    for (i = 0; i < 4; i++) {
      for (var n = 0; n < 4; n++) {
        for (x = 0; x < 3; x++) {
          if (
            this.state.position[i][x] == 6 &&
            this.state.position[i][x + 1] != 6
          ) {
            this.state.position[i][x] = this.state.position[i][x + 1];
            this.state.position[i][x + 1] = 6;
            this.state.posDraggable[i][x] = "";
            this.state.posDraggable[i][x + 1] = "True";
          }
        }
      }
    }

    // Vérification si tous les monstres ont été déplacés
    var nbChar = 0;
    for (i = 0; i < 4; i++) {
      for (x = 0; x < 4; x++) {
        if (this.state.position[i][x] != 6) {
          nbChar++;
        }
      }
    }
    if (nbChar == this.props.solution.length) {
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
    var nbokChar = 0;
    for (var i = 0; i < 4; i++) {
      for (var x = 0; x < 4; x++) {
        if (this.state.position[i][x] != 6) {
          if (
            parseInt(
              this.props.solution.substr(this.state.position[i][x], 1)
            ) === i
          ) {
            nbokChar++;
          }
        }
      }
    }
    if (nbokChar == this.props.solution.length) {
      for (i = 0; i < 4; i++) {
        for (x = 0; x < 4; x++) {
          this.state.charDraggable[i] = "False";
          this.state.posDraggable[i][x] = "False";
        }
      }
      this.setState({ buttonValid: 3 });
      this.props.victory();
    } else {
      this.setState({ buttonValid: 2 });
    }
  };

  render() {
    return (
      <tr>
        <td colSpan="3">
          <div>
            <div>
              <DropTarget
                targetKey="pos"
                onHit={this.hit}
                dropData={{ idLine: -1 }}
              >
                {this.renderChar(0)}
                {this.renderChar(1)}
                {this.renderChar(2)}
                {this.props.solution.length > 3 ? this.renderChar(3) : null}
                {this.props.solution.length > 4 ? this.renderChar(4) : null}
                {this.props.solution.length > 5 ? this.renderChar(5) : null}
              </DropTarget>
            </div>
            <div align="center">
              <table class="hotel">
                <tr bgcolor="000000">
                  <td colspan="4"></td>
                </tr>
                <tr bgcolor="a5ccaf" background={stage1}>
                  <td>{this.renderTarget(0, 0)}</td>
                  <td>{this.renderTarget(0, 1)}</td>
                  <td>{this.renderTarget(0, 2)}</td>
                  <td>{this.renderTarget(0, 3)}</td>
                </tr>
                <tr bgcolor="000000">
                  <td colspan="4"></td>
                </tr>
                <tr bgcolor="9eb6ce" background={stage2}>
                  <td>{this.renderTarget(1, 0)}</td>
                  <td>{this.renderTarget(1, 1)}</td>
                  <td>{this.renderTarget(1, 2)}</td>
                  <td>{this.renderTarget(1, 3)}</td>
                </tr>
                <tr bgcolor="000000">
                  <td colspan="4"></td>
                </tr>
                <tr bgcolor="bc9cc5" background={stage3}>
                  <td>{this.renderTarget(2, 0)}</td>
                  <td>{this.renderTarget(2, 1)}</td>
                  <td>{this.renderTarget(2, 2)}</td>
                  <td>{this.renderTarget(2, 3)}</td>
                </tr>
                <tr bgcolor="000000">
                  <td colspan="4"></td>
                </tr>
                <tr bgcolor="ca9e9b" background={stage4}>
                  <td>{this.renderTarget(3, 0)}</td>
                  <td>{this.renderTarget(3, 1)}</td>
                  <td>{this.renderTarget(3, 2)}</td>
                  <td>{this.renderTarget(3, 3)}</td>
                </tr>
                <tr bgcolor="000000">
                  <td colspan="4"></td>
                </tr>
              </table>
            </div>
          </div>
          {this.state.buttonValid === 0 ? (
            <input
              alt="valid"
              type="image"
              style={{ opacity: 0.3 }}
              src={buttonValidHotel}
              width="50%"
              height="50%"
            />
          ) : null}
          {this.state.buttonValid === 1 ? (
            <input
              alt="valid"
              type="image"
              src={buttonValidHotel}
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

  renderChar(id) {
    return (
      <DragDropContainer
        targetKey="pos"
        onDragStart={this.drag}
        onDrop={this.drop}
        dragData={{ idChar: id }}
        noDragging={this.state.charDraggable[id]}
      >
        <img
          src={imageChar[id]}
          id={"char" + id}
          alt={"char" + id}
          draggable="false"
          width={Math.trunc(100 * this.props.adjust)}
          height={Math.trunc(100 * this.props.adjust)}
          style={{ opacity: this.state.char[id] }}
        />
      </DragDropContainer>
    );
  }

  renderTarget(idLINE, idPOS) {
    return (
      <DragDropContainer
        targetKey="pos"
        onDragStart={this.dragLine}
        onDrop={this.drop}
        dragData={{ idLine: idLINE, idPos: idPOS }}
        noDragging={this.state.posDraggable[idLINE][idPOS]}
      >
        <DropTarget
          targetKey="pos"
          onHit={this.hit}
          dropData={{ idLine: idLINE, idPos: idPOS }}
        >
          <img
            src={imageChar[this.state.position[idLINE][idPOS]]}
            id={"pos" + idLINE + idPOS}
            alt={"pos" + idLINE + idPOS}
            draggable="false"
            width={Math.trunc(100 * this.props.adjust)}
            height={Math.trunc(100 * this.props.adjust)}
          />
        </DropTarget>
      </DragDropContainer>
    );
  }
}

export default PlayHotel;
