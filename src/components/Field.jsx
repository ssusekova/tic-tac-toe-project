import styles from './Field.module.css';
import { store } from '../store';
import { useEffect, useState } from 'react';

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

export const Field = () => {
	const [state, setState] = useState(store.getState());

	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			setState(store.getState());
		});

		return unsubscribe;
	}, []);

	const { currentPlayer, field } = state;

	const checkAndSetFieldValue = (index) => {
		if (field[index]) {
			return;
		}

		const newField = [...field];
		newField[index] = currentPlayer;

		store.dispatch({ type: 'SET_FIELD', payload: newField });

		const isCurrentPlayerWinner = WIN_PATTERNS.some(([a, b, c]) => {
			return (
				newField[a] === currentPlayer &&
				newField[b] === currentPlayer &&
				newField[c] === currentPlayer
			);
		});

		if (isCurrentPlayerWinner) {
			store.dispatch({ type: 'SET_IS_GAME_ENDED', payload: true });
			return;
		}

		if (newField.every((item) => item !== '')) {
			store.dispatch({ type: 'SET_IS_DRAW', payload: true });
			return;
		}

		store.dispatch({
			type: 'SET_CURRENT_PLAYER',
			payload: currentPlayer === 'X' ? 'O' : 'X',
		});
	};

	return (
		<div className={styles.fieldContainer}>
			{field.map((item, index) => (
				<button
					key={index}
					className={styles.buttonCell}
					onClick={() => checkAndSetFieldValue(index)}
					disabled={!!item}
				>
					{item}
				</button>
			))}
		</div>
	);
};
