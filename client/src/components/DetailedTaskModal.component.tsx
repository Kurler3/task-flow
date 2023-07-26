import { Button, Modal } from "react-bootstrap";
import { ITask } from "../types";

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
  return (
    <Modal show={isShow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{task?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
      </Modal.Body>
      <Modal.Footer>

      </Modal.Footer>
    </Modal>
  )
}

export default DetailedTaskModal;