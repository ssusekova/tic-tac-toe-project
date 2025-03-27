import Confetti from 'react-confetti';
import styles from './Game.module.css';
import { Information } from './components/Information';
import { Field } from './components/Field';
import { store } from './store';
import { useEffect, useState } from 'react';

export const GameContainer = () => {
	const [state, setState] = useState(store.getState());

	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			setState(store.getState());
		});

		return unsubscribe;
	}, []);
	const { isGameEnded } = state;
	return (
		<>
			<Information />
			<Field />
			<div className={styles.restartButtonContainer}>
				<button
					className={styles.restartButton}
					onClick={() => store.dispatch({ type: 'RESET_GAME' })}
				>
					Начать заново
				</button>
			</div>

			{isGameEnded && <Confetti />}
		</>
	);
};
