import styles from './Field.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setField, setIsGameEnded, setIsDraw, setCurrentPlayer } from '../actions';

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
	const currentPlayer = useSelector((state) => state.currentPlayer);
	const field = useSelector((state) => state.field);
	const dispatch = useDispatch();

	const checkAndSetFieldValue = (index) => {
		if (field[index]) {
			return;
		}

		const newField = [...field];
		newField[index] = currentPlayer;

		dispatch(setField(newField));

		const isCurrentPlayerWinner = WIN_PATTERNS.some(([a, b, c]) => {
			return (
				newField[a] === currentPlayer &&
				newField[b] === currentPlayer &&
				newField[c] === currentPlayer
			);
		});

		if (isCurrentPlayerWinner) {
			dispatch(setIsGameEnded(true));
			return;
		}

		if (newField.every((item) => item !== '')) {
			dispatch(setIsDraw(true));
			return;
		}

		dispatch(setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X'));
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
