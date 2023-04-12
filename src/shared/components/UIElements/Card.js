import "./Card.css";

const Card = ({ obj, children }) => {
  const { className, style } = obj || {};

  return (
    <div className={`${className} card`} style={style}>
      {children}
    </div>
  );
};

export default Card;
