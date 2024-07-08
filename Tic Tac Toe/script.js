
const board = document.querySelector('#board');
const cells = document.querySelectorAll('.cell');
const messageElement = document.querySelector('#message');
const restartButton = document.querySelector('#restartButton');
let xTurn = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleClick = (e) => {
    const cell = e.target;
    const currentClass = xTurn ? 'x' : 'o';
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
        updateMessage();
    }
};

const placeMark = (cell, currentClass) => {
    cell.classList.add(currentClass);
    cell.innerText = currentClass.toUpperCase();
};

const swapTurns = () => {
    xTurn = !xTurn;
};

const setBoardHoverClass = () => {
    board.classList.remove('x');
    board.classList.remove('o');
    if (xTurn) {
        board.classList.add('x');
    } else {
        board.classList.add('o');
    }
};

const checkWin = (currentClass) => {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
};

const isDraw = () => {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o');
    });
};

const endGame = (draw) => {
    if (draw) {
        messageElement.innerText = 'Draw!';
    } else {
        messageElement.innerText = `${xTurn ? "X" : "O"} Wins!`;
    }
};

const restartGame = () => {
    cells.forEach(cell => {
        cell.classList.remove('x');
        cell.classList.remove('o');
        cell.innerText = '';
    });
    xTurn = true;
    setBoardHoverClass();
    messageElement.innerText = `X's turn`;
};

const updateMessage = () => {
    messageElement.innerText = `${xTurn ? "X" : "O"}'s turn`;
};

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

restartButton.addEventListener('click', () => {
    restartGame();
    cells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
});

setBoardHoverClass();
updateMessage();
