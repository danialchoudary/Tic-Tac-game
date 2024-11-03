const boxes = document.querySelectorAll(".box");
const resetButton = document.querySelector("#reset");
const newGameButton = document.querySelector("#newgame");
const msg = document.querySelector(".msg");
const winnerMsg = document.querySelector("#winner-msg");
const currentTurnDisplay = document.getElementById("current-turn");
const xWinsDisplay = document.getElementById("x-wins");
const oWinsDisplay = document.getElementById("o-wins");
let xWins = 0;
let oWins = 0;
let turnX = true;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
];

const resetGame = () => {
    turnX = true;
    currentTurnDisplay.textContent = "X";
    enable();
    msg.classList.add("hide");
    boxes.forEach(box => box.classList.remove("win-box"));
};

const disable = () => {
    boxes.forEach(box => box.disabled = true);
};

const enable = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("win-box");
    });
};

const showWinner = (winner, pattern) => {
    winnerMsg.innerText = `Winner is ${winner}`;
    msg.classList.remove("hide");
    highlightWinningBoxes(pattern);
    
    if (winner === "X") {
        xWins++;
        xWinsDisplay.textContent = xWins;
    } else {
        oWins++;
        oWinsDisplay.textContent = oWins;
    }
    
    disable();
};

const highlightWinningBoxes = (pattern) => {
    pattern.forEach(index => {
        boxes[index].classList.add("win-box");
    });
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[a].innerText === boxes[c].innerText) {
            showWinner(boxes[a].innerText, pattern);
            return;
        }
    }
};

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        box.innerText = turnX ? "X" : "O";
        currentTurnDisplay.textContent = turnX ? "O" : "X";
        turnX = !turnX;
        box.disabled = true;
        checkWinner();
    });
});

resetButton.addEventListener("click", resetGame);
newGameButton.addEventListener("click", () => {
    xWins = 0;
    oWins = 0;
    xWinsDisplay.textContent = xWins;
    oWinsDisplay.textContent = oWins;
    resetGame();
});
