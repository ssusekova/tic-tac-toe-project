export const SET_CURRENT_PLAYER = 'SET_CURRENT_PLAYER';
export const SET_IS_GAME_ENDED = 'SET_IS_GAME_ENDED';
export const SET_IS_DRAW = 'SET_IS_DRAW';
export const SET_FIELD = 'SET_FIELD';
export const RESET_GAME = 'RESET_GAME';

export const setCurrentPlayer = (player) => ({
	type: SET_CURRENT_PLAYER,
	payload: player,
});

export const setIsGameEnded = (ended) => ({
	type: SET_IS_GAME_ENDED,
	payload: ended,
});

export const setIsDraw = (isDraw) => ({
	type: SET_IS_DRAW,
	payload: isDraw,
});

export const setField = (field) => ({
	type: SET_FIELD,
	payload: field,
});

export const resetGame = () => ({
	type: RESET_GAME,
});
