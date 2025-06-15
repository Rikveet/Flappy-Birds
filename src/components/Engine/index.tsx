import {useEffect} from "react";
import {useInterval} from "usehooks-ts";
import {motion} from "framer-motion";
import BirdFall from "@assets/BirdFall.webp";
import BirdFlap from "@assets/BirdFlap.webp";
import BirdFloat from "@assets/BirdFloat.webp";
import styles from './index.module.scss';
import {useAppDispatch, useAppSelector} from "@/store";
import {selectBirdPosition, selectGameSpeed, selectGameStatus} from "@store/selector.ts";
import {fall, jump, pauseGame, startGame} from "@store/gameSlice.ts";
import Pipes from "@components/Pipes";
import Menu from "@components/Menu";

export default function Engine() {

    const gameState = useAppSelector(selectGameStatus)
    const gameSpeed = useAppSelector(selectGameSpeed);
    const birdPosition = useAppSelector(selectBirdPosition);
    const direction = useAppSelector(state => state.game.birdStatus);

    const dispatch = useAppDispatch();

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (gameState === 'GAME_OVER')
                return
            if (e.key === ' ') {
                e.preventDefault();
                dispatch(jump())
            }
            if (e.key === 'Escape') {
                e.preventDefault();
                if (gameState === 'PAUSED')
                    dispatch(startGame())
                else
                    dispatch(pauseGame())
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return function cleanup() {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, []);

    useInterval(
        // gravity
        () => {
            dispatch(fall())
        },
        // Delay in milliseconds or null to stop it
        gameState === 'PLAYING' ? gameSpeed * 1000 : null,
    )


    return (
        <div className={styles.GameEngine}>
            <motion.div
                className={styles.Interactive}
                onClick={() => {
                    dispatch(jump())
                }}
            />
            <motion.img
                className={styles.Bird}
                src={direction === 'JUMPING' ? BirdFlap : direction === 'GLIDING' ? BirdFloat : BirdFall}
                alt={'Bird'}
                animate={{
                    top: `${birdPosition}%`,
                    rotate: direction === 'JUMPING' ? -20 : direction === 'GLIDING' || direction === 'DEAD' ? 0 : 20,
                    opacity: gameState === 'GAME_OVER' ? 0 : 1
                }}
                transition={{
                    duration: gameSpeed,
                    ease: 'linear'
                }}
            />
            <Menu/>
            <Pipes/>
        </div>
    )
}