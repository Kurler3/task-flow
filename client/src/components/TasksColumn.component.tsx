import { IStatus, ITask } from "../types";
import Task from "./Task.component";
import { Droppable, Draggable, DroppableProvided } from 'react-beautiful-dnd';


type IProps = {
    status: IStatus;
    tasks: ITask[];
    handleSetDetailedTaskData: (task: ITask) => void;
}

const TasksColumn: React.FC<IProps> = ({
    status,
    tasks,
    handleSetDetailedTaskData,
}) => {
   
    return (
        <Droppable droppableId={status.value}>
          {(provided: DroppableProvided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`flex-1 flex flex-col items-center justify-start h-100 p-2 rounded-md border shadow-lg ${status.columnBgColor}`}
            >
              <div
                className={`w-100 text-center font-medium text-lg p-2 rounded-md ${status.bgColor} ${status.textColor}`}
              >
                {status.label}
              </div>
              {tasks.map((task, index) => (
                <Draggable key={task.id.toString()} draggableId={task.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={() => handleSetDetailedTaskData(task)}
                    >
                      <Task task={task} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
    </Droppable>
    );
};

export default TasksColumn;