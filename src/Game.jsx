import Confetti from 'react-confetti';
import styles from './Game.module.css';
import { Information } from './components/Information';
import { Field } from './components/Field';
import { useSelector, useDispatch } from 'react-redux';
import { resetGame } from './actions';

export const GameContainer = () => {
	const isGameEnded = useSelector((state) => state.isGameEnded);
	const dispatch = useDispatch();
	return (
		<>
			<Information />
			<Field />
			<div className={styles.restartButtonContainer}>
				<button
					className={styles.restartButton}
					onClick={() => dispatch(resetGame())}
				>
					Начать заново
				</button>
			</div>

			{isGameEnded && <Confetti />}
		</>
	);
};
