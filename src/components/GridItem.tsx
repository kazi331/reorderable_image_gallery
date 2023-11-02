import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styles from '../styles/gallery.module.css';
import { itemType } from './Gallery';


const GridItem = ({ item, handleSelection }: { item: itemType, handleSelection: (id: number) => void }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id })
    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }
    return (
        <div

            {...attributes}
            {...listeners}
            ref={setNodeRef}
            style={style}
            className={styles.itemWrapper}
        >
            <div
                className={styles.item}>
                <img src={item.image} alt="Image title goes here..." />
                <input type="checkbox" id={item.id.toString()} onChange={() => {
                    console.log('checked/unchecked')
                    handleSelection(item.id)
                }} />
                <label htmlFor={item.id.toString()} ></label>
            </div>
        </div>
    )
}

export default GridItem;