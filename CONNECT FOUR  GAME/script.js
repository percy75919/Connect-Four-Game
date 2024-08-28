const ROWS = 6;
const COLS = 7;
const board = [];
let currentPlayer = 'blue';
let gameOver = false;
const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('resetButton');
function createBoard() {
    for (let row = 0; row < ROWS; row++) {
        board[row] = [];
        for (let col = 0; col < COLS; col++) {
            board[row][col] = null;
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.col = col;
            cell.addEventListener('click', () => dropPiece(col));
            boardElement.appendChild(cell);
        }
    }
}
function dropPiece(col) {
    if (gameOver) return;
    for (let row = ROWS - 1; row >= 0; row--) {
        if (!board[row][col]) {
            board[row][col] = currentPlayer;
            const cell = boardElement.children[row * COLS + col];
            cell.classList.add(currentPlayer);
            if (checkWin(row, col)) {
                gameOver = true;
                messageElement.textContent = `${currentPlayer.toUpperCase()} wins!`;
            } else if (checkDraw()) {
                gameOver = true;
                messageElement.textContent = "It's a draw!";
            } else {
                currentPlayer = currentPlayer === 'blue' ? 'pink' : 'blue';
            }
            return;
        }
    }
}
function checkWin(row, col) {
    const directions = [
        [0, 1], [1, 0], [1, 1], [1, -1]
    ];
    for (const [dx, dy] of directions) {
        let count = 1;
        count += countDirection(row, col, dx, dy);
        count += countDirection(row, col, -dx, -dy);
        if (count >= 4) return true;
    }
    return false;
}
function countDirection(row, col, dx, dy) {
    let count = 0;
    let r = row + dx;
    let c = col + dy;
    while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === currentPlayer) {
        count++;
        r += dx;
        c += dy;
    }
    return count;
}
function checkDraw() {
    return board.every(row => row.every(cell => cell !== null));
}
function resetGame() {
    board.forEach(row => row.fill(null));
    Array.from(boardElement.children).forEach(cell => {
        cell.classList.remove('blue', 'pink');
    });
    currentPlayer = 'blue';
    gameOver = false;
    messageElement.textContent = '';
}
createBoard();
resetButton.addEventListener('click', resetGame);