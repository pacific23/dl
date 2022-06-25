import React from "react";
import ReactDOM from "react-dom";
import { DragDropContainer, DropTarget } from "react-drag-drop-container";
import Cookies from "universal-cookie";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./styles.css";

import backgroundBirds from "./images/BackgroundBirds.jpg";
import backgroundHotel from "./images/BackgroundHotel.jpg";
import logoBankiiiz from "./images/LogoBankiiiz.jpg";
import gammeLogic from "./images/GammeLogic.png";
import birds from "./images/Birds.png";
import hotel from "./images/Hotel.png";
import logoBirds from "./images/LogoBirds.png";
import logoHotel from "./images/LogoHotel.png";
import miniGamme from "./images/MiniGamme.png";
import buttonStart from "./images/ButtonStart.png";
import buttonStartAgain from "./images/ButtonStartAgain.png";
import buttonBuy from "./images/ButtonBuy.png";
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
import bird0 from "./images/Bird0.png";
import bird1 from "./images/Bird1.png";
import bird2 from "./images/Bird2.png";
import bird3 from "./images/Bird3.png";
import bird4 from "./images/Bird4.png";
import bird5 from "./images/Bird5.png";
import birdX from "./images/BirdX.png";
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
import buttonBravo from "./images/ButtonBravo.png";
import buttonFaux from "./images/ButtonFaux.png";
import buttonHelp from "./images/ButtonHelp.png";
import buttonHelpClose from "./images/ButtonHelpClose.png";
import buttonValidBirds from "./images/ButtonValidBirds.png";
import buttonValidHotel from "./images/ButtonValidHotel.png";

const url = window.location.host;
const cookies = new Cookies();

var userID = "";
var nbReconnect = 0;
var idDefi = 0;
var whichgame = 0; // 0 : Birds / 1 : Hotel / 2 : Jungle
var lvl = "";
var solution = "";
var nbHist = 0;
var moyHist = 0;
var streakHist = 0;
var background = backgroundBirds;
var logoTodayGame = logoBirds;
var todayGame = birds;
var helpSentence =
  "Replacez les oiseaux au bon endroit !<br />Voici un aperçu des règles de placement des oiseaux :";
var buttonValid = buttonValidBirds;
//var timeout;
//var delay = 120000;
var timeStart;
var timeFinal;
var scoreFinal;

class App extends React.Component {
  state = {
    actualButton: buttonValid,
    gameState: 0, // 0 : loading / 1 : game / 2 : endoflevel / -4 : Délai expiré
    pauseGame: 1,
    helpState: 1,
    alreadyPlayed: false,
    showStats: 0,
    buttonValid: 0,
    nbMoves: 0,
    nbTry: 0,
    sizex: 0,
    adjust: 1,
    adjustBanner: 1,
    imageBird: [bird0, bird1, bird2, bird3, bird4, bird5, birdX],
    imageChar: [char0, char1, char2, char3, char4, char5, charX],
    draggedBird: -1,
    targetLine: -1,
    line: [6, 6, 6, 6, 6, 6],
    birds: [1, 1, 1, 1, 1, 1],
    birdsDraggable: ["", "", "", "", "", ""],
    linesDraggable: ["True", "True", "True", "True", "True", "True"],
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
    ],
    historicalMoves: [], // 0 : correct move, 1 : neutral move, 2 : incorrectMove
    textToCopy: "",
    copyText: "Partager votre score"
  };

  componentDidMount() {
    document.title = "Defilogic";
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
    userID = cookies.get("user");
    if (userID === undefined) {
      var d = new Date();
      d.setTime(d.getTime() + 60 * 60 * 24 * 400 * 1000);
      userID = this.generateUUID();
      cookies.set("user", userID, {
        path: "/",
        maxAge: 60 * 60 * 24 * 400,
        expires: d
      });
      //alert("cookie : " + userID); // Pacman
    } else {
      //alert("cookie : " + userID); // Pacman
    }
    this.getPredata();
  }

  generateUUID() {
    // Public Domain/MIT
    var d = new Date().getTime(); //Timestamp
    var d2 =
      (typeof performance !== "undefined" &&
        performance.now &&
        performance.now() * 1000) ||
      0; //Time in microseconds since page-load or 0 if unsupported
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
      c
    ) {
      var r = Math.random() * 16; //random number between 0 and 16
      if (d > 0) {
        //Use timestamp until depleted
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {
        //Use microseconds since page-load if supported
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
  }
  startChrono() {
    timeStart = new Date().getTime();
  }

  resize() {
    this.state.sizex = window.innerWidth;
    this.setState({
      adjustBanner: Math.max(this.state.sizex / 800, 1)
    });
    if (lvl == "") return;
    this.setState({
      adjust: Math.min(this.state.sizex / (130 * solution.length + 60), 1)
    });
  }

  clickHelp = () => {
    if (this.state.helpState == 0) {
      this.setState({ helpState: 1 });
    } else {
      if (this.state.pauseGame == 1) {
        this.getData();
      }
      //      this.createTimer();

      this.setState({ helpState: 0, pauseGame: 0 });
    }
    window.scrollTo(0, 0);
  };

  clickInfo = () => {
    this.setState({ gameInfo: this.state.gameInfo - 1 });
    window.scrollTo(0, 0);
  };

  getData() {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("load", () => {
      var data = xhr.responseText;
      var jsonResponse = JSON.parse(data);
      idDefi = jsonResponse["id"];
      whichgame = jsonResponse["whichgame"];
      lvl = jsonResponse["challenge"];
      solution = jsonResponse["solution"];
      nbReconnect = jsonResponse["nbReconnect"];
      if (jsonResponse["status"] == "ok") {
        if (whichgame == 0) {
          background = backgroundBirds;
          logoTodayGame = logoBirds;
          todayGame = birds;
          helpSentence =
            "Replacez les oiseaux au bon endroit ! Voici un aperçu des règles de placement des oiseaux :";
          buttonValid = buttonValidBirds;
          this.state.actualButton = buttonValid;
        }
        if (whichgame == 1) {
          background = backgroundHotel;
          logoTodayGame = logoHotel;
          todayGame = hotel;
          helpSentence =
            "Replacez vos amis les monstres au bon endroit ! Voici un aperçu des règles de placement des monstres :";
          buttonValid = buttonValidHotel;
          this.state.actualButton = buttonValid;
        }
        this.setState({ gameState: 1, historicalMoves: [] });
        this.startChrono();
      }
      this.resize();
    });
    xhr.open(
      "GET",
      "https://www.pcspace.com/logicbird/getDayChallenge.php?uuid=" + userID
    );
    xhr.send();
  }

  getPredata() {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("load", () => {
      var data = xhr.responseText;
      var jsonResponse = JSON.parse(data);
      whichgame = jsonResponse["whichgame"];
      if (jsonResponse["status"] == "ok") {
        if (whichgame == 0) {
          background = backgroundBirds;
          logoTodayGame = logoBirds;
          todayGame = birds;
          helpSentence =
            "Replacez les oiseaux au bon endroit ! Voici un aperçu des règles de placement des oiseaux :";
          buttonValid = buttonValidBirds;
          this.state.actualButton = buttonValid;
        }
        if (whichgame == 1) {
          background = backgroundHotel;
          logoTodayGame = logoHotel;
          todayGame = hotel;
          helpSentence =
            "Replacez vos amis les monstres au bon endroit ! Voici un aperçu des règles de placement des monstres :";
          buttonValid = buttonValidHotel;
          this.state.actualButton = buttonValid;
        }
        nbHist = jsonResponse["nb"];
        moyHist = jsonResponse["moy"];
        streakHist = jsonResponse["streak"];
        this.setState({ alreadyPlayed: jsonResponse["played"] == "yes" });
      }
      this.resize();
    });
    xhr.open(
      "GET",
      "https://www.pcspace.com/logicbird/getDayChallenge.php?uuid=" +
        userID +
        "&ask=1"
    );
    xhr.send();
  }

  setData() {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("load", () => {
      var data = xhr.responseText;
      this.getPredata();
    });
    xhr.open(
      "GET",
      "https://www.pcspace.com/logicbird/setDayChallenge.php?uuid=" +
        userID +
        "&nbMoves=" +
        this.state.nbMoves +
        "&nbTry=" +
        this.state.nbTry +
        "&time=" +
        timeFinal +
        "&score=" +
        scoreFinal
    );
    xhr.send();
  }

  drag = (event) => {
    // On vient de prendre un oiseau de la ligne du haut
    this.state.draggedBird = event.idBird;
  };

  dragLine = (event) => {
    // On vient de prendre un oiseau de la ligne du bas
    if (whichgame == 0) {
      this.state.draggedBird = this.state.line[event.idLine];
    }
    if (whichgame == 1) {
      this.state.draggedBird = this.state.position[event.idLine][event.idPos];
    }
  };

  hit = (event) => {
    // On va lâcher l'oiseau
  };

  //  createTimer() {
  //    timeout = setTimeout(
  //      function () {
  //        this.setState({ gameState: -4 });
  //      }.bind(this),
  //      delay
  //    );
  //  }

  isThisMoveCorrectBirds = (bird, pos) => {
    return parseInt(solution.substr(pos, 1)) === bird;
  };

  drop = (event) => {
    if (whichgame == 0) {
      //   clearTimeout(timeout);
      //   this.createTimer();
      this.state.nbMoves++;
      // On vient de lâcher l'oiseau
      this.state.targetLine = event.dropData.idLine;
      if (this.state.targetLine === -1) {
        // On lâche l'oiseau sur la ligne du haut
        //        this.state.historicalMoves.push(1); // Neutral move
        this.state.birds[this.state.draggedBird] = 1;
        document.getElementById(
          "bird" + this.state.draggedBird
        ).src = this.state.imageBird[this.state.draggedBird];
        this.state.birdsDraggable[this.state.draggedBird] = "";
        for (var i = 0; i < solution.length; i++) {
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
          this.state.historicalMoves.push(0); // Correct move
        } else {
          this.state.historicalMoves.push(2); // Incorrect move
        }
        if (this.state.line[this.state.targetLine] === 6) {
          // Laché sur une case vide
          // On commence par retirer toute copie de cet oiseau
          for (var i = 0; i < solution.length; i++) {
            if (this.state.line[i] === this.state.draggedBird) {
              this.state.line[i] = 6;
              this.state.linesDraggable[i] = "True";
            }
          }
          // On applique le déplacement
          this.state.birds[this.state.draggedBird] = 0.2;
          this.state.line[this.state.targetLine] = this.state.draggedBird;
          document.getElementById(
            "line" + this.state.targetLine
          ).src = this.state.imageBird[this.state.draggedBird];
          this.state.birdsDraggable[this.state.draggedBird] = "False";
          this.state.linesDraggable[this.state.targetLine] = "";
          this.setState({ draggedBird: 0 });
        } else {
          // On doit faire un swap
          for (var i = 0; i < solution.length; i++) {
            if (this.state.line[i] === this.state.draggedBird) {
              this.state.line[i] = 6;
              this.state.linesDraggable[i] = "True";
            }
          }

          var swappedBird = this.state.line[this.state.targetLine];
          document.getElementById(
            "bird" + swappedBird
          ).src = this.state.imageBird[swappedBird];
          this.state.birdsDraggable[swappedBird] = "";
          this.state.birds[swappedBird] = 1;

          // On applique le déplacement
          this.state.birds[this.state.draggedBird] = 0.2;
          this.state.line[this.state.targetLine] = this.state.draggedBird;
          document.getElementById(
            "line" + this.state.targetLine
          ).src = this.state.imageBird[this.state.draggedBird];
          this.state.birdsDraggable[this.state.draggedBird] = "False";
          this.state.linesDraggable[this.state.targetLine] = "";
          this.setState({ draggedBird: 0 });
        }
      }
      // Vérification si tous les oiseaux ont été déplacés
      var nbBird = 0;
      for (var i = 0; i < solution.length; i++) {
        if (this.state.line[i] != 6) {
          nbBird++;
        }
      }
      if (nbBird == solution.length) {
        this.state.actualButton = buttonValid;
        this.setState({ buttonValid: 1 });
      } else {
        this.state.actualButton = buttonValid;
        this.setState({ buttonValid: 0 });
      }
    }
    if (whichgame == 1) {
      this.state.nbMoves++;
      // On vient de lâcher l'oiseau
      this.state.targetLine = event.dropData.idLine;
      this.state.targetX = event.dropData.idPos;
      //    console.log(this.state.targetLine);
      //    console.log(this.state.targetX);
      if (this.state.targetLine === -1) {
        // On lâche l'oiseau sur la ligne du haut
        this.state.birds[this.state.draggedBird] = 1;
        document.getElementById(
          "bird" + this.state.draggedBird
        ).src = this.state.imageChar[this.state.draggedBird];
        this.state.birdsDraggable[this.state.draggedBird] = "";
        for (var i = 0; i < 4; i++) {
          for (var x = 0; x < 4; x++) {
            if (this.state.position[i][x] === this.state.draggedBird) {
              this.state.position[i][x] = 6;
              this.state.posDraggable[i][x] = "True";
            }
          }
        }
        this.setState({ draggedBird: 0 });
      } else {
        if (
          this.state.position[this.state.targetLine][this.state.targetX] === 6
        ) {
          // Laché sur une case vide
          // On commence par retirer toute copie de cet oiseau
          for (i = 0; i < 4; i++) {
            for (x = 0; x < 4; x++) {
              if (this.state.position[i][x] === this.state.draggedBird) {
                this.state.position[i][x] = 6;
                this.state.posDraggable[i][x] = "True";
              }
            }
          }

          // On applique le déplacement
          this.state.birds[this.state.draggedBird] = 0.2;
          this.state.position[this.state.targetLine][
            this.state.targetX
          ] = this.state.draggedBird;
          document.getElementById(
            "pos" + this.state.targetLine + this.state.targetX
          ).src = this.state.imageChar[this.state.draggedBird];
          this.state.birdsDraggable[this.state.draggedBird] = "False";
          this.state.posDraggable[this.state.targetLine][this.state.targetX] =
            "";
          this.setState({ draggedBird: 0 });
        } else {
          // On doit faire un swap
          for (i = 0; i < 4; i++) {
            for (x = 0; x < 4; x++) {
              if (this.state.position[i][x] === this.state.draggedBird) {
                this.state.position[i][x] = 6;
                this.state.posDraggable[i][x] = "True";
              }
            }
          }

          var swappedBird = this.state.position[this.state.targetLine][
            this.state.targetX
          ];
          document.getElementById(
            "bird" + swappedBird
          ).src = this.state.imageChar[swappedBird];
          this.state.birdsDraggable[swappedBird] = "";
          this.state.birds[swappedBird] = 1;

          // On applique le déplacement
          this.state.birds[this.state.draggedBird] = 0.2;
          this.state.position[this.state.targetLine][
            this.state.targetX
          ] = this.state.draggedBird;
          document.getElementById(
            "pos" + this.state.targetLine + this.state.targetX
          ).src = this.state.imageChar[this.state.draggedBird];
          this.state.birdsDraggable[this.state.draggedBird] = "False";
          this.state.posDraggable[this.state.targetLine][this.state.targetX] =
            "";
          this.setState({ draggedBird: 0 });
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

      // Vérification si tous les oiseaux ont été déplacés
      var nbBird = 0;
      for (i = 0; i < 4; i++) {
        for (x = 0; x < 4; x++) {
          if (this.state.position[i][x] != 6) {
            nbBird++;
          }
        }
      }
      if (nbBird == solution.length) {
        this.state.actualButton = buttonValid;
        this.setState({ buttonValid: 1 });
      } else {
        this.state.actualButton = buttonValid;
        this.setState({ buttonValid: 0 });
      }
    }
  };

  checkSol = () => {
    if (this.state.gameState == 2) {
      return;
    }
    if (whichgame == 0) {
      this.state.nbTry++;
      // Vérification si le niveau est terminé
      var nbokBird = 0;
      for (var i = 0; i < solution.length; i++) {
        if (parseInt(solution.substr(i, 1)) === this.state.line[i]) {
          nbokBird++;
        }
      }
      if (nbokBird == solution.length) {
        for (var i = 0; i < solution.length; i++) {
          this.state.birdsDraggable[i] = "False";
          this.state.linesDraggable[i] = "False";
        }
        this.state.actualButton = buttonBravo;
        timeFinal = parseInt((new Date().getTime() - timeStart) / 1000);
        scoreFinal = -1;
        for (var i = 0; i <= timeFinal; i++) {
          scoreFinal = scoreFinal + 1 / (Math.trunc(i / 5) + 1);
          //        alert(scoreFinal);
        }
        scoreFinal = 20 + solution.length - scoreFinal / 2;
        scoreFinal = scoreFinal - this.state.nbMoves;
        scoreFinal = scoreFinal - (this.state.nbTry - 1);
        scoreFinal = Math.round(scoreFinal * 100) / 100;
        this.setState({ alreadyPlayed: false, gameState: 2 });
        this.setData();
        /*      alert(
          "Coups : " +
            this.state.nbMoves +
            " / Essais : " +
            this.state.nbTry +
            " / Temps : " +
            timeFinal
        );*/
      } else {
        this.state.actualButton = buttonFaux;
        this.setState({ buttonValid: 1 });
      }
    }
    if (whichgame == 1) {
      this.state.nbTry++;
      // Vérification si le niveau est terminé
      var nbokBird = 0;
      for (var i = 0; i < 4; i++) {
        for (var x = 0; x < 4; x++) {
          if (this.state.position[i][x] != 6) {
            if (parseInt(solution.substr(this.state.position[i][x], 1)) === i) {
              nbokBird++;
            }
          }
        }
      }
      if (nbokBird == solution.length) {
        for (i = 0; i < 4; i++) {
          for (x = 0; x < 4; x++) {
            this.state.birdsDraggable[i] = "False";
            this.state.posDraggable[i][x] = "False";
          }
        }
        this.state.actualButton = buttonBravo;
        timeFinal = parseInt((new Date().getTime() - timeStart) / 1000);
        scoreFinal = -1;
        for (var i = 0; i <= timeFinal; i++) {
          scoreFinal = scoreFinal + 1 / (Math.trunc(i / 5) + 1);
          //        alert(scoreFinal);
        }
        scoreFinal = 20 + solution.length - scoreFinal / 2;
        scoreFinal = scoreFinal - this.state.nbMoves;
        scoreFinal = scoreFinal - (this.state.nbTry - 1);
        scoreFinal = Math.round(scoreFinal * 100) / 100;
        this.setState({ alreadyPlayed: false, gameState: 2 });
        this.setData();
      } else {
        this.state.actualButton = buttonFaux;
        this.setState({ buttonValid: 1 });
      }
    }
  };

  render() {
    return (
      <div className="App">
        <table
          class="main"
          style={{
            backgroundImage: `url(${background})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
          }}
        >
          {this.renderBanner()}
          {this.renderPlayZone()}
          {this.state.pauseGame == 1 ? this.renderStartScreen() : null}
          {this.state.pauseGame == 1 ? this.renderUnderStartScreen() : null}
          <tr>
            <td colspan="3">
              {(this.state.gameState > 0) & (this.state.pauseGame != 1) ? (
                <div>
                  {this.state.gameState == 2 ? this.renderShare() : null}
                  {(this.state.gameState == 2) & this.state.alreadyPlayed
                    ? this.renderStats()
                    : null}
                  {whichgame == 0 ? (
                    <div>
                      <div>
                        <DropTarget
                          targetKey="line"
                          onHit={this.hit}
                          dropData={{ idLine: -1 }}
                        >
                          {this.renderBird(0)}
                          {this.renderBird(1)}
                          {this.renderBird(2)}
                          {solution.length > 3 ? this.renderBird(3) : null}
                          {solution.length > 4 ? this.renderBird(4) : null}
                          {solution.length > 5 ? this.renderBird(5) : null}
                        </DropTarget>
                      </div>
                      <div>
                        {this.renderTarget(0)}
                        {this.renderTarget(1)}
                        {this.renderTarget(2)}
                        {solution.length > 3 ? this.renderTarget(3) : null}
                        {solution.length > 4 ? this.renderTarget(4) : null}
                        {solution.length > 5 ? this.renderTarget(5) : null}
                      </div>
                    </div>
                  ) : null}
                  {whichgame == 1 ? (
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
                          {solution.length > 3 ? this.renderChar(3) : null}
                          {solution.length > 4 ? this.renderChar(4) : null}
                          {solution.length > 5 ? this.renderChar(5) : null}
                        </DropTarget>
                      </div>
                      <div align="center">
                        <table class="hotel">
                          <tr bgcolor="000000">
                            <td colspan="4"></td>
                          </tr>
                          <tr bgcolor="a5ccaf" background={stage1}>
                            <td>{this.renderTargetHotel(0, 0)}</td>
                            <td>{this.renderTargetHotel(0, 1)}</td>
                            <td>{this.renderTargetHotel(0, 2)}</td>
                            <td>{this.renderTargetHotel(0, 3)}</td>
                          </tr>
                          <tr bgcolor="000000">
                            <td colspan="4"></td>
                          </tr>
                          <tr bgcolor="9eb6ce" background={stage2}>
                            <td>{this.renderTargetHotel(1, 0)}</td>
                            <td>{this.renderTargetHotel(1, 1)}</td>
                            <td>{this.renderTargetHotel(1, 2)}</td>
                            <td>{this.renderTargetHotel(1, 3)}</td>
                          </tr>
                          <tr bgcolor="000000">
                            <td colspan="4"></td>
                          </tr>
                          <tr bgcolor="bc9cc5" background={stage3}>
                            <td>{this.renderTargetHotel(2, 0)}</td>
                            <td>{this.renderTargetHotel(2, 1)}</td>
                            <td>{this.renderTargetHotel(2, 2)}</td>
                            <td>{this.renderTargetHotel(2, 3)}</td>
                          </tr>
                          <tr bgcolor="000000">
                            <td colspan="4"></td>
                          </tr>
                          <tr bgcolor="ca9e9b" background={stage4}>
                            <td>{this.renderTargetHotel(3, 0)}</td>
                            <td>{this.renderTargetHotel(3, 1)}</td>
                            <td>{this.renderTargetHotel(3, 2)}</td>
                            <td>{this.renderTargetHotel(3, 3)}</td>
                          </tr>
                          <tr bgcolor="000000">
                            <td colspan="4"></td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  ) : null}
                  {(this.state.gameState != -4) & (this.state.buttonValid == 1)
                    ? this.renderButton()
                    : this.renderButtonDisable()}
                </div>
              ) : null}
            </td>
          </tr>
        </table>
      </div>
    );
  }

  renderBanner() {
    return (
      <tr class="top" height={Math.trunc(50 * this.state.adjustBanner)}>
        <td class="top" align="center" valign="bottom" width="20%" height="20%">
          {this.state.sizex > 499 || this.state.pauseGame == 1 ? (
            <img src={logoBankiiiz} width="50px" height="50px" />
          ) : null}
        </td>
        <td align="center" valign="center" width="60%" height="60%">
          {this.state.pauseGame == 1 ? (
            <h4>
              Aujourd'hui,
              <br />
              jouez à...
            </h4>
          ) : (
            <h4>A vous de jouer !</h4>
          )}
        </td>
        <td align="center" width="20%"></td>
      </tr>
    );
  }

  renderPlayZone() {
    return (
      <tr class="card" height={Math.trunc(50 * this.state.adjustBanner)}>
        {this.state.sizex > 499 || this.state.pauseGame == 1 ? (
          <td class="card" align="center" valign="top" width="20%">
            <img src={gammeLogic} width="58px" height="43px" />
            <br />
            <br />
            {this.state.pauseGame == 1 ? (
              <img src={miniGamme} width="50px" height="50px" />
            ) : (
              <img src={logoTodayGame} width="70%" height="70%" />
            )}
          </td>
        ) : (
          <td></td>
        )}
        <td class="card" align="center" valign="top" width="60%">
          {(this.state.helpState == 1) & (this.state.pauseGame == 0)
            ? this.renderHelpBig()
            : null}
          {this.state.pauseGame == 1 ? (
            <div>
              <br />
              <img src={todayGame} width="50%" height="50%" />
            </div>
          ) : (
            <div style={{ position: "relative" }}>
              {this.state.gameState != 0 ? (
                <div>
                  {" "}
                  <h3>
                    <br />
                    <span
                      style={{ position: "absolute", top: "0px", right: "0px" }}
                    >
                      <input
                        type="image"
                        id="imgHelp"
                        src={buttonHelp}
                        onClick={this.clickHelp}
                        width="20%"
                      />
                    </span>
                  </h3>
                  {this.renderCard()}
                </div>
              ) : (
                <h1>Loading...</h1>
              )}
            </div>
          )}
        </td>
        {this.state.sizex > 499 || this.state.pauseGame == 1 ? (
          <td class="card" align="center" valign="top" width="20%">
            {this.state.pauseGame == 1 ? (
              <div>
                <br />
                <br />
                <input
                  type="image"
                  src={buttonBuy}
                  onClick={() =>
                    window.open("https://blackrockgames.fr/boutiques", "_blank")
                  }
                  width="70%"
                  height="70%"
                />
              </div>
            ) : null}
          </td>
        ) : (
          <td></td>
        )}
      </tr>
    );
  }

  renderStartScreen() {
    return (
      <tr class="help">
        <td colspan="3" class="card" align="center" valign="top" width="100%">
          {(this.state.gameState == 0) & !this.state.alreadyPlayed
            ? this.renderHelp()
            : null}
        </td>
      </tr>
    );
  }

  renderUnderStartScreen() {
    return (
      <tr>
        {!this.state.alreadyPlayed ? (
          <td colspan="3" class="card" align="center" valign="top" width="100%">
            <h4>
              Le chrono se met en marche dès que vous lancez le jeu.
              <br />
              Serez-vous le plus rapide ?
            </h4>
            <input
              type="image"
              src={buttonStart}
              onClick={this.clickHelp}
              width="250px"
              height="52px"
            />
          </td>
        ) : (
          <td colspan="3" class="card" align="center" valign="top" width="100%">
            <h4>
              Vous avez déjà joué aujourd'hui.
              <br />
              Voulez-vous rejouer ?
            </h4>
            {this.renderStats()}
            <br />
            <input
              type="image"
              src={buttonStartAgain}
              onClick={() => {
                this.setState({ alreadyPlayed: false });
              }}
              width="250px"
              height="52px"
            />
          </td>
        )}
      </tr>
    );
  }

  renderStats() {
    return (
      <table align="center">
        <tr class="help" align="center">
          <td>
            <h4>Total défis joués</h4>
          </td>
          <td>
            <h4>{nbHist}</h4>
          </td>
        </tr>
        <tr class="help" align="center">
          <td>
            <h4>Temps moyen</h4>
          </td>
          <td>
            <h4>{moyHist}s</h4>
          </td>
        </tr>
        <tr class="help" align="center">
          <td>
            <h4>Série en cours</h4>
          </td>
          <td>
            <h4>{streakHist}</h4>
          </td>
        </tr>
      </table>
    );
  }

  renderMessage(message) {
    return (
      <div>
        <h1>
          <br />
          {message}
        </h1>
      </div>
    );
  }

  renderPause() {
    return (
      <div>
        <form action={"https://" + url} method="get">
          <h1>Inactivité détectée</h1>
          <br />
          <button type="submit" class="submit-btn">
            Recommencer le niveau
          </button>
        </form>
      </div>
    );
  }

  renderHelp() {
    return (
      <div>
        {whichgame == 0 ? (
          <div>
            {this.state.pauseGame == 1 ? <h4>{helpSentence}</h4> : null}
            <img src={rule1} width="25%" height="25%" />
            &nbsp;&nbsp;
            <img src={rule2} width="25%" height="25%" />
            &nbsp;&nbsp;
            <img src={rule3} width="25%" height="25%" />
            &nbsp;&nbsp;
            <img src={rule4} width="25%" height="25%" />
            &nbsp;&nbsp;
            <img src={rule5} width="25%" height="25%" />
            &nbsp;&nbsp;
            <img src={rule6} width="25%" height="25%" />
            &nbsp;&nbsp;
            <img src={rule7} width="25%" height="25%" />
          </div>
        ) : (
          <div>
            {this.state.pauseGame == 1 ? <h4>{helpSentence}</h4> : null}
            <img src={rule10} width="15%" height="15%" />
            &nbsp;&nbsp;
            <img src={rule11} width="15%" height="15%" />
            &nbsp;&nbsp;
            <img src={rule12} width="15%" height="15%" />
            &nbsp;&nbsp;
            <img src={rule13} width="15%" height="15%" />
            &nbsp;&nbsp;
            <img src={rule14} width="15%" height="15%" />
            &nbsp;&nbsp;
            <img src={rule15} width="15%" height="15%" />
            &nbsp;&nbsp;
            <img src={rule16} width="15%" height="15%" />
            &nbsp;&nbsp;
            <img src={rule17} width="15%" height="15%" />
            &nbsp;&nbsp;
            <img src={rule18} width="15%" height="15%" />
            &nbsp;&nbsp;
            <img src={rule19} width="15%" height="15%" />
          </div>
        )}
      </div>
    );
  }

  renderHelpBig() {
    return (
      <table>
        <tr class="help" align="center">
          <td>
            {whichgame == 0 ? (
              <div>
                {this.state.pauseGame == 1 ? <h4>{helpSentence}</h4> : null}
                <img src={rule1} width="40%" height="40%" />
                &nbsp;&nbsp;
                <img src={rule2} width="40%" height="40%" />
                &nbsp;&nbsp;
                <img src={rule3} width="40%" height="40%" />
                &nbsp;&nbsp;
                <img src={rule4} width="40%" height="40%" />
                &nbsp;&nbsp;
                <img src={rule5} width="40%" height="40%" />
                &nbsp;&nbsp;
                <img src={rule6} width="40%" height="40%" />
                &nbsp;&nbsp;
                <img src={rule7} width="40%" height="40%" />
                &nbsp;&nbsp;
                <input
                  type="image"
                  src={buttonHelpClose}
                  onClick={this.clickHelp}
                  width="20%"
                />
              </div>
            ) : (
              <div>
                {this.state.pauseGame == 1 ? <h4>{helpSentence}</h4> : null}
                <img src={rule10} width="30%" height="30%" />
                &nbsp;&nbsp;
                <img src={rule11} width="30%" height="30%" />
                &nbsp;&nbsp;
                <img src={rule12} width="30%" height="30%" />
                &nbsp;&nbsp;
                <img src={rule13} width="30%" height="30%" />
                &nbsp;&nbsp;
                <img src={rule14} width="30%" height="30%" />
                &nbsp;&nbsp;
                <img src={rule15} width="30%" height="30%" />
                &nbsp;&nbsp;
                <img src={rule16} width="30%" height="30%" />
                &nbsp;&nbsp;
                <img src={rule17} width="30%" height="30%" />
                &nbsp;&nbsp;
                <img src={rule18} width="30%" height="30%" />
                &nbsp;&nbsp;
                <img src={rule19} width="30%" height="30%" />
                &nbsp;&nbsp;
                <input
                  type="image"
                  src={buttonHelpClose}
                  onClick={this.clickHelp}
                  width="20%"
                />
              </div>
            )}
          </td>
        </tr>
      </table>
    );
  }

  renderCard() {
    return (
      <img
        src={"https://www.pcspace.com/logicbird/daychallenge/" + lvl + ".png"}
        id="card"
        alt="card"
        draggable="false"
        width="300"
        height="300"
      />
    );
  }

  renderButton() {
    return (
      <div>
        <input
          type="image"
          src={this.state.actualButton}
          onClick={this.checkSol}
          width="50%"
          height="50%"
        />
      </div>
    );
  }

  renderButtonDisable() {
    return (
      <div>
        <img
          id="validButton"
          style={{ opacity: 0.3 }}
          src={this.state.actualButton}
          width="50%"
          height="50%"
        />
      </div>
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
          src={this.state.imageBird[id]}
          id={"bird" + id}
          alt={"bird" + id}
          draggable="false"
          width={Math.trunc(130 * this.state.adjust)}
          height={Math.trunc(130 * this.state.adjust)}
          style={{ opacity: this.state.birds[id] }}
        />
      </DragDropContainer>
    );
  }

  renderChar(id) {
    return (
      <DragDropContainer
        targetKey="pos"
        onDragStart={this.drag}
        onDrop={this.drop}
        dragData={{ idBird: id }}
        noDragging={this.state.birdsDraggable[id]}
      >
        <img
          src={this.state.imageChar[id]}
          id={"bird" + id}
          alt={"bird" + id}
          draggable="false"
          width={Math.trunc(90 * this.state.adjust)}
          height={Math.trunc(90 * this.state.adjust)}
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
            src={this.state.imageBird[this.state.line[id]]}
            id={"line" + id}
            alt={"line" + id}
            draggable="false"
            width={Math.trunc(130 * this.state.adjust)}
            height={Math.trunc(130 * this.state.adjust)}
          />
        </DropTarget>
      </DragDropContainer>
    );
  }

  renderTargetHotel(idLINE, idPOS) {
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
            src={this.state.imageChar[this.state.position[idLINE][idPOS]]}
            id={"pos" + idLINE + idPOS}
            alt={"pos" + idLINE + idPOS}
            draggable="false"
            width={Math.trunc(90 * this.state.adjust)}
            height={Math.trunc(90 * this.state.adjust)}
          />
        </DropTarget>
      </DragDropContainer>
    );
  }

  renderShare() {
    scoreFinal = Math.max(5, scoreFinal);
    var line = "";
    var essais = "";
    var trophy = "";
    for (var i = 0; i < this.state.historicalMoves.length; i++) {
      if (this.state.historicalMoves[i] == 0) line += "🟢";
      if (this.state.historicalMoves[i] == 1) line += "🔴";
      if (this.state.historicalMoves[i] == 2) line += "🔵";
    }
    for (var i = 1; i < this.state.nbTry; i++) essais += "❌";
    essais += "✅";
    if (nbReconnect == 0) trophy = "🏆🏆🏆🏆";
    else trophy = "🏆🏆 🏆🏆";
    var emoticon = "🐦";
    if (whichgame == 1) emoticon = "🧟‍️";
    this.state.textToCopy =
      emoticon +
      " https://defiLogic.bankiiiz.com #" +
      idDefi +
      " " +
      emoticon +
      "\n\r" +
      trophy +
      "\n\r" +
      "⏱" +
      timeFinal +
      "s⏱" +
      "\n\r" +
      this.state.nbTry +
      " tentative(s) : " +
      essais +
      "\n\r" +
      this.state.historicalMoves.length +
      " mouvements : " +
      line;
    return (
      <table align="center">
        <tr class="help" align="center">
          <td>
            <h3>
              {emoticon +
                "https://defilogic.bankiiiz.com #" +
                idDefi +
                emoticon}
              <br />
              {trophy}
              <br />
              {"⏱" + timeFinal + "s⏱"}
              <br />
              {this.state.nbTry + " tentative(s) : " + essais}
              <br />
              {this.state.historicalMoves.length + " mouvements : " + line}
              <br />
              <CopyToClipboard
                text={this.state.textToCopy}
                onCopy={() => this.setState({ copyText: "Texte copié !" })}
              >
                <button>{this.state.copyText}</button>
              </CopyToClipboard>
            </h3>
            <input
              type="image"
              src={buttonBuy}
              onClick={() =>
                window.open("https://blackrockgames.fr/boutiques", "_blank")
              }
              width="30%"
              height="30%"
            />
          </td>
        </tr>
      </table>
    );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
