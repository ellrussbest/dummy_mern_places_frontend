import { useContext, useState } from "react";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";

import "./PlaceItem.css";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const PlaceItem = ({ obj }) => {
  const { isLoggedIn, userId, token } = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const {
    id,
    image,
    title,
    description,
    address,
    onDelete,
    creator,
    location: coordinates,
  } = obj || {};

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + token,
        }
      );
      onDelete(id);
    } catch (error) {}
  };

  const style = {
    padding: 0,
  };

  return (
    <>
      <ErrorModal obj={{ error, onClear: clearError }} />
      <Modal
        obj={{
          show: showMap,
          onCancel: closeMapHandler,
          header: address,
          contentClass: "place-item__modal-content",
          footerClass: "place-item__modal-actions",
          footer: <Button obj={{ onClick: closeMapHandler }}>CLOSE</Button>,
        }}
      >
        <div className="map-container">
          <Map
            obj={{
              center: coordinates,
              zoom: 16,
            }}
          />
        </div>
      </Modal>

      <Modal
        obj={{
          show: showConfirmModal,
          onCancel: cancelDeleteHandler,
          header: "Are you sure?",
          footerClass: "place-item__modal-actions",
          footer: (
            <>
              <Button obj={{ inverse: true, onClick: cancelDeleteHandler }}>
                CANCEL
              </Button>
              <Button obj={{ danger: true, onClick: confirmDeleteHandler }}>
                DELETE
              </Button>
            </>
          ),
        }}
      >
        <p>
          Do you want to proceed and delete this place? Please not that it can't
          be undone therearefter
        </p>
      </Modal>
      <li className="place-item">
        <Card obj={{ style: style }}>
          {isLoading && <LoadingSpinner obj={{ asOverlay: true }} />}
          <div className="place-item__image">
            <img
              src={`${process.env.REACT_APP_ASSET_URL}/${image}`}
              alt={title}
            />
          </div>
          <div className="place-item__info">
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className="place-item__actions">
            <Button obj={{ inverse: true, onClick: openMapHandler }}>
              VIEW ON MAP
            </Button>
            {isLoggedIn && creator === userId && (
              <Button obj={{ to: `/places/${id}` }}>EDIT</Button>
            )}
            {isLoggedIn && creator === userId && (
              <Button obj={{ danger: true, onClick: showDeleteWarningHandler }}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
