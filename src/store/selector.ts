// Game Slice Selector

export const selectGameStatus = (state: RootState) => state.game.gameStatus;
export const selectScore = (state: RootState) => state.game.score;
export const selectHighScore = (state: RootState) => state.game.highScore;
export const selectGameSpeed = (state: RootState) => state.game.gameSpeed;
export const selectBirdPosition = (state: RootState) => state.game.birdPosition;
export const selectBirdStatus = (state: RootState) => state.game.birdStatus;
