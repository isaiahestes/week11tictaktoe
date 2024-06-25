// Using any of the tools you've worked with so far, create a game of Tic-Tac-Toe.
// Create a Tic-Tac-Toe game grid using your HTML element of choice.
// When a cell in the grid is clicked, an X or O should appear in that spot depending on whose turn it is.
// A heading should say whether it is X's or O's turn and change with each move made.
// A button should be available to clear the grid and restart the game.
// When a player has won, or the board is full and the game results in a draw, a Bootstrap alert or similar Bootstrap component should appear across the screen announcing the winner.
let circleTurn;
const squareElements = document.querySelectorAll('[data-square]');
const turn = document.getElementById('turn');
const restartButton = document.getElementById('restartButton');
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
// Calls the start of the game
startGame();

restartButton.addEventListener('click', startGame);
// Sets the board back to the starting point
function startGame() {
    circleTurn = false;
    squareElements.forEach(square => {
        square.classList.remove('x');
        square.classList.remove('o');
        square.classList.add("hover");
        square.innerText ="";
        square.removeEventListener('click', handleClick);
        square.addEventListener('click', handleClick, { once: true });
    });
    turn.innerText = `Shredder's Turn`;
}
// This defines what happens when you click on a square
function handleClick(e) {
    const square = e.target;
    const currentPlayer = circleTurn ? 'o' : 'x';
    placeMark(square, currentPlayer);
    if (checkWin(currentPlayer)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        circleTurn = !circleTurn;
        turn.innerText = `${circleTurn ? "Mikey's" : "Shredder's"} Turn`;
    }
}
// This is what happens when the game is over
function endGame(draw) {
    if (draw) {
        turn.innerText = "Draw!";
    } else {
        turn.innerText = `${circleTurn ? "Mikey" : "Shredder"} Wins!`;
    }
    showEndMessage(draw);
}
// Checks if its a draw
function isDraw() {
    return [...squareElements].every(square => {
        return square.classList.contains('x') || square.classList.contains('o');
    });
}
// Tells it what mark to place in the square that has been clicked
function placeMark(square, currentPlayer) {
    square.classList.add(currentPlayer);
    square.classList.remove("hover");
    square.innerText = currentPlayer;
}
// Checks to see if the last mark made someone win
function checkWin(currentPlayer) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return squareElements[index].classList.contains(currentPlayer);
        });
    });
}

// this tells it what to do when someone wins
function showEndMessage(draw) {
    const message = draw ? "It's a draw!" : `${circleTurn ? "Mikey" : "Shredder"} has won!`;
    const alertBox = document.createElement('div');
    alertBox.className = 'alert alert-info mt-3';
    alertBox.textContent = message;
    document.body.appendChild(alertBox);
    setTimeout(() => alertBox.remove(), 3000);
}

