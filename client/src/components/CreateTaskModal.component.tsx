import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ICreateTaskForm } from "../types";
import {
  inputClassname,
  labelClassname,
  alertClassname
} from '../../utils/constants';
import {
  TASK_STATUS
} from './TasksView.component';

type IProps = {
  isShow: boolean;
  handleClose: () => void;
  handleCreateTask: (createTaskValue: ICreateTaskForm) => void;
};


const CreateTaskModal: React.FC<IProps> = ({
  isShow,
  handleClose,
  handleCreateTask,
}) => {

  // Form state.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateTaskForm>();

  return (
    <Modal show={isShow} onHide={handleClose} className="modal">
      <Modal.Header closeButton className='bg-white'>
        <Modal.Title className="text-2xl font-bold">Create Task</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-gray-800 text-lg p-4">
        <form
          id="create-task-form"
          className="flex flex-col justify-start items-start gap-3"
          onSubmit={handleSubmit(handleCreateTask)}
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

          {/* STATUS */}
          <div className="relative w-100">
            <select
              id="status"
              className={inputClassname} // Replace this with the appropriate classname for styling the select input.
              {...register("status", { required: 'Status is required' })}
            >
              <option value="">Select Status</option>
              {TASK_STATUS.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>

            <label htmlFor="status" className={labelClassname}>Status</label>
          </div>
          {errors.status && (
            <div className={alertClassname}>{errors.status.message}</div>
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
          type="submit"
          form="create-task-form"
          className="bg-blue-500"
        >
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  )

};

export default CreateTaskModal;