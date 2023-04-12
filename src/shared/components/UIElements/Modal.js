import { createPortal } from "react-dom";
import Backdrop from "./Backdrop";
import { CSSTransition } from "react-transition-group";
import "./Modal.css";

const ModalOverlay = ({ obj, children }) => {
  const {
    className,
    style,
    headerClass,
    header,
    onSubmit,
    contentClass,
    footerClass,
    footer,
  } = obj || {};

  const content = (
    <div className={`modal ${className}`} style={style}>
      <header className={`modal__header ${headerClass}`}>
        <h2>{header}</h2>
      </header>
      <form onSubmit={onSubmit ? onSubmit : (e) => e.preventDefault()}>
        <div className={`modal__content ${contentClass}`}>{children}</div>
        <footer className={`modal__footer ${footerClass}`}>{footer}</footer>
      </form>
    </div>
  );

  return createPortal(content, document.getElementById("modal-hook"));
};

const Modal = ({ obj, children }) => {
  const { onCancel, show } = obj || {};

  return (
    <>
      {show && <Backdrop obj={{ onclick: onCancel }} />}
      <CSSTransition
        in={show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay obj={obj}>{children}</ModalOverlay>
      </CSSTransition>
    </>
  );
};

export default Modal;
