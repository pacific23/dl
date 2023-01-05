import React from "react";
import ReactDOM from "react-dom";
import Cookies from "universal-cookie";

import "./styles.css";

import Header from "./Header";
import Start from "./Start";
import Play from "./Play";
import Victory from "./Victory";

import backgroundBirds from "./images/BackgroundBirds.jpg";
import backgroundHotel from "./images/BackgroundHotel.jpg";

const cookies = new Cookies();
const queryParams = new URLSearchParams(window.location.search);

var userID = "";
var idDefi = 0;
var lvl = "";
var solution = "";
var nbReconnect = 0;
var whichgame = 0; // 0 : Birds / 1 : Hotel / 2 : Jungle
var background = backgroundBirds;
var nbHist = 0;
var moyHist = 0;
var streakHist = 0;
var timeStart;
var timeFinal;
var scoreFinal;
var emoticon = "";
var trophy = "";
var essais = "";
var lineMvt = "";

class App extends React.Component {
  state = {
    sizex: 0,
    adjust: 1,
    adjustBanner: 1,
    gameState: 0, // 0 : loading / 1 : start / 2 : game / 3 : endoflevel
    helpState: 1,
    alreadyPlayed: false,
    historicalMoves: [], // 0 : correct move, 1 : neutral move, 2 : incorrectMove
    nbMoves: 0,
    nbTry: 0,
    textToCopy: ""
  };

  componentDidMount() {
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

  resize() {
    this.state.sizex = window.innerWidth;
    this.setState({
      adjustBanner: Math.max(this.state.sizex / 800, 1)
    });
    if (solution.length === 0) return;
    this.setState({
      adjust: Math.min(this.state.sizex / (130 * solution.length + 60), 1)
    });
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

  getPredata() {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("load", () => {
      var data = xhr.responseText;
      var jsonResponse = JSON.parse(data);
      whichgame = jsonResponse["whichgame"];
      if (jsonResponse["status"] == "ok") {
        if (whichgame === 0) {
          background = backgroundBirds;
        }
        if (whichgame === 1) {
          background = backgroundHotel;
        }
        nbHist = jsonResponse["nb"];
        moyHist = jsonResponse["moy"];
        streakHist = jsonResponse["streak"];
        this.setState({ alreadyPlayed: jsonResponse["played"] == "yes" });
      }
      this.resize();
      if (this.state.gameState === 0) this.setState({ gameState: 1 });
    });
    var futur = "";
    if (queryParams.get("f") > 0) {
      futur = "&f=" + queryParams.get("f");
    }
    xhr.open(
      "GET",
      "https://www.pcspace.com/logicbird/getDayChallenge.php?uuid=" +
        userID +
        "&ask=1" +
        futur
    );
    xhr.send();
  }

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
        if (whichgame === 0) {
          background = backgroundBirds;
        }
        if (whichgame === 1) {
          background = backgroundHotel;
        }
        this.setState({ gameState: 2, historicalMoves: [] });
        this.startChrono();
      }
      this.resize();
    });
    var futur = "";
    if (queryParams.get("f") > 0) {
      futur = "&f=" + queryParams.get("f");
    }

    xhr.open(
      "GET",
      "https://www.pcspace.com/logicbird/getDayChallenge.php?uuid=" +
        userID +
        futur
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

  startChrono() {
    timeStart = new Date().getTime();
  }

  play() {
    this.getData();
  }

  addHistoricalMove(value) {
    this.state.historicalMoves.push(value);
  }

  addMove() {
    this.state.nbMoves++;
  }

  addTry() {
    this.state.nbTry++;
  }

  victory() {
    timeFinal = parseInt((new Date().getTime() - timeStart) / 1000, 10);
    scoreFinal = -1;
    for (var i = 0; i <= timeFinal; i++) {
      scoreFinal = scoreFinal + 1 / (Math.trunc(i / 5) + 1);
      //        alert(scoreFinal);
    }
    scoreFinal = 20 + solution.length - scoreFinal / 2;
    scoreFinal = scoreFinal - this.state.nbMoves;
    scoreFinal = scoreFinal - (this.state.nbTry - 1);
    scoreFinal = Math.round(scoreFinal * 100) / 100;
    this.setState({ alreadyPlayed: false, gameState: 3 });
    this.setData();

    scoreFinal = Math.max(5, scoreFinal);
    lineMvt = "";
    essais = "";
    trophy = "";
    for (var j = 0; j < this.state.historicalMoves.length; j++) {
      if (this.state.historicalMoves[j] == 0) lineMvt += "🟢";
      if (this.state.historicalMoves[j] == 1) lineMvt += "🔴";
      if (this.state.historicalMoves[j] == 2) lineMvt += "🔵";
    }
    for (var k = 1; k < this.state.nbTry; k++) essais += "❌";
    essais += "✅";
    if (nbReconnect == 0) trophy = "🏆🏆🏆🏆";
    else trophy = "🏆🏆 🏆🏆";
    this.state.emoticon = "🐦";
    if (whichgame == 1) emoticon = "🧟‍️";
    this.state.textToCopy =
      this.state.emoticon +
      " https://defiLogic.bankiiiz.com #" +
      idDefi +
      " " +
      this.state.emoticon +
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
      lineMvt;
  }

  render() {
    return (
      <div className="App">
        <table
          className="main"
          style={{
            backgroundImage: `url(${background})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
          }}
        >
          <tbody>
            <tr>
              <td>
                <Header
                  sizex={this.state.sizex}
                  adjustBanner={this.state.adjustBanner}
                  gameState={this.state.gameState}
                />
                {this.state.gameState === 1 ? (
                  <Start
                    gameState={this.state.gameState}
                    alreadyPlayed={this.state.alreadyPlayed}
                    whichgame={whichgame}
                    onStartAgain={() => {
                      this.setState({ alreadyPlayed: false });
                    }}
                    play={() => {
                      this.play();
                    }}
                    nbHist={nbHist}
                    moyHist={moyHist}
                    streakHist={streakHist}
                  />
                ) : null}
                {this.state.gameState === 2 ? (
                  <Play
                    whichgame={whichgame}
                    adjustBanner={this.state.adjustBanner}
                    sizex={this.state.sizex}
                    lvl={lvl}
                    solution={solution}
                    adjust={this.state.adjust}
                    addHistoricalMove={(value) => {
                      this.addHistoricalMove(value);
                    }}
                    addMove={() => this.addMove()}
                    addTry={() => this.addTry()}
                    victory={() => this.victory()}
                  />
                ) : null}
                {this.state.gameState === 3 ? (
                  <Victory
                    whichgame={whichgame}
                    adjustBanner={this.state.adjustBanner}
                    sizex={this.state.sizex}
                    lvl={lvl}
                    emoticon={emoticon}
                    idDefi={idDefi}
                    trophy={trophy}
                    timeFinal={timeFinal}
                    essais={essais}
                    lineMvt={lineMvt}
                    historicalMoves={this.state.historicalMoves}
                    nbTry={this.state.nbTry}
                    textToCopy={this.state.textToCopy}
                    nbHist={nbHist}
                    moyHist={moyHist}
                    streakHist={streakHist}
                  />
                ) : null}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
