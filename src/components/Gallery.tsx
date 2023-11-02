
import { DndContext, DragMoveEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, rectSwappingStrategy } from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import styles from '../styles/gallery.module.css';
import Bar from './Bar';
import GridItem from './GridItem';



// import data from '../data.json'

export type itemType = { id: number, image: string }

export type selectedType = { id: number, image: string }[]

const Gallery = () => {
    const [selected, setSelected] = useState<selectedType>([])
    const [data, setData] = useState<itemType[]>([] as itemType[]);
    const [activeId, setActiveId] = useState<number | null>(null)

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

    const handleDragEnd = (event: DragMoveEvent) => {
        const { active, over } = event;
        const oldIndex = data.findIndex(item => item.id === active.id)
        const newIndex = data.findIndex(item => item.id === over?.id)
        const newOrder = arrayMove(data, oldIndex, newIndex);
        setData(newOrder); // local update

    }

    const handleDragStart = (event: DragMoveEvent) => {
        setActiveId(Number(event.active.id));
    }

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}

        >
            <SortableContext items={data} strategy={rectSwappingStrategy} >
                <div className={styles.wrapper}>
                    {/* Bar  */}
                    <Bar selected={selected} />

                    {/* main container */}
                    <div className={styles.container}>
                        {data.map(item => <GridItem key={item.id} item={item} />)}

                        {/* ADD IMAGE BLOCK */}
                        <div className={styles.addItem}>
                            <img src="/icons/thumbnail.svg" alt="image thumbnail" />
                            <p>Add Images</p>
                        </div>
                    </div>

                </div>
            </SortableContext>
            {/* <DragOverlay>
                {activeId ?
                    <GridItem item={data[activeId - 1]} />
                    : null}
            </DragOverlay> */}
        </DndContext>
    )
}



export default Gallery