import styles from '../styles/gallery.module.css';

const Empty = () => {
    return (
        <div className={styles.empty}>
            <img src="/icons/undraw_no_data.svg" alt="image thumbnail" />
            <h3>No images found</h3>
            <span>Add some new!</span>
        </div>
    )
}

export default Empty