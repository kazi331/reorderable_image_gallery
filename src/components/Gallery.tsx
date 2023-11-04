/* eslint-disable @typescript-eslint/no-unused-vars */

import { DndContext, DragMoveEvent, DragOverlay, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, rectSwappingStrategy } from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import styles from '../styles/gallery.module.css';
import Bar from './Bar';
import GridItem from './GridItem';



// import data from '../data.json'

export type itemType = { id: number, image: string }

const Gallery = () => {
    const [selected, setSelected] = useState<number[]>([])
    const [data, setData] = useState<itemType[]>([] as itemType[]);
    const [activeId, setActiveId] = useState<number | null>(null);
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
    const handleSelection = (id: number) => {
        // insert new id if it is not already exist
        setSelected(prev => prev.includes(id) ? selected.filter(item => item !== id) : [...prev, id])
    }
    const handleDragEnd = ({ active, over }: DragMoveEvent) => {
        if (active.id !== over?.id) {
            setData(items => {
                const oldIndex = items.findIndex(item => item.id === active.id)
                const newIndex = items.findIndex(item => item.id === over?.id)
                return arrayMove(items, oldIndex, newIndex);
            })
        }
    }

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            onDragStart={(e: DragMoveEvent) => { setActiveId(Number(e.active.id)) }}

        >
            <SortableContext items={data} strategy={rectSwappingStrategy} >
                <div className={styles.wrapper}>
                    {/* Bar  */}
                    <Bar selected={selected} />

                    {/* main container */}
                    <div className={styles.container}>
                        {data.map(item => <GridItem key={item.id} item={item} handleSelection={handleSelection} />)}

                        {/* ADD IMAGE BLOCK */}
                        <div className={styles.addItem}>
                            <img src="/icons/thumbnail.svg" alt="image thumbnail" />
                            <p>Add Images</p>
                        </div>
                    </div>

                </div>
            </SortableContext>
            <DragOverlay>
                {activeId ?
                    <GridItem item={data[activeId - 1]} handleSelection={handleSelection} />
                    : null}
            </DragOverlay>
        </DndContext>
    )
}



export default Gallery