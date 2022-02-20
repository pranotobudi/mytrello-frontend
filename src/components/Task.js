import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: ${props => props.isDragDisabled ? ('lightgrey'): (props.isDragging?'lightgreen':'white')};
    display: flex;
`;

const Handle = styled.div`
    width: 20px;
    height: 20px;
    background-color: orange;
    border-radius: 4px;
    margin-right: 8px;
`

export default function Task({task, index}) {
    const isDragDisabled = task.id == 'task-1';
    // console.log("inside Task task:", task, "taskID: ", task.id, "isDragDisabled: ", isDragDisabled)
    return (
        <Draggable
            draggableId={task.id}
            key={task.id}
            index={index}
        >
            {(provided, snapshot)=>(
                <Container
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                    isDragDisabled={isDragDisabled}
                    >
                    
                    <Handle />
                    {task.content}

                </Container>
            )}
        </Draggable>
    )
}