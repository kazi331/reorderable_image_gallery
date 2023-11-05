import styles from '../styles/gallery.module.css';

const Empty = () => {
    return (
        <div className={styles.empty}>
            <img src="/icons/undraw_no_data.svg" alt="image thumbnail" />
            <p>No images found</p>
            <span>Add some new!</span>
        </div>
    )
}

export default Empty