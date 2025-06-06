import styles from './Information.module.css';
import { useSelector } from 'react-redux';

export const Information = () => {
	const currentPlayer = useSelector((state) => state.currentPlayer);
	const isGameEnded = useSelector((state) => state.isGameEnded);
	const isDraw = useSelector((state) => state.isDraw);
	console.log(isDraw);

	const getStatusOfGame = () => {
		if (isDraw) return { text: 'Ничья', status: 'draw' };
		if (!isDraw && isGameEnded)
			return { text: `Победа: ${currentPlayer}`, status: 'success' };
		if (!isDraw && !isGameEnded)
			return { text: `Ходит: ${currentPlayer}`, status: 'turn' };
	};

	const { text, status } = getStatusOfGame();
	return (
		<div className={styles.informationContainer}>
			<label className={`${styles.informationLabel} ${styles[status]}`}>
				{text}
			</label>
		</div>
	);
};
