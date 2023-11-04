import styles from '../styles/gallery.module.css';

const Header = ({ selected, handleDelete, }: { selected: number[], handleDelete: () => void }) => {

    return (
        <div className={styles.bar}>
            {
                selected.length > 0 ?
                    <div className={styles.bar_container}>
                        <div className={styles.bar_selected}>
                            <input type="checkbox" />
                            <p>{selected.length} {selected.length > 1 ? "Files" : "File"} Selected</p>
                        </div>
                        <button onClick={handleDelete}>Delete {selected.length > 1 ? "Items" : "Item"}</button>
                    </div> :
                    <h3 className={styles.title}>Gallery</h3>
            }
        </div>
    )
}

export default Header