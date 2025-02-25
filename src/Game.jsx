import { useState } from 'react';
import Confetti from 'react-confetti';
import PropTypes from 'prop-types';
import styles from './Game.module.css';
import { InformationContainer as Information } from './components/Information';
import { FieldContainer as Field } from './components/Field';

const WIN_PATTERNS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8], // Варианты побед по горизонтали
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8], // Варианты побед по вертикали
	[0, 4, 8],
	[2, 4, 6], // Варианты побед по диагонали
];

export const GameContainer = () => {
	const [currentPlayer, setCurrentPlayer] = useState('X');
	const [isGameEnded, setIsGameEnded] = useState(false);
	const [isDraw, setIsDraw] = useState(false);
	const [field, setField] = useState(['', '', '', '', '', '', '', '', '']);

	const resetGame = () => {
		setCurrentPlayer('X');
		setIsGameEnded(false);
		setIsDraw(false);
		setField(['', '', '', '', '', '', '', '', '']);
	};

	return (
		<GameLayout
			currentPlayer={currentPlayer}
			isDraw={isDraw}
			isGameEnded={isGameEnded}
			field={field}
			setCurrentPlayer={setCurrentPlayer}
			setIsGameEnded={setIsGameEnded}
			setIsDraw={setIsDraw}
			setField={setField}
			resetGame={resetGame}
		/>
	);
};

const GameLayout = ({
	currentPlayer,
	isDraw,
	isGameEnded,
	field,
	setCurrentPlayer,
	setIsGameEnded,
	setIsDraw,
	setField,
	resetGame,
}) => {
	return (
		<>
			<Information
				currentPlayer={currentPlayer}
				isDraw={isDraw}
				isGameEnded={isGameEnded}
			/>
			<Field
				currentPlayer={currentPlayer}
				field={field}
				WIN_PATTERNS={WIN_PATTERNS}
				setCurrentPlayer={setCurrentPlayer}
				setIsGameEnded={setIsGameEnded}
				setIsDraw={setIsDraw}
				setField={setField}
			/>
			<div className={styles.restartButtonContainer}>
				<button className={styles.restartButton} onClick={resetGame}>
					Начать заново
				</button>
			</div>

			{isGameEnded && <Confetti />}
		</>
	);
};

GameLayout.propTypes = {
	currentPlayer: PropTypes.string,
	isDraw: PropTypes.bool,
	isGameEnded: PropTypes.bool,
	field: PropTypes.array,
	setCurrentPlayer: PropTypes.func,
	setIsGameEnded: PropTypes.func,
	setIsDraw: PropTypes.func,
	setField: PropTypes.func,
	resetGame: PropTypes.func,
};
