/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import { ITask } from "../types";
import TasksColumn from "./TasksColumn.component";
import { Action } from "../state/app/app.state";

import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import {
  wait
} from '../../utils/functions';

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
}

const TasksView: React.FC<IProps> = ({
  tasks,
  dispatch,
}) => {

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

      if(prevStatus === updatedTask.status) {
        destinationTasks.splice(prevIndex, 1);
      }

      destinationTasks.splice(newIndex, 0, updatedTask);

      // Remove from source.
      const sourceTasks = filteredTasks[prevStatus];

      if(prevStatus !== updatedTask.status) {
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
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex justify-center p-14 gap-4 items-start w-full h-full">
        {
          TASK_STATUS.map((status, index) => {
            return (

              <TasksColumn
                key={status.value + index}
                status={status}
                tasks={filteredTasks[status.value]}
                handleSetDetailedTaskData={handleSetDetailedTaskData}
              />


            )
          })
        }
      </div>
    </DragDropContext>
  )
};

export default TasksView;