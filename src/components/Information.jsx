import { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Information.module.css';

class InformationClass extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const getStatusOfGame = () => {
			if (this.props.isDraw) return { text: 'Ничья', status: 'draw' };
			if (!this.props.isDraw && this.props.isGameEnded)
				return { text: `Победа: ${this.props.currentPlayer}`, status: 'success' };
			if (!this.props.isDraw && !this.props.isGameEnded)
				return { text: `Ходит: ${this.props.currentPlayer}`, status: 'turn' };
		};
		const { text, status } = getStatusOfGame();

		return (
			<div className={styles.informationContainer}>
				<label className="text-xl font-bold text-center p-10 rounded-20 ">
					{text}
				</label>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	currentPlayer: state.currentPlayer,
	isGameEnded: state.isGameEnded,
	isDraw: state.isDraw,
});

export const Information = connect(mapStateToProps)(InformationClass);
