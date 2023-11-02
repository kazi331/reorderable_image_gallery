import { DndContext, DragMoveEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from 'react';
import SortableItem from './SortableItem';



const ImageGallery = () => {
    const [languages, setLanguages] = useState([
        { id: 1, lang: "Javascript" },
        { id: 2, lang: "python" },
        { id: 3, lang: "PHP" },
        { id: 4, lang: "Ruby" }
    ]);

    // const [newOrder, setNewOrder] = useState(languages);
    // console.log(newOrder);

    function handleDragEnd(event: DragMoveEvent) {
        const { active, over } = event;
        if (active.id !== over?.id) {

            const oldIndex = languages.findIndex(lang => lang.id === active.id)
            const newIndex = languages.findIndex(lang => lang.id === over?.id);
            const updatedOrder = arrayMove(languages, oldIndex, newIndex)
            // setNewOrder(updatedOrder);
            setLanguages(updatedOrder);

        }

        // setLanguages()
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



export default ImageGallery