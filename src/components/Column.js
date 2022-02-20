import React from 'react';
import Task from './Task';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    background-color: white;
    border-radius: 2px;
    width: 220px;
    display: flex;
    flex-direction: column;
`;
const Title = styled.h3`
    padding: 8px;
`;
const TaskList = styled.div`
    padding: 8px;
    background-color: ${props=>(props.isDraggingOver?'skyblue':'inherit')};
    transition: background-color 0.8s ease;
    flex-grow: 1;
    min-height: 100px;
`;

export default function Column({column, tasks, isDropDisabled,index}) {
    console.log("inside Column column:", column, "tasks: ", tasks)
    return (
        <Draggable draggableId={column.id} index={index}>
            {(provided)=>(
                <Container
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                <Title {...provided.dragHandleProps}>{column.title}</Title>
                <Droppable 
                    droppableId={column.id}
                    isDropDisabled={isDropDisabled}
                    type="task"
                >
                    {(provided, snapshot)=>(
                        <TaskList 
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                        >
                        {tasks.map((task, index)=>(
                            <Task key={index} task={task} index={index}/>
                        ))}
                        {provided.placeholder}                
                        </TaskList>
                    )}
                </Droppable>
                </Container>                
            )}

        </Draggable>
    )
}