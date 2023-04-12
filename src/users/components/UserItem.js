/**
 * We use Link from react router dom because the normal achor tags makes the page reload
 * and we don't want that.
 */
import Avatar from "../../shared/components/UIElements/Avatar";
import { Link } from "react-router-dom";

import "./UserItem.css";
import Card from "../../shared/components/UIElements/Card";


const UserItem = ({ obj }) => {
  const { user } = obj || {};
  const { id, name, image, places: placeCount } = user || {};
  const style = {
    padding: 0,
  };

  return (
    <li className="user-item">
      <Card obj={{ style: style }}>
        <Link to={`/${id}/places`}>
          <div className="user-item__image">
            <Avatar
              obj={{
                image: `${process.env.REACT_APP_ASSET_URL}/${image}`,
                alt: name,
              }}
            />
          </div>
          <div className="user-item__info">
            <h2>{name}</h2>
            <h3>
              {placeCount.length} {placeCount.length === 1 ? "Place" : "Places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
