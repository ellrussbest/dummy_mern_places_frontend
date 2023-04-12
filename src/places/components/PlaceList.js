import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";

import "./PlaceList.css";

const PlaceList = ({ obj }) => {
  const { items, onDeletePlace } = obj || {};

  if (items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found, Maybe create one?</h2>
          <Button
            obj={{
              to: "/places/new",
            }}
          >
            Share Place
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {items.map((place) => (
        <PlaceItem key={place.id} obj={{ ...place, onDelete: onDeletePlace }} />
      ))}
    </ul>
  );
};

export default PlaceList;
