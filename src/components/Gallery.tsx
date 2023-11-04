/* eslint-disable @typescript-eslint/no-unused-vars */

import { DndContext, DragMoveEvent, MouseSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
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
    // const [activeId, setActiveId] = useState<number | null>(null);
    // withou sensors, we cannot invoke our custom events on single items
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10, // Enable sort function when dragging 10px   💡 here!!!
        },
    })
    const sensors = useSensors(mouseSensor);

    // Simulate data fetching from the server
    const fetchData = async () => {
        const res = await fetch('data.json');
        const data = await res.json();
        setData(data)
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSelection = (id: number) => {
        // insert new id if it is not already exist in the array
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
        // setActiveId(null);
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        // onDragStart={(e: DragMoveEvent) => { setActiveId(Number(e.active.id)) }}
        // onDragCancel={() => { setActiveId(null) }}

        >
            <SortableContext items={data} strategy={rectSwappingStrategy} >
                <div className={styles.wrapper}>
                    <Bar selected={selected} />
                    {/* main container */}
                    <div className={styles.container}>
                        {data.map(item => (
                            <GridItem key={item.id} item={item} handleSelection={handleSelection} />
                        ))}

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
                    <GridItem item={data[activeId]} handleSelection={handleSelection} />
                    : null}
            </DragOverlay> */}
        </DndContext>
    )
}



export default Gallery