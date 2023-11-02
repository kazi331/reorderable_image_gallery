import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';


const SortableItem = ({ item }: { item: { id: number, lang: string } }) => {
    const { listeners, attributes, setNodeRef, transform, transition } = useSortable({ id: item.id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }
    return (
        <div {...attributes}{...listeners} ref={setNodeRef} style={style}>{item.lang}</div>
    )
}

export default SortableItem