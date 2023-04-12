import Modal from "./Modal";
import Button from "../FormElements/Button";

const ErrorModal = ({ obj }) => {
  const { onClear, error } = obj || {};

  return (
    <Modal
      obj={{
        onCancel: onClear,
        header: "An Error Occured!",
        show: !!error,
        footer: <Button obj={{ onClick: onClear }}>Okay</Button>,
      }}
    >
      <p>{error}</p>
    </Modal>
  );
};

export default ErrorModal;
