import React, { useMemo } from "react";
import { ITask } from "../types";
import TasksColumn from "./TasksColumn.component";
import {
    TASK_STATUS
} from "../../utils/constants";

type IProps = {
    tasks: ITask[];
}

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

const TasksView: React.FC<IProps> = ({
    tasks,
}) => {


    // Filter tasks by status and put in object.
    const filteredTasks = useMemo(() => {
        return TASK_STATUS.reduce((acc, status) => {

            const statusValue = status.value;

            acc[statusValue] = tasks.filter(task => task.status === statusValue);

            return acc;
        }, {} as { [key: string]: ITask[] });
    }, [tasks]);

    console.log({filteredTasks})

    return (
        <div className="flex justify-center p-14 gap-4 items-start w-full h-full">
            {
                TASK_STATUS.map((status, index) => {
                    return (
                        <TasksColumn 
                            key={status.value + index}
                            status={status}
                            tasks={filteredTasks[status.value]}
                        />
                    )
                })
            }
        </div>
    )
};

export default TasksView;