import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import "./ImageUpload.css";

const ImageUpload = ({ obj }) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const { id, center, onInput, errorText } = obj || {};
  const filePickerRef = useRef();

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  useEffect(() => {
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (e) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }

    onInput(id, pickedFile, fileIsValid);
  };

  return (
    <div className="form-control">
      <input
        id={id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg, .png, .jpeg"
        onChange={pickedHandler}
      />

      <div className={`image-upload ${center && "center"}`}>
        {/* <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>

        <Button obj={{ type: "button", onClick: pickImageHandler }}>
          PICK IMAGE
        </Button> */}

        <Button
          obj={{
            type: "button",
            onClick: pickImageHandler,
            style: { background: "white", border: "none", color: "black" },
          }}
        >
          <div className="image-upload__preview">
            {previewUrl && <img src={previewUrl} alt="Preview" />}
            {!previewUrl && <p>Please pick an image.</p>}
          </div>
        </Button>
      </div>
      {!isValid && <p>{errorText}</p>}
    </div>
  );
};

export default ImageUpload;
