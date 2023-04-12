import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./PlaceForm.css";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";

const UpdatePlace = () => {
  const placeId = useParams().placeId;
  const { sendRequest, clearError, error, isLoading } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState();
  const navigate = useNavigate();
  const { userId, token } = useContext(AuthContext);

  const [formState, inputHandler, setFormData] = useForm({
    initialInputs: {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    initialFormValidity: false,
  });

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`
        );
        setLoadedPlaces(responseData.place);
        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (error) {}
    };

    fetchPlace();
  }, [sendRequest, placeId, setFormData]);

  const placeUpdateSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }
      );

      navigate(`/${userId}/places`);
    } catch (error) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (
    !isLoading &&
    loadedPlaces !== undefined &&
    !loadedPlaces &&
    error === undefined
  ) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <>
      <ErrorModal obj={{ error, onClear: clearError }} />
      {!isLoading && loadedPlaces && (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
          <Input
            obj={{
              id: "title",
              element: "input",
              type: "text",
              label: "Title",
              validators: [VALIDATOR_REQUIRE()],
              errorText: "Please enter a valid title.",
              onInput: inputHandler,
              value: formState.inputs.title.value,
              valid: formState.inputs.title.isValid,
            }}
          />

          <Input
            obj={{
              id: "description",
              element: "textarea",
              label: "Description",
              validators: [VALIDATOR_MINLENGTH(5)],
              errorText:
                "Please enter a valid description (min. 5 characters).",
              onInput: inputHandler,
              value: formState.inputs.description.value,
              valid: formState.inputs.description.isValid,
            }}
          />
          <Button
            obj={{
              type: "submit",
              disabled: !formState.isValid,
            }}
          >
            {" "}
            UPDATE PLACE{" "}
          </Button>
        </form>
      )}
    </>
  );
};

export default UpdatePlace;
