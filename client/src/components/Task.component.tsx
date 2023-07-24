import { ITask } from "../types";


type IProps = {
    task: ITask;
}

const Task: React.FC<IProps> = ({
    task,
}) => {

    return (
        <div className="bg-white shadow-md border p-2 mt-2 w-100 rounded-md">
            <h2 className="text-lg font-semibold">{task.title}</h2>
            <p className="text-gray-600">{task.description}</p>
        </div>
    );
};

export default Task;