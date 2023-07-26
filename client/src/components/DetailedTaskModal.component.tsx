import { Button, Modal } from "react-bootstrap";
import { IStatus, ITask } from "../types";
import { TASK_STATUS } from "./TasksView.component";

type IProps = {
  isShow: boolean;
  task: ITask | null;
  handleClose: () => void;
};

const DetailedTaskModal: React.FC<IProps> = ({
  task,
  isShow,
  handleClose,
}) => {

  

  // Status object.
  const statusObject: IStatus = TASK_STATUS.find((status) => status.value === task?.status)!;

  // Render
  return (
    <Modal show={isShow} onHide={handleClose} className="modal">
      <Modal.Header closeButton className={`${statusObject?.bgColor} ${statusObject?.textColor}`}>
        <Modal.Title className="text-2xl font-bold">{task?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-gray-800 text-lg p-4">

        {/* TITLE */}

        {/* DESCRIPTION */}

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