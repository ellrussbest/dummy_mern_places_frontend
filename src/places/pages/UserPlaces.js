import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useEffect, useState } from "react";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const UserPlaces = () => {
  // useParams returns the dynamic values rendered on our url on an object
  const userId = useParams().userId;
  const { sendRequest, isLoading, error, clearError } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
        );
        setLoadedPlaces(responseData.places);
      } catch (err) {}
    };

    fetchPlaces();
  }, [sendRequest, userId]);

  const placeDeletedHandler = (id) => {
    setLoadedPlaces((loadedPlaces) =>
      loadedPlaces.filter((places) => places.id !== id)
    );
  };

  return (
    <>
      <ErrorModal obj={{ error, onClear: clearError }} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList
          obj={{ items: loadedPlaces, onDeletePlace: placeDeletedHandler }}
        />
      )}
    </>
  );
};

export default UserPlaces;
