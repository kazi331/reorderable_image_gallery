import styles from '../styles/gallery.module.css';
import { itemType } from './Gallery';

const Bar = ({ selected }: { selected: itemType[] }) => {
    return (
        <div className={styles.bar}>
            {
                selected.length > 0 ?
                    <div className={styles.bar_container}>
                        <div className={styles.bar_selected}>
                            <input type="checkbox" />
                            <p>1 Files Selected</p>
                        </div>
                        <button>Delete Items</button>
                    </div> :
                    <h3 className={styles.title}>Gallery</h3>
            }
        </div>
    )
}

export default Bar