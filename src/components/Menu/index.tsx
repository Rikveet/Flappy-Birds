import {motion} from "framer-motion";
import styles from "./index.module.scss";
import {resetGame, startGame} from "@store/gameSlice.ts";
import {useAppDispatch, useAppSelector} from "@/store";
import {selectGameStatus, selectHighScore, selectScore} from "@store/selector.ts";

export default function Menu(){
    const score = useAppSelector(selectScore)
    const highScore = useAppSelector(selectHighScore)
    const gameState = useAppSelector(selectGameStatus)
    const dispatch = useAppDispatch();

    return(
        <motion.div
            layout={true}
            className={styles.Menu}
            animate={{
                top: gameState !== 'PLAYING' ? '50%' : '5px',
                left: gameState !== 'PLAYING' ? '50%' : '5px',
                x: gameState !== 'PLAYING' ? '-50%' : '0%',
                y: gameState !== 'PLAYING' ? '-50%' : '0%',
                fontSize: gameState !== 'PLAYING' ? '20px' : '15px',
                background: gameState !== 'PLAYING' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.25)',
                backdropFilter: gameState !== 'PLAYING' ? 'blur(5px)' : 'blur(0px)',
                zIndex: gameState !== 'PLAYING' ? 10 : 3,
                color: gameState !== 'PLAYING' ? 'rgb(50,50,50)' : 'rgb(60,60,60)',
            }}
            transition={{
                duration: 1,
                ease: 'easeInOut'
            }}
        >
            <motion.div  className={styles.Title}>
                <div>
                    {gameState === 'PAUSED' ? 'Paused' : gameState === 'GAME_OVER' ? 'Game Over' : 'Flappy Birds'}
                </div>

            </motion.div>
            <motion.div className={styles.Score}>
                <div>Score:</div>
                &ensp;
                <div>{score}</div>
            </motion.div>
            <motion.div className={styles.Score}>
                <div>High Score:</div>
                &ensp;
                <div>{highScore}</div>
            </motion.div>

            <motion.button
                className={styles.MenuButton}
                onClick={() => {
                    if (gameState === 'GAME_OVER')
                        dispatch(resetGame())
                    dispatch(startGame())
                }}
                animate={
                    {
                        display:  gameState !== 'PLAYING' ? 'block' : 'none',
                        scale: gameState !== 'PLAYING' ? 1 : 0,
                        opacity: gameState !== 'PLAYING' ? 1 : 0,
                        background: 'rgba(150,150,150,0.5)',
                    }
                }
                whileHover={{scale: 0.95}}
            >
                {gameState === 'PAUSED' ? 'Resume' : gameState === 'GAME_OVER' ? 'Restart' : 'Start'}
            </motion.button>
        </motion.div>
    )
}