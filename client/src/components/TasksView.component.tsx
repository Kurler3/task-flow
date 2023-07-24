import React, { useMemo } from "react";
import { ITask } from "../types";
import TasksColumn from "./TasksColumn.component";

type IProps = {
    tasks: ITask[];
}

const TASK_STATUS = [
    {
        label: "To Do",
        value: "todo",
        bgColor: "bg-gray-400"
    },
    {
        label: "In Progress",
        value: "inProgress",
        bgColor: "bg-blue-400"
    },
    {
        label: "Done",
        value: "done",
        bgColor: "bg-green-400"
    },
];

const TasksView: React.FC<IProps> = ({
    tasks,
}) => {


    // Filter tasks by status and put in object.
    // const filteredTasks = useMemo(() => {
    //     return TASK_STATUS.reduce((acc, status) => {
    //         acc[status] = tasks.filter(task => task.status === status);
    //         return acc;
    //     }, {} as { [key: string]: ITask[] });
    // }, [tasks]);

    return (
        <div className="flex justify-center p-14 gap-4 items-start w-full h-full">
            {
                TASK_STATUS.map((status, index) => {
                    return (
                        <TasksColumn 
                            key={status.value + index}
                            status={status}
                        />
                    )
                })
            }
        </div>
    )
};

export default TasksView;