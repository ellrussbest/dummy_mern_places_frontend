import "./LoadingSpinner.css";

const LoadingSpinner = ({ obj }) => {
  const { asOverlay } = obj || {};
  return (
    <div className={`${asOverlay && "loading-spinner__overlay"}`}>
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default LoadingSpinner;
