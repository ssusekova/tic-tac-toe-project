import styles from './Information.module.css';
import { store } from '../store';
import { useEffect, useState } from 'react';

export const Information = () => {
	const [state, setState] = useState(store.getState());

	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			setState(store.getState());
		});

		return unsubscribe;
	}, []);

	const { currentPlayer, isGameEnded, isDraw } = state;

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
