import PropTypes from 'prop-types';
import styles from './Field.module.css';

export const FieldContainer = ({
	currentPlayer,
	field,
	WIN_PATTERNS,
	setCurrentPlayer,
	setIsGameEnded,
	setIsDraw,
	setField,
}) => {
	const checkAndSetFieldValue = (index) => {
		if (field[index]) {
			return;
		}

		const newField = [...field];
		newField[index] = currentPlayer;

		setField(newField);

		const isCurrentPlayerWinner = WIN_PATTERNS.some(([a, b, c]) => {
			return (
				newField[a] === currentPlayer &&
				newField[b] === currentPlayer &&
				newField[c] === currentPlayer
			);
		});

		if (isCurrentPlayerWinner) {
			setIsGameEnded(true);
			return;
		}

		if (newField.every((item) => item !== '')) {
			setIsDraw(true);
			return;
		}

		setCurrentPlayer((prevPlayer) => (prevPlayer === 'X' ? 'O' : 'X'));
	};

	return <FieldLayout field={field} checkAndSetFieldValue={checkAndSetFieldValue} />;
};

const FieldLayout = ({ field, checkAndSetFieldValue }) => {
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

FieldContainer.propTypes = {
	currentPlayer: PropTypes.string,
	field: PropTypes.array,
	WIN_PATTERNS: PropTypes.array,
	setCurrentPlayer: PropTypes.func,
	setIsGameEnded: PropTypes.func,
	setIsDraw: PropTypes.func,
	setField: PropTypes.func,
};

FieldLayout.propTypes = {
	field: PropTypes.array,
	checkAndSetFieldValue: PropTypes.func,
};
