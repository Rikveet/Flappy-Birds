import {useState} from "react";
import {useInterval} from "usehooks-ts";
import styles from "./index.module.scss";
import {AnimatePresence, motion} from "framer-motion";
import BackgroundImg1 from "@assets/TownAtDark1.webp";
import BackgroundImg2 from "@assets/TownAtDark2.webp";
import BackgroundImg3 from "@assets/TownAtDark3.webp";
import BackgroundImg4 from "@assets/TownAtDark4.webp";


function ImageSlider({src, speedS}: { src: string, speedS: number }) {
    const [count, setCount] = useState(0)

    useInterval(
        () => {
            if (count === 3)
                setCount(0)
            else
                setCount(count => count + 1)
        },
        speedS * 1000)

    return (
        <AnimatePresence mode={'sync'}>
            <div className={styles.BackgroundImgWrapper}>
                <motion.img className={styles.BackgroundImg}
                            src={src}
                            alt={'Background Land'}
                            key={`${count} 1`}
                            initial={{x: '-100%'}}
                            animate={{x: '100%'}}

                            transition={{duration: speedS, ease: 'linear'}}
                />
                <motion.img className={styles.BackgroundImg}
                            src={src}
                            alt={'Background Land'}
                            key={`${count} 2`}
                            initial={{x: '-100%'}}
                            animate={{x: '100%'}}
                            transition={{duration: speedS, ease: 'linear'}}
                />
                <motion.img className={styles.BackgroundImg}
                            src={src}
                            alt={'Background Land'}
                            key={`${count} 3`}
                            initial={{x: '-100%'}}
                            animate={{x: '100%'}}
                            transition={{duration: speedS, ease: 'linear'}}
                />
            </div>

        </AnimatePresence>
    )
}

export default function Background() {
    return (
        <div className={styles.Background}>
            <ImageSlider src={BackgroundImg4} speedS={14}/>
            <ImageSlider src={BackgroundImg3} speedS={12}/>
            <ImageSlider src={BackgroundImg2} speedS={10}/>
            <ImageSlider src={BackgroundImg1} speedS={8}/>
        </div>
    )
}

