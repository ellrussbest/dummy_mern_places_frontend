import { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadUsers, setLoadedUsers] = useState();

  // useEffect doesn't like a function that returns a promise
  // instead you can create another function (IIFE) within the useEffect that
  // returns a promise
  /**
   * an IIFE (Immediately Invoked Function Expression) is a javascript function that runs as soon as it is defined.
   */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users`
        );

        setLoadedUsers(responseData.users);
      } catch (error) {}
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <>
      <ErrorModal
        obj={{
          error: error,
          onClear: clearError,
        }}
      />

      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadUsers && <UsersList obj={{ items: loadUsers }} />}
    </>
  );
};

export default Users;
