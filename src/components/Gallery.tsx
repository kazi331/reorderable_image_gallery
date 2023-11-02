/* eslint-disable @typescript-eslint/no-unused-vars */

import { DndContext, DragMoveEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, rectSwappingStrategy } from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import styles from '../styles/gallery.module.css';
import Bar from './Bar';
import GridItem from './GridItem';



// import data from '../data.json'

export type itemType = { id: number, image: string }

const Gallery = () => {
    const [images, setImages] = useState<itemType[]>([] as itemType[]);
    const [selected, setSelected] = useState<number[]>([])
    // const [activeId, setActiveId] = useState<number | null>(null)

    // Simulate images fetching from the server
    const fetchData = async () => {
        const res = await fetch('data.json');
        const data = await res.json();
        setImages(data)
    }
    // console.log(images)
    useEffect(() => {
        fetchData();
    }, []);


    const handleDragEnd = ({ active, over }: DragMoveEvent) => {
        if (active.id !== over?.id) {
            setImages(items => {
                const oldIndex = items.findIndex(item => item.id === active.id)
                const newIndex = items.findIndex(item => item.id === over?.id)
                return arrayMove(items, oldIndex, newIndex);
            })
        }
    }

    // const handleDragStart = (event: DragMoveEvent) => {
    //     setActiveId(Number(event.active.id));
    // }

    // handle selected items
    const handleSelection = (id: number) => {
        // insert new id if it is not already exist
        setSelected(prev => prev.includes(id) ? selected.filter(item => item !== id) : [...prev, id])
    }
    console.log(selected)
    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        // onDragStart={handleDragStart}

        >
            <SortableContext items={images} strategy={rectSwappingStrategy} >
                <div className={styles.wrapper}>
                    {/* Bar  */}
                    <Bar selected={selected} />

                    {/* main container */}
                    <div className={styles.container}>
                        {images.map(item => <GridItem key={item.id} item={item} handleSelection={handleSelection} />)}

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