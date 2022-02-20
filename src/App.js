import logo from './logo.svg';
import './App.css';
import '@atlaskit/css-reset';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import initialData from './initial-data';
import { useState } from 'react';
import Column from './components/Column';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

function App() {
  const [state, setState] = useState(initialData);
  const [homeIndex, setHomeIndex] = useState(null);


  const onDragStart = (start) => {
    const homeIndex = state.columnOrder.indexOf(start.source.droppableId);

    setHomeIndex(homeIndex)
    // document.body.style.color = 'orange';  
    // document.body.style.transition = 'background-color 0.2s ease';  
  }
  // const onDragUpdate = (result) => {
  //   const { destination } = result;
  //   const opacity = destination? destination.index / Object.keys(state.tasks).length: 0;
  //   document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
    
  // }

  const onDragEnd = (result) => {
    // document.body.style.color = 'inherit';  
    // document.body.style.backgroundColor = `inherit`;
    setHomeIndex(null);
    const { destination, source, draggableId, type } = result
    // target is outside droppable, destination === null
    if (!destination){
      return
    }
    // target is the same from the source  
    if (destination.droppableId === source.droppableId && destination.index === source.index){
      return 
    }

    if (type === 'column'){
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...state,
        columnOrder: newColumnOrder,
      };
      setState(newState);
      return; 
    }


    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
    
      // remove that index, see function hover for splice arguments
      newTaskIds.splice(source.index, 1); 
      // insert draggableId besides destionationIdx
      newTaskIds.splice(destination.index, 0, draggableId);  
  
      const newColumn = {
        ...start, 
        taskIds: newTaskIds,
      }
  
      // update newColumn to state
      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        }
      }
  
      setState(newState);
      return
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start, 
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish, 
      taskIds: finishTaskIds,
    };

    const newState = {
      ...state, 
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setState(newState);

  }

  return (
    <DragDropContext 
      onDragStart={onDragStart}
      // onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId='all-columns' direction='horizontal' type='column'>
        {(provided)=>(
            <Container 
              {...provided.droppableProps}
              ref={provided.innerRef}

            >
              {
                state.columnOrder.map((columnId, idx, arr)=>{
                  console.log("columnId: ", columnId, "index: ", idx, "homeIndex:", homeIndex, "array: ", arr);
                  const column = state.columns[columnId];
                  const tasks = column.taskIds.map(taskId => {
                    return state.tasks[taskId]
                  });
                  const isDropDisabled = idx < homeIndex;
                  console.log("column: ", column);
                  return (
                  <Column  
                    key={column.id} 
                    column={column} 
                    tasks={tasks} 
                    isDropDisabled={isDropDisabled}
                    index={idx}/>
                  );
                  console.log("after..");
                })  
              }
              {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default App;
