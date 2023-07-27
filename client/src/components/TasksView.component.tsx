/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import { ICreateTaskForm, ITask, ITaskFormValue } from "../types";
import TasksColumn from "./TasksColumn.component";
import { Action } from "../state/app/app.state";

import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import {
  wait
} from '../../utils/functions';
import DetailedTaskModal from "./DetailedTaskModal.component";
import ContextMenu from "./ContextMenu.component";
import CreateTaskModal from "./CreateTaskModal.component";
import { Button } from "react-bootstrap";

export const TASK_STATUS = [
  {
    label: "To Do",
    value: "todo",
    bgColor: "bg-yellow-400",
    textColor: "text-yellow-800",
    taskColor: "text-yellow-300",
    columnBgColor: "bg-yellow-100",
  },
  {
    label: "In Progress",
    value: "inProgress",
    bgColor: "bg-blue-400",
    textColor: "text-blue-800",
    taskColor: "text-blue-300",
    columnBgColor: "bg-blue-100",
  },
  {
    label: "Done",
    value: "done",
    bgColor: "bg-green-400",
    textColor: "text-green-800",
    taskColor: "text-green-300",
    columnBgColor: "bg-green-100"
  },
];


export const DEFAULT_TASKS: ITask[] = [
  {
    id: 1,
    title: "Dummy todo",
    description: "Dummy todo description",
    status: "todo",
    userId: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),

  },
  {
    id: 2,
    title: "Dummy in progress",
    description: "Dummy in progress description",
    status: "inProgress",
    userId: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Dummy done",
    description: "Dummy done description",
    status: "done",
    userId: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

type IProps = {
  tasks: ITask[];
  dispatch: React.Dispatch<Action>;
  handleCloseDetailedTaskModal: () => void;
  detailedTaskData: ITask | null;
  isShowCreateTaskModal: boolean;
}

const TasksView: React.FC<IProps> = ({
  tasks,
  dispatch,
  handleCloseDetailedTaskModal,
  detailedTaskData,
  isShowCreateTaskModal,
}) => { 

  const [contextMenuPosition, setContextMenuPosition] = useState<{ x: number; y: number } | null>(
    null
  );

  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);


  const [filteredTasks, setFilteredTasks] = useState(TASK_STATUS.reduce((acc, status) => {

    const statusValue = status.value;

    acc[statusValue] = tasks.filter(task => task.status === statusValue);

    return acc;
  }, {} as { [key: string]: ITask[] }));

  /////////////////////////////////////////////////////////////////////////////////
  // FUNCTIONS ////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////

  // Update task
  const handleUpdateTask = async (updatedTask: ITask, prevStatus: string, prevIndex: number, newIndex: number) => {

    dispatch({
      type: 'SET_LOADING',
      payload: true,
    });

    try {

      //TODO Update the task in the backend.
      await wait(3);

      // Update destination status tasks.
      const destinationTasks = filteredTasks[updatedTask.status];

      if (prevStatus === updatedTask.status) {
        destinationTasks.splice(prevIndex, 1);
      }

      destinationTasks.splice(newIndex, 0, updatedTask);

      // Remove from source.
      const sourceTasks = filteredTasks[prevStatus];

      if (prevStatus !== updatedTask.status) {
        sourceTasks.splice(prevIndex, 1);
      }

      setFilteredTasks((prevState) => {
        return {
          ...prevState,
          [updatedTask.status]: destinationTasks,
          [prevStatus]: sourceTasks,
        }
      });

    } catch (error) {
      console.error(error);
      // Show error toast.
    } finally {
      dispatch({
        type: 'SET_LOADING',
        payload: false,
      });
    }

  }

  // Set detailed task data
  const handleSetDetailedTaskData = (task: ITask) => {
    dispatch({
      type: 'SET_DETAILED_TASK_DATA',
      payload: task,
    });
  }

  // Handle update detailed task
  const handleUpdateDetailedTask = async (taskUpdateData: ITaskFormValue) => {

    // If any updates
    if(Object.keys(taskUpdateData).length > 0) {

      // Set loading.
      dispatch({
        type: 'SET_LOADING',
        payload: true,
      });
      try {
        //TODO Update on backend
        await wait(3);

        // Update on filteredTasks state.
        setFilteredTasks((prevState) => {

          const tasks = prevState[detailedTaskData!.status]
          const index = tasks.findIndex((task: ITask) => task.id === detailedTaskData!.id);

          tasks[index] = {
            ...tasks[index],
            ...taskUpdateData,
          };
          
          return {
            ...prevState,
            [detailedTaskData!.status]: tasks,
          }
        })
      } catch (error) {
        console.error("Error updating task...");
      } finally {
        // Set stop loading.
        dispatch({
          type: 'SET_LOADING',
          payload: false,
        })
      }

    }

    
    // Close detailed task modal.
    dispatch({
      type: 'SET_DETAILED_TASK_DATA',
      payload: null,
    })
  }

   // Function to handle right-click and show the context menu
  const handleRightClick = (event: React.MouseEvent, task: ITask) => {
    event.preventDefault();
    setContextMenuPosition({ x: event.clientX, y: event.clientY });
    setSelectedTask(task);
  };

  // Function to close the context menu
  const handleCloseContextMenu = () => {
    setContextMenuPosition(null);
    setSelectedTask(null);
  };

  // Function to handle task deletion
  const handleDeleteTask = async () => {

    // Set loading
    dispatch({
      type: 'SET_LOADING',
      payload: true,
    });

    try {

      // Delete in backend
      await wait(3);

      // Update in state
      setFilteredTasks((prevState) => {

        const tasks = prevState[selectedTask!.status];

        const index = tasks.findIndex((task) => task.id === selectedTask!.id);

        tasks.splice(index, 1);

        return {
          ...prevState,
          [selectedTask!.status]: tasks,
        };
      });

    } catch (error) {
      console.error(error);
    } finally {

      // Set loading false.
      dispatch({
        type: 'SET_LOADING',
        payload: false,
      });

      handleCloseContextMenu();
    }
  };

  // Handle open create task modal
  const handleOpenCloseCreateTaskModal = () => {
    dispatch({
      type: 'SET_SHOW_CREATE_TASK_MODAL',
      payload: !isShowCreateTaskModal,
    });
  }

  // Handle create task.
  const handleCreateTask = async (createTaskValue: ICreateTaskForm) => {
 
    // Set loading
    dispatch({
      type: 'SET_LOADING',
      payload: true,
    });

    try {

      // Create on backend
      await wait(3);

      // Update front state
      setFilteredTasks((prevState) => {

        const tasks = prevState[createTaskValue.status];

        const newTask = {
          ...createTaskValue,

          // TODO THESE WILL BE RETURNED FROM THE BACKEND
          id: 1,
          userId: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        tasks.unshift(newTask);

        return {
          ...prevState,
          [newTask.status]: tasks,
        }
      })

    } catch (error) {
      console.error(error);
    } finally {
        // Set loading false
        dispatch({
          type: 'SET_LOADING',
          payload: false,
        });

        handleOpenCloseCreateTaskModal();
    }
    
  }

  /////////////////////////////////////////////////////////////////////////////////
  // REACT DND ////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////

  // REACT DND FUNCTIONS
  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    // Find the task being dragged.
    const draggedTask = tasks.find((task) => task.id === parseInt(draggableId, 10));

    if (!draggedTask) return;

    // Update the status of the task based on the destination droppable.
    const updatedTask: ITask = {
      ...draggedTask,
      status: destination.droppableId as string,
    };

    await handleUpdateTask(updatedTask, source.droppableId, source.index, destination.index);
  };
  
  return (
    <div className="flex flex-col justify-center align-center w-100 h-100 relative">
      {/* Create task button */}
      <Button 
        variant="primary"
        className="m-auto py-2 px-4 mt-4"
        onClick={handleOpenCloseCreateTaskModal}
      >Create a task</Button>


      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex justify-center p-10 gap-4 items-start w-full h-full">
          {
            TASK_STATUS.map((status, index) => {
              return (
                <TasksColumn
                  key={status.value + index}
                  status={status}
                  tasks={filteredTasks[status.value]}
                  handleSetDetailedTaskData={handleSetDetailedTaskData}
                  handleRightClick={handleRightClick}
                />

              )
            })
          }
        </div>
      </DragDropContext>
      {/* Task Modal */}
      <DetailedTaskModal
        isShow={!!detailedTaskData}
        task={detailedTaskData}
        handleClose={handleCloseDetailedTaskModal}
        handleUpdateDetailedTask={handleUpdateDetailedTask}
      />
      {/* Create Task Modal */}
      <CreateTaskModal 
        isShow={isShowCreateTaskModal}
        handleClose={handleOpenCloseCreateTaskModal}
        handleCreateTask={handleCreateTask}
      />
      {/* Render the context menu when needed */}
      {contextMenuPosition && (
         <div
          className="fixed inset-0 z-10"
          onClick={handleCloseContextMenu}
          onContextMenu={handleCloseContextMenu}
          >
         <ContextMenu
           x={contextMenuPosition.x}
           y={contextMenuPosition.y}
           onDelete={handleDeleteTask}
         />
       </div>)
      }
    </div>
  )
};

export default TasksView;