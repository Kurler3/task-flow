import { Button, Modal } from "react-bootstrap";

type IProps = {
  isShow: boolean;
  isLogin: boolean;
  handleClose: () => void;
}

const AuthModal: React.FC<IProps> = ({
  isShow,
  isLogin,
  handleClose,
}) => {

  return (
    <Modal show={isShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isLogin ? 'Login' : 'Register'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
  )
};

export default AuthModal;