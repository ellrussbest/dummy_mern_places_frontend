import { createPortal } from "react-dom";

import "./Backdrop.css";

const Backdrop = ({ obj }) => {
  const { onClick } = obj || {};
  return createPortal(
    <div className="backdrop" onClick={onClick}></div>,
    document.getElementById("backdrop-hook")
  );
};

export default Backdrop;
