import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styles from '../styles/gallery.module.css';
import { itemType } from './Gallery';


const GridItem = ({ item, handleSelection }: { item: itemType, handleSelection: (id: number) => void }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id })
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }


    return (
        <div
            {...attributes}
            {...listeners}
            ref={setNodeRef}
            style={style}
            className={styles.itemWrapper}
        // draggable={true}
        // onDragStart={(e) => {
        //     const target = e.target as HTMLDivElement;
        //     target.style.zIndex = "100";
        //     const dragging = document.querySelector('.dragging') as HTMLDivElement;
        //     if (dragging) {
        //         dragging.classList.remove('dragging')
        //         dragging.style.zIndex = "";
        //     }
        //     target.classList.add('dragging');
        // }}
        >
            <div className={styles.item} >
                <img src={item.image} alt="Image title goes here..." />
            </div>
            <input type="checkbox" id={item.id.toString()} onChange={() => handleSelection(item.id)} />
            <label htmlFor={item.id.toString()} onClick={() => console.log('clicked label')} />
        </div>
    )
}

export default GridItem;