import { Component } from 'react';
import { connect } from 'react-redux';
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

class FieldClass extends Component {
	constructor(props) {
		super(props);
	}

	checkAndSetFieldValue = (index) => {
		if (this.props.field[index]) {
			return;
		}

		const newField = [...this.props.field];
		newField[index] = this.props.currentPlayer;

		this.props.dispatch(setField(newField));

		const isCurrentPlayerWinner = WIN_PATTERNS.some(([a, b, c]) => {
			return (
				newField[a] === this.props.currentPlayer &&
				newField[b] === this.props.currentPlayer &&
				newField[c] === this.props.currentPlayer
			);
		});

		if (isCurrentPlayerWinner) {
			this.props.dispatch(setIsGameEnded(true));
			return;
		}

		if (newField.every((item) => item !== '')) {
			this.props.dispatch(setIsDraw(true));
			return;
		}

		this.props.dispatch(
			setCurrentPlayer(this.props.currentPlayer === 'X' ? 'O' : 'X'),
		);
	};

	render() {
		return (
			<div className="grid grid-cols-3 gap-2 w-64 mx-auto my-4">
				{this.props.field.map((item, index) => (
					<button
						key={index}
						className="w-16 h-16 text-2xl font-bold border border-gray-400 rounded hover:bg-gray-100 disabled:bg-gray-200 transition"
						onClick={() => this.checkAndSetFieldValue(index)}
						disabled={!!item}
					>
						{item}
					</button>
				))}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	currentPlayer: state.currentPlayer,
	field: state.field,
});

export const Field = connect(mapStateToProps)(FieldClass);
