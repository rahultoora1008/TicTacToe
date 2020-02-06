const X_CLASS = 'x';
const O_CLASS = 'o';

const WINNING_COMBINATIONS = [
	[ 0, 1, 2 ],
	[ 3, 4, 5 ],
	[ 6, 7, 8 ],
	[ 0, 3, 6 ],
	[ 1, 4, 7 ],
	[ 2, 5, 8 ],
	[ 0, 4, 8 ],
	[ 2, 4, 6 ]
];

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMsgElement = document.getElementById('winningMessage');
const winningMsgTxtElement = document.querySelector('[data-winning-message-text]');
const restartButton = document.getElementById('restartButton');

let oTurn;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
	oTurn = false;
	cellElements.forEach((cell) => {
		cell.classList.remove(X_CLASS);
		cell.classList.remove(O_CLASS);
		cell.removeEventListener('click', handleClick);
		cell.addEventListener('click', handleClick, { once: true });
	});
	setBoardHoverClass();

	// setting restart Button
	winningMsgElement.classList.remove('show');
}

function handleClick(e) {
	const cell = e.target;
	const currentClass = oTurn ? O_CLASS : X_CLASS;
	//Place the Mark
	placeMark(cell, currentClass);

	// Check for Win
	if (checkWin(currentClass)) {
		endGame(false);
	} else if (isDraw()) {
		// Check for Draw
		endGame(true);
	} else {
		// Switch turns
		swapTurns();
		setBoardHoverClass();
	}
}

function endGame(draw) {
	if (draw) {
		winningMsgTxtElement.innerText = 'Draw';
	} else {
		winningMsgTxtElement.innerText = `${oTurn ? 'O' : 'X'} Wins`;
	}
	winningMsgElement.classList.add('show');
}

function isDraw() {
	return [ ...cellElements ].every((cell) => {
		return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
	});
}

function placeMark(cell, currentClass) {
	cell.classList.add(currentClass);
}

function swapTurns() {
	oTurn = !oTurn;
}

function setBoardHoverClass() {
	board.classList.remove(X_CLASS);
	board.classList.remove(O_CLASS);
	if (oTurn) {
		board.classList.add(O_CLASS);
	} else {
		board.classList.add(X_CLASS);
	}
}

function checkWin(currentClass) {
	// if every single cell inside of the combinations is correct for at least
	// one of the WINNING_COMBINATIONS then it's a win
	return WINNING_COMBINATIONS.some((combinations) => {
		return combinations.every((index) => {
			return cellElements[index].classList.contains(currentClass);
		});
	});
}
