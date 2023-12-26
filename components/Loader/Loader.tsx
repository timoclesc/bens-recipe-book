import { FC } from 'react';
import {
    Aubergine,
    Breakfast,
    Carrot,
    Cheese,
    Loaf,
    Pickles,
} from '@/components/Icons'
import styles from './Loader.module.scss'

export const Loader: FC = () => {
    return (
        <div className={styles.loaderContainer}>
            <div className={styles.loader}>
                <Aubergine />
                <Breakfast />
                <Carrot />
                <Cheese />
                <Loaf />
                <Pickles />
            </div>
        </div>
    );
}