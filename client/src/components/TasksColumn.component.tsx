import { IStatus, ITask } from "../types";
import Task from "./Task.component";

type IProps = {
    status: IStatus;
    tasks: ITask[];
    handleUpdateTask: (updatedTask: ITask) => void;
}

const TasksColumn: React.FC<IProps> = ({
    status,
    tasks,
    handleUpdateTask,
}) => {
   
    return (
        <div className={`flex-1 flex flex-col items-center justify-start h-100 p-2 rounded-md border shadow-lg ${status.columnBgColor}`}>

            <div className={`w-100 text-center font-medium text-lg p-2 rounded-md ${status.bgColor} ${status.textColor}`}>

                {status.label}

            </div>

            {
                tasks.map((task, index) => {

                    return (
                        <Task 
                            task={task}
                            key={`${task.id}-${index}`}
                        />
                    )

                })
            }

        </div>
    );
};

export default TasksColumn;