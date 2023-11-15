/**
 * Rock, Paper, Scissors Application
 * @class AP Comp Sci
 */

// player 1

var p1 = {
  name: "",
  choice: "",
};

// player 2

var p2 = {
  name: "",
  choice: "",
};

var winner;

// Current Player

var currentPlayer;

// Display helpers

var hideStartUI = function () {
  hideElement("image");
  hideElement("p1Input");
  hideElement("p2Input");
  hideElement("p1Name");
  hideElement("p2Name");
  hideElement("desc");
  hideElement("playBtn");
};

var showStartUI = function () {
  setText("jumbotron", "Rock, Paper, Scissors");
  showElement("image");
  showElement("p1Input");
  showElement("p2Input");
  showElement("p1Name");
  showElement("p2Name");
  showElement("desc");
  showElement("playBtn");
};

var hidePlayUI = function () {
  hideElement("rBtn");
  hideElement("pBtn");
  hideElement("sBtn");
  hideElement("rTxt");
  hideElement("pTxt");
  hideElement("sTxt");
  hideElement("chooseBtn");
};

var showPlayUI = function () {
  setText("jumbotron", currentPlayer.name + "'s Turn");
  showElement("rBtn");
  showElement("pBtn");
  showElement("sBtn");
  showElement("rTxt");
  showElement("pTxt");
  showElement("sTxt");
  showElement("chooseBtn");
};

var hideResultsUI = function () {
  hideElement("rematchBtn");
  hideElement("quitBtn");
};

var showResultsUI = function () {
  showElement("rematchBtn");
  showElement("quitBtn");
};

// Rematch helper

var rematch = function () {
  currentPlayer = p1;

  p1.choice = "";
  p2.choice = "";
  winner = {};

  hideStartUI();
  hideResultsUI();
  showPlayUI();
};

// Quit helper

var quit = function () {
  hidePlayUI();
  hideResultsUI();
  showStartUI();
};

// Start helper

var start = function () {
  quit();
};

// Play handler

onEvent("playBtn", "click", function () {
  // set intial player to the first player
  currentPlayer = p1;

  // set their names to what was typed in the inputs
  p1.name = getText("p1Input");
  p2.name = getText("p2Input");

  // if the player didnt' add a name, we set the name to a default
  if (p1.name.length == 0) {
    p1.name = "Player 1";
  }
  if (p2.name.length == 0) {
    p2.name = "Player 2";
  }

  // Set UI
  hideStartUI();
  hideResultsUI();
  showPlayUI();
});

// Option buttons Rock/Paper/Scissors

onEvent("rBtn", "click", function () {
  currentPlayer.choice = "rock";
});

onEvent("pBtn", "click", function () {
  currentPlayer.choice = "paper";
});

onEvent("sBtn", "click", function () {
  currentPlayer.choice = "scissors";
});

// Choose handler

onEvent("chooseBtn", "click", function () {
  if (currentPlayer == p1) {
    currentPlayer = p2;
    setText("jumbotron", currentPlayer.name + "'s Turn");
  } else if (currentPlayer == p2) {
    showResults();
  }
});

// Show results helper

var showResults = function () {
  // Manage UI
  hideStartUI();
  hidePlayUI();
  showResultsUI();

  // Calculate Winner
  if (p1.choice == p2.choice) {
    winner = "Draw";
  } else if (p1.choice == "rock") {
    if (p2.choice == "paper") {
      winner = p2;
    } else {
      winner = p1;
    }
  } else if (p1.choice == "paper") {
    if (p2.choice == "scissors") {
      winner = p2;
    } else {
      winner = p1;
    }
  } else if (p1.choice == "scissors") {
    if (p2.choice == "rock") {
      winner = p2;
    } else {
      winner = p1;
    }
  }

  // Set winner
  if (winner == "Draw" || !p1.choice || !p2.choice) {
    setText("jumbotron", "⚖️ Draw ⚖️");
  } else {
    setText("jumbotron", "👑 " + winner.name + " Wins 👑");
  }
};

// Rematch handler

onEvent("rematchBtn", "click", rematch);

// Quit handler

onEvent("quitBtn", "click", quit);

// Let's begin...

start();
