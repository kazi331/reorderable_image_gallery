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
        zIndex: active?.id === item.id ? 999 : undefined,
        boxShadow: active?.id === item.id ? '0 0 10px 3px rgba(0,0,0,0.2)' : undefined,
    }
    const labelStyle = active?.id === item.id ? {
        background: 'transparent',
        cursor: 'grabbing'
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
            <input type="checkbox"
                checked={selected.includes(item.id)}
                id={item.id.toString()}
                onChange={() => handleSelection(item.id)}
            />
            <label style={labelStyle} htmlFor={item.id.toString()}>
                <span className={styles.check}>
                    <span className={styles.checkbg}>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" className={styles.checkmark} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg> */}
                        <svg xmlns="http://www.w3.org/2000/svg" className={styles.checkmark} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" ><path d="M20 6 9 17l-5-5" /></svg>
                    </span>
                </span>
            </label>
        </div>
    )
}

export default GridItem;