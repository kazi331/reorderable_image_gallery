import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styles from '../styles/gallery.module.css';
import { itemType } from '../utils/types';

type propsType = {
    item: itemType,
    handleSelection: (id: number) => void,
    selected: number[]
}


const GridItem = ({ item, handleSelection, selected }: propsType) => {
    const { attributes, listeners, setNodeRef, transform, transition, active } = useSortable({ id: item.id })
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: active?.id === item.id ? 999 : undefined, // higher zIndex for the active item to make sure it is always on top while dragging
        boxShadow: active?.id === item.id ? '0 0 10px 3px rgba(0,0,0,0.2)' : undefined, // add a shadow to the active item
    }
    const labelStyle = active?.id === item.id ? {
        background: 'transparent',

    } : undefined;
    return (
        <div
            {...attributes}
            {...listeners}
            ref={setNodeRef}
            style={style}
            className={styles.itemWrapper}
        >
            <div className={styles.item} >
                <img src={item.image} alt="Image title goes here..." />
            </div>
            <input type="checkbox" checked={selected.includes(item.id)} id={item.id.toString()} onChange={() => handleSelection(item.id)} />
            <label style={labelStyle} htmlFor={item.id.toString()} />
        </div>
    )
}

export default GridItem;