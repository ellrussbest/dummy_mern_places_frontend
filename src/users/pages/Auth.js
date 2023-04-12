import { useContext, useState } from "react";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./Auth.css";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

const Auth = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { login } = useContext(AuthContext);

  const [formState, inputHandler, setFormData] = useForm({
    initialInputs: {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    initialFormValidity: false,
  });
  const [isLoginMode, setIsLoginMode] = useState(true);

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        { ...formState.inputs, name: undefined, image: undefined },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
          image: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };
  const authSubmitHandler = async (e) => {
    e.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        login(responseData.userId, responseData.token);
      } catch (error) {}
    } else {
      try {
        const formData = new FormData();
        formData.append("email", formState.inputs.email.value);
        formData.append("name", formState.inputs.name.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);

        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
          "POST",
          formData
        );
        login(responseData.userId, responseData.token);
      } catch (error) {}
    }
  };

  return (
    <>
      <ErrorModal
        obj={{
          error: error,
          onClear: clearError,
        }}
      />

      <Card
        obj={{
          className: "authentication",
        }}
      >
        {isLoading && <LoadingSpinner obj={{ asOverlay: true }} />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              obj={{
                element: "input",
                id: "name",
                type: "text",
                label: "Your Name",
                validators: [VALIDATOR_REQUIRE()],
                errorText: "Please enter a name",
                onInput: inputHandler,
              }}
            />
          )}
          {!isLoginMode && (
            <ImageUpload
              obj={{
                id: "image",
                center: true,
                onInput: inputHandler,
                errorText: "Please provide an image",
              }}
            />
          )}
          <Input
            obj={{
              id: "email",
              element: "input",
              type: "email",
              label: "E-Mail",
              validators: [VALIDATOR_EMAIL()],
              errorText: "Please enter a valid Email",
              onInput: inputHandler,
            }}
          />
          <Input
            obj={{
              id: "password",
              element: "input",
              type: "password",
              label: "Password",
              validators: [VALIDATOR_MINLENGTH(6)],
              errorText:
                "Please enter a valid password, at least 6 characters.",
              onInput: inputHandler,
            }}
          />
          <Button
            obj={{
              type: "submit",
              disabled: !formState.isValid,
            }}
          >
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button obj={{ inverse: true, onClick: switchModeHandler }}>
          SWITCH TO {isLoginMode ? "SIGNUP" : "Login"}
        </Button>
      </Card>
    </>
  );
};

export default Auth;
