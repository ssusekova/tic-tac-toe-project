import PropTypes from 'prop-types';
import styles from './Information.module.css';

export const InformationContainer = ({ currentPlayer, isDraw, isGameEnded }) => {
	const getStatusOfGame = () => {
		if (isDraw) return { text: 'Ничья', status: 'draw' };
		if (!isDraw && isGameEnded)
			return { text: `Победа: ${currentPlayer}`, status: 'success' };
		if (!isDraw && !isGameEnded)
			return { text: `Ходит: ${currentPlayer}`, status: 'turn' };
	};

	const { text, status } = getStatusOfGame();
	return <InformationLayout textOfStatus={text} status={status} />;
};

const InformationLayout = ({ textOfStatus, status }) => {
	return (
		<div className={styles.informationContainer}>
			<label className={`${styles.informationLabel} ${styles[status]}`}>
				{textOfStatus}
			</label>
		</div>
	);
};

InformationContainer.propTypes = {
	currentPlayer: PropTypes.string,
	isDraw: PropTypes.bool,
	isGameEnded: PropTypes.bool,
};

InformationLayout.propTypes = {
	textOfStatus: PropTypes.string,
	status: PropTypes.oneOf(['draw', 'success', 'turn']),
};
