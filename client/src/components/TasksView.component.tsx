/* eslint-disable react-refresh/only-export-components */
import React, { useMemo } from "react";
import { ITask } from "../types";
import TasksColumn from "./TasksColumn.component";
import { Action } from "../state/app/app.state";


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


    // Filter tasks by status and put in object.
    const filteredTasks = useMemo(() => {
        return TASK_STATUS.reduce((acc, status) => {

            const statusValue = status.value;

            acc[statusValue] = tasks.filter(task => task.status === statusValue);

            return acc;
        }, {} as { [key: string]: ITask[] });
    }, [tasks]);

    /////////////////////////////////////////////////////////////////////////////////
    // FUNCTIONS ////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////

    // Create task

    // Update task
    const handleUpdateTask = (updatedTask: ITask) => {

      dispatch({
        type: 'SET_LOADING',
        payload: true,
      });

      try {

        // Update the task in the backend.
        setTimeout(() => {}, 2000);

        // Update in app state.
        dispatch({
          type: 'UPDATE_TASK',
          payload: updatedTask
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

    // Delete task

    return (
        <div className="flex justify-center p-14 gap-4 items-start w-full h-full">
            {
                TASK_STATUS.map((status, index) => {
                    return (
                        <TasksColumn 
                            key={status.value + index}
                            status={status}
                            tasks={filteredTasks[status.value]}
                            handleUpdateTask={handleUpdateTask}
                        />
                    )
                })
            }
        </div>
    )
};

export default TasksView;