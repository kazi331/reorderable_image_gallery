import { DndContext, DragMoveEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';



const Languages = () => {
    const [languages, setLanguages] = useState([
        { id: 1, lang: "Javascript" },
        { id: 2, lang: "python" },
        { id: 3, lang: "PHP" },
        { id: 4, lang: "Ruby" }
    ]);

    function handleDragEnd(event: DragMoveEvent) {
        const { active, over } = event;
        if (active.id !== over?.id) {
            setLanguages(items => {
                const oldIndex = items.findIndex(lang => lang.id === active.id)
                const newIndex = items.findIndex(lang => lang.id === over?.id);
                return arrayMove(items, oldIndex, newIndex)
            });
        }
    }
    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext
                items={languages}
                strategy={verticalListSortingStrategy}
            >
                {languages.map((item) => <SortableItem key={item.id} item={item} />)}

            </SortableContext>
        </DndContext>
    )
}



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


export default Languages