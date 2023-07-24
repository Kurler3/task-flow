
type IProps = {
    status: {
        label: string;
        value: string;
        bgColor: string;
    };
}

const TasksColumn: React.FC<IProps> = ({
    status,
}) => {

    return (
        <div className="flex-1 flex flex-col items-center justify-start h-100 p-2 rounded-md border shadow-lg bg-white">

            <div className={`w-100 text-center font-medium text-white text-lg p-2 rounded-md ${status.bgColor}`}>

                {status.label}

            </div>

        </div>
    );
};

export default TasksColumn;