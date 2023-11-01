
import { useEffect, useState } from 'react';
import styles from '../styles/gallery.module.css';


// import data from '../data.json'

export type itemType = { id: number, image: string }

const Gallery = () => {
    const [data, setData] = useState<itemType[]>([] as itemType[]);
    // Simulate data fetching from the server
    const fetchData = async () => {
        const res = await fetch('data.json');
        const data = await res.json();
        setData(data)
    }
    // console.log(data)
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>

            <div className={styles.container}>
                {data.map(item => <GridItem key={item.id} item={item} />)}
                <div className={styles.addItem}>
                    <img src="public/icons/thumbnail.svg" alt="image thumbnail" />
                    <p>Add Images</p>
                </div>
            </div>
        </div>
    )
}


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

export default Gallery