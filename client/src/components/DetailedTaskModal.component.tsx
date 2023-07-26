import { Button, Modal } from "react-bootstrap";
import { IStatus, ITask, ITaskFormValue } from "../types";
import { TASK_STATUS } from "./TasksView.component";
import { useForm } from "react-hook-form";

type IProps = {
  isShow: boolean;
  task: ITask | null;
  handleClose: () => void;
  handleUpdateDetailedTask: (updatedTaskData: ITaskFormValue) => void;
};

const inputClassname =
  "block px-2.5 pb-2.5 pt-4 w-full text-sm w-100 text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer";

const alertClassname =
  "text-red-500 border border-red-500 bg-red-100 text-sm p-2 text-center w-100 rounded-md";

const labelClassname = "absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1";

const DetailedTaskModal: React.FC<IProps> = ({
  task,
  isShow,
  handleClose,
  handleUpdateDetailedTask,
}) => {

  // Form state.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITaskFormValue>();


  // Status object.
  const statusObject: IStatus = TASK_STATUS.find((status) => status.value === task?.status)!;

  // Render
  return (
    <Modal show={isShow} onHide={handleClose} className="modal">
      <Modal.Header closeButton className={`${statusObject?.bgColor} ${statusObject?.textColor}`}>
        <Modal.Title className="text-2xl font-bold">{task?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-gray-800 text-lg p-4">

        <form
          id="task-form"
          className="flex flex-col justify-start items-start gap-3"
          onSubmit={handleSubmit(handleUpdateDetailedTask)}
        >

          {/* TITLE */}
          <div className="relative w-100">
                <input
                  id="title"
                  className={inputClassname}
                  {...register("title", { maxLength: 20 })}
                  placeholder=" "
                />

                <label
                  htmlFor="title"
                  className={labelClassname}
                >
                  Title
                </label>
          </div>
          {errors.title && (
            <div className={alertClassname}>{errors.title.message}</div>
          )}


          {/* DESCRIPTION */}

          <div className="relative w-100">
                <textarea
                  id="description"
                  className={inputClassname}
                  {...register("description", { maxLength: 20 })}
                  placeholder=" "
                />

                <label
                  htmlFor="description"
                  className={labelClassname}
                >
                  Description
                </label>
              </div>
              {errors.description && (
            <div className={alertClassname}>{errors.description.message}</div>
          )}
        </form>

        

        

      </Modal.Body>
      <Modal.Footer className="flex justify-end p-4">
        {/* Add any additional footer elements here */}
        <Button variant="secondary"
          className="bg-gray-400" onClick={handleClose}>
          Close
        </Button>
        <Button
          className={`${statusObject?.bgColor}`}
          type="submit"
          form="task-form"
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DetailedTaskModal;