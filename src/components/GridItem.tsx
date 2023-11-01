import styles from '../styles/gallery.module.css';
import { itemType } from './Gallery';
const GridItem = ({ item }: { item: itemType }) => {
    return (
        <div className={styles.itemWrapper}>
            <div className={styles.item}>
                <img src={item.image} alt="Image title goes here..." />
            </div>
            <input type="checkbox" id={item.id.toString()} />
            <label htmlFor={item.id.toString()} ></label>
        </div>
    )
}

export default GridItem;