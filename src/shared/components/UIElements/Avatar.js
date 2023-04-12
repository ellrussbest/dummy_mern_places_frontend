import './Avatar.css';

const Avatar = ({obj}) => {
  const { className, style, image, alt, width } = obj || {};
  return (
    <div className={`avatar ${className}`} style={style}>
      <img
        src={image}
        alt={alt}
        style={{ width: width, height: width }}
      />
    </div>
  );
};

export default Avatar;
