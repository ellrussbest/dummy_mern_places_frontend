import Card from "../../shared/components/UIElements/Card";
import UserItem from "./UserItem";
import "./UsersList.css";

const UsersList = ({ obj }) => {
  const { items } = obj || {};
  return items.length === 0 ? (
    <div className="center">
      {" "}
      <Card>
        <h2>No users found.</h2>
      </Card>
    </div>
  ) : (
    <ul className="users-list">
      {items.map((user) => (
        <UserItem key={user.id} obj={{ user: user }} />
      ))}
    </ul>
  );
};

export default UsersList;
