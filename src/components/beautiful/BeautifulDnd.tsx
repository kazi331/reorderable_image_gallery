import { useState } from "react";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
// solution to "Unable to find draggable with id: sayem" in react 18 strictmode
import { StrictModeDroppable as Droppable } from '../../helpers/StrictModeDropable';

const BeautifulDnd = () => {
    const [users, setUsers] = useState<string[]>(["sayem", "rakib", "sohag", "roni"])


    const handleDragEnd = ({ destination, source }: DropResult) => {
        // if destination is null or destination is same as source then do nothing
        if (!destination || destination.index === source.index) return
        // else move the item
        const newUsers = [...users] // clone the users array to avoid mutation
        const [reorderedItem] = newUsers.splice(source.index, 1)
        newUsers.splice(destination.index, 0, reorderedItem)

        setUsers(newUsers)
    }
    return (

        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable">
                {({ innerRef, droppableProps, placeholder }) => (
                    <section  {...droppableProps} ref={innerRef}
                        style={{
                            border: "1px dashed black",
                            padding: "10px",
                            // display: "flex",
                        }}
                    >
                        {users.map((user, index) => (
                            <Draggable draggableId={user} index={index} key={user}>
                                {({ dragHandleProps, draggableProps, innerRef }) => (
                                    <div ref={innerRef} {...dragHandleProps} {...draggableProps}>
                                        <div
                                            style={{
                                                border: "1px solid black",
                                                padding: "10px",
                                            }}
                                        >
                                            <input type="checkbox" name="check" id={user} onChange={() => console.log(user)} />
                                            <label htmlFor={user}>{user}</label>
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {placeholder}
                    </section>
                )}
            </Droppable>

        </DragDropContext >
    )
}

export default BeautifulDnd