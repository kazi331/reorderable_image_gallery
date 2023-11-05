import { DndContext, DragMoveEvent, MouseSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, rectSwappingStrategy } from '@dnd-kit/sortable';
import { useState } from 'react';
import styles from '../styles/gallery.module.css';
import GridItem from './GridItem';

import { toast } from 'sonner';
import images from '../data/data.json';
import { itemType } from '../utils/types';
import AddItem from './AddItem';
import Empty from './Empty';
import Header from './Header';



const Gallery = () => {
    const [selected, setSelected] = useState<number[]>([])
    const [data, setData] = useState<itemType[]>(images);

    // Enable event listeners for the mouse sensor
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10, // Enable sort function when dragging 10px   💡 here!!!
        },
    })
    const sensors = useSensors(mouseSensor);

    const handleSelection = (id: number) => {
        // insert new id if it is not already exist in the array
        setSelected(prev => prev.includes(id) ? selected.filter(item => item !== id) : [...prev, id])
    }

    const handleDelete = () => {
        setData(prev => prev.filter(item => !selected.includes(item.id)))
        toast.success(`${selected.length} ${selected.length > 1 ? "items" : "item"} deleted successfully`, {
            dismissible: true,
            action: {
                label: 'Reload Page',
                onClick: () => {
                    window.location.reload()
                    setSelected([])
                },
            }
        })
        setSelected([])
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

    //  SELECT ALL
    const selectAll = () => {
        if (selected.length === data.length) return setSelected([])
        setSelected(data.map(item => item.id))
    }
    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext items={data} strategy={rectSwappingStrategy} >
                <Header selected={selected} selectAll={selectAll} handleDelete={handleDelete} checked={selected.length === data.length} />
                <div className={styles.wrapper}>
                    {/* main container */}
                    <div className={styles.container}>
                        {data.length > 0 ?
                            data.map(item => <GridItem key={item.id} item={item} handleSelection={handleSelection} selected={selected} />)
                            : <Empty />
                        }
                        <AddItem />
                    </div>
                </div>
            </SortableContext>
        </DndContext>
    )
}



export default Gallery