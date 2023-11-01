import styles from '../styles/gallery.module.css';
import { itemType } from './Gallery';
const GridItem = ({ item }: { item: itemType }) => {
    return (
        <div className={styles.itemWrapper}>
            <div className={styles.item}>
                <img src={item.image} alt="Image Item" />
            </div>

            <label htmlFor={item.id.toString()} className={styles.overlay}>
                <input type="checkbox" id={item.id.toString()} />
            </label>

        </div>
    )
}

export default GridItem;