import { IStatus, ITask } from "../types";
import { TASK_STATUS } from "./TasksView.component";


type IProps = {
    task: ITask;
}

const Task: React.FC<IProps> = ({
    task,
}) => {

    const statusObject: IStatus = TASK_STATUS.find((status) => status.value === task.status)!;

    return (
        <div
      className={`
      border bg-white cursor-grab transition hover:bg-gray-200 w-100 shadow-md p-4 mt-2 rounded-md opacity-[0.7]
        ${statusObject.taskColor} ${statusObject.textColor}
      `}
    >
      <h2 className="text-xl font-semibold">{task.title}</h2>
      <p className="text-gray-600">{task.description}</p>
    </div>
    );
};

export default Task;