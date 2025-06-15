import {type ReactNode, useEffect, useState} from "react";
import {useInterval} from "usehooks-ts";
import {AnimatePresence, motion} from "framer-motion";
import PipeImg from "@assets/Pipe.svg";
import styles from "./index.module.scss";
import {useAppDispatch, useAppSelector} from "@/store";
import {selectBirdPosition, selectGameSpeed, selectGameStatus} from "@store/selector.ts";
import {gameOver, incrementScore} from "@store/gameSlice.ts";

function Pipe({validFromTop, id, addAPipe, destroy}: { validFromTop: number, id: string, addAPipe: ()=>void, destroy: ()=>void }) {
    const [pipePosition, setPipePosition] = useState(0)
    const [nextPipeAdded, setNextPipeAdded] = useState(false);
    const gameState = useAppSelector(selectGameStatus);
    const gameSpeed = useAppSelector(selectGameSpeed);

    const birdPosition = useAppSelector(selectBirdPosition);

    const dispatch = useAppDispatch();

    useInterval(
        // gravity
        () => {
            setPipePosition(pipePosition => pipePosition + 1)
            if(pipePosition > 40 && !nextPipeAdded){
                setNextPipeAdded(true)
                addAPipe()
            }
            if (pipePosition > 80) {
                {
                    if (birdPosition < 100 - validFromTop - 12 || birdPosition > 100 - validFromTop + 12) {
                        dispatch(gameOver())
                    }
                }
            }
            if (pipePosition > 95) {
                destroy()
            }
        },
        // Delay in milliseconds or null to stop it
        gameState === 'PLAYING' ? (gameSpeed * 1000) : null,
    )
    return (
        <motion.div className={styles.Pipe}
                    key={id}
                    initial={
                        {
                            right: '0%',
                        }
                    }
                    transition={{
                        duration: gameSpeed,
                        ease: 'linear'
                    }}
                    animate={{
                        right: `${pipePosition}%`,
                        opacity: gameState === 'GAME_OVER' ? 0 : 1
                    }}

        >
            <motion.img className={styles.PipeTop}
                        src={PipeImg}
                        alt={'Top Pipe'}
                        initial={{top: "-100%"}}
                        animate={{top: `-${validFromTop + 10}%`}}
                        transition={{
                            duration: gameSpeed,
                            ease: 'linear'
                        }}
            />
            <motion.img className={styles.PipeBottom}
                        src={PipeImg}
                        alt={'Bottom Pipe'}
                        initial={{rotate: 180, bottom: "-100%"}}
                        animate={{bottom: `-${100 - validFromTop + 10}%`}}
                        transition={{
                            duration: gameSpeed,
                            ease: 'linear'
                        }}
            />
        </motion.div>
    )
}


export default function Pipes() {

    const [pipes, setPipes] = useState<{ id: string, component: ReactNode }[]>([])

    const dispatch = useAppDispatch();

    const removePipe = (id: string) => {
        dispatch(incrementScore())
        setPipes((pipes) => [...pipes.filter(pipe => pipe.id !== id)])
    }

    const addAPipe = () => {
        const _id = Date.now().toString() + pipes.length.toString();
        const _validPos = ((Math.random() < 0.5 ? -1 : 1) * (Math.floor(Math.random() * 20))) + 50;
        setPipes((pipes) => [
            ...pipes,
            {
                id: _id,
                component: <Pipe key={_id} id={_id} validFromTop={_validPos} addAPipe={()=>{addAPipe()}} destroy={() => removePipe(_id)}/>
            }
        ])
    }

    const gameState = useAppSelector(selectGameStatus);

    useEffect(() => {
        if (gameState === 'GAME_OVER')
            setPipes([])
        else if (gameState === 'PLAYING' && pipes.length === 0) {
            addAPipe()
        }
    }, [gameState]);

    return (
        <div className={styles.Pipes}>
            <AnimatePresence>
                {pipes.map(pipe => pipe.component)}
            </AnimatePresence>
        </div>
    )
}
