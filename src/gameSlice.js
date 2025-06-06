import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentPlayer: 'X',
	isGameEnded: false,
	isDraw: false,
	field: ['', '', '', '', '', '', '', '', ''],
};

const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		setCurrentPlayer: (state, action) => {
			state.currentPlayer = action.payload;
		},
		setIsGameEnded: (state, action) => {
			state.isGameEnded = action.payload;
		},
		setIsDraw: (state, action) => {
			state.isDraw = action.payload;
		},
		setField: (state, action) => {
			state.field = action.payload;
		},
		resetGame: () => {
			return initialState;
		},
	},
});

export const { setCurrentPlayer, setIsGameEnded, setIsDraw, setField, resetGame } =
	gameSlice.actions;

export default gameSlice.reducer;
