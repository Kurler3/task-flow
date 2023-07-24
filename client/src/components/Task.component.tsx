import { TASK_STATUS } from "../../utils/constants";
import { IStatus, ITask } from "../types";


type IProps = {
    task: ITask;
}

const Task: React.FC<IProps> = ({
    task,
}) => {

    const statusObject: IStatus = TASK_STATUS.find((status) => status.value === task.status)!;

    return (
        <div
      className={`w-100 shadow p-4 mt-2 rounded-md opacity-[0.7] ${statusObject.taskColor} ${statusObject.textColor}`}
    >
      <h2 className="text-xl font-semibold">{task.title}</h2>
      <p className="text-gray-600">{task.description}</p>
      {/* Status is not displayed here */}
    </div>
    );
};

export default Task;