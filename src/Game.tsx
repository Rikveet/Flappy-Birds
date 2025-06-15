import styles from './Game.module.css'
import Engine from "@components/Engine";
import Background from "@components/Background";

export default function Game() {
    return (
        <div className={styles.Wrapper}>
            <div className={styles.Container}>
                <Engine/>
                <Background/>
            </div>
        </div>
    )
}
