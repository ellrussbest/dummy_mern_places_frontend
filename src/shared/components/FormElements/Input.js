import { useReducer, useEffect } from "react";
import { validate } from "../../util/validators";
import "./Input.css";

// reducer function
const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = ({ obj }) => {
  let {
    element,
    id,
    type,
    placeholder,
    rows,
    label,
    validators,
    errorText,
    onInput,
    value: propsValue,
    valid,
  } = obj || {};
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: propsValue || "",
    isValid: valid || false,
    isTouched: false,
  });

  const { value, isValid, isTouched } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  element =
    element === "input" ? (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={changeHandler}
        value={value}
        onBlur={touchHandler}
      />
    ) : (
      <textarea
        id={id}
        rows={rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={value}
      />
    );

  return (
    <div
      className={`form-control ${
        !isValid && isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={id}>{label}</label>
      {element}
      {!isValid && isTouched && <p>{errorText}</p>}
    </div>
  );
};

export default Input;

/**
 * There are third party library that you can get form functionalities for free e.g.
 * FORMIK
 *
 * often when you have kind of two connected states, for example a state that validates an input value
 * this means that the validity depends on the input value
 * It is better to use useReducer instead of multiple useStates
 *
 * useReducer is great when we have a more COMPLEX state, or when we have INTERCONNECTED states
 *
 * useReducer(reducer, initial_state)
 * reducer is just a function which receives an action which we can dispatch; the function also receives the current state
 * after receiving the current state it updates the current state based on the action it received then use reducer will
 * return the updated state the re-render the component
 *
 */
