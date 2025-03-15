let boxes = document.querySelectorAll(".box");

let turn = "X";
let isGameOver = false;

boxes.forEach((element) => {
  element.innerHTML = "";
  element.addEventListener("click", () => {
    if (!isGameOver && element.innerHTML == "") {
      element.innerHTML = turn;
      checkWin();
      checkDraw();
      if (!isGameOver) {
        changeturn();
      }
    }
  });
});

function changeturn() {
  turn = turn === "X" ? "O" : "X";
  document.querySelector(".background").style.left = turn === "X" ? "0" : "90px";
}

function checkWin() {
  let winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winConditions.length; i++) {
    let [a, b, c] = winConditions[i];
    if (boxes[a].innerHTML && boxes[a].innerHTML === boxes[b].innerHTML && boxes[a].innerHTML === boxes[c].innerHTML) {
      isGameOver = true;
      document.querySelector("#results").innerHTML = `${boxes[a].innerHTML} wins!`;
      document.querySelector("#play-again").style.display = "inline";

      // Highlight the winning boxes
      boxes[a].style.backgroundColor = "#C750A7 "; // Green for the win
      boxes[b].style.backgroundColor = "#C750A7 ";
      boxes[c].style.backgroundColor = "#C750A7 ";
      
      return;
    }
  }
}

function checkDraw() {
  if (!isGameOver) {
    let isDraw = [...boxes].every((e) => e.innerHTML !== "");
    if (isDraw) {
      isGameOver = true;
      document.querySelector("#results").innerHTML = "Draw!";
      document.querySelector("#play-again").style.display = "inline";
    }
  }
}

document.querySelector("#play-again").addEventListener("click", () => {
  isGameOver = false;
  turn = "X";
  document.querySelector(".background").style.left = "0";
  document.querySelector("#results").innerHTML = "";
  document.querySelector("#play-again").style.display = "none";

  boxes.forEach((e) => {
    e.innerHTML = "";
    e.style.backgroundColor = ""; // Reset background
    e.style.color = "rgb(0, 230, 255)";
  });
});
