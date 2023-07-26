import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

type IProps = {
  isShow: boolean;
  handleClose: () => void;
  handleCreateTask: () => void;
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
  } = useForm<ITaskFormValue>();
  

  return (
    <Modal isShow={isShow} onHide={handleClose} className="modal">

    </Modal>
  )

}