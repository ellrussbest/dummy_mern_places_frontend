// import UserPlaces from "./places/pages/UserPlaces";
// import NewPlace from "./places/pages/NewPlace";
// import UpdatePlace from "./places/pages/UpdatePlace";
// import Users from "./users/pages/Users";
// import Auth from "./users/pages/Auth";


import MainNavigation from "./shared/components/Navigation/MainNavigation";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import { lazy, Suspense } from "react";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";

const Users = lazy(() => import("./users/pages/Users"));
const NewPlace = lazy(() => import("./places/pages/NewPlace"));
const UpdatePlace = lazy(() => import("./places/pages/UpdatePlace"));
const Auth = lazy(() => import("./users/pages/Auth"));
const UserPlaces = lazy(() => import("./places/pages/UserPlaces"));

const Nav = ({ children }) => {
  return (
    <>
      <MainNavigation />
      <main>{children}</main>
    </>
  );
};

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <Nav>
//         <Users />
//       </Nav>
//     ),
//     errorElement: (
//       <Nav>
//         <Users />
//       </Nav>
//     ),
//   },
//   {
//     path: ":userId/places",
//     element: (
//       <Nav>
//         <UserPlaces />
//       </Nav>
//     ),
//   },
//   {
//     path: "places/new",
//     element: (
//       <Nav>
//         <NewPlace />
//       </Nav>
//     ),
//   },
//   {
//     path: "places/:placeId",
//     element: (
//       <Nav>
//         <UpdatePlace />
//       </Nav>
//     ),
//   },
//   {
//     path: "auth",
//     element: (
//       <Nav>
//         <Auth />
//       </Nav>
//     ),
//   },
// ]);

function App() {
  const { token, login, logout, userId } = useAuth();

  let router;

  if (token) {
    router = createBrowserRouter([
      {
        path: "/",
        element: (
          <Nav>
            <Users />
          </Nav>
        ),
        errorElement: (
          <Nav>
            <Users />
          </Nav>
        ),
      },
      {
        path: ":userId/places",
        element: (
          <Nav>
            <UserPlaces />
          </Nav>
        ),
      },
      {
        path: "places/new",
        element: (
          <Nav>
            <NewPlace />
          </Nav>
        ),
      },
      {
        path: "places/:placeId",
        element: (
          <Nav>
            <UpdatePlace />
          </Nav>
        ),
      },
    ]);
  } else {
    router = createBrowserRouter([
      {
        path: "/",
        element: (
          <Nav>
            <Users />
          </Nav>
        ),
        errorElement: (
          <Nav>
            <Auth />
          </Nav>
        ),
      },
      {
        path: ":userId/places",
        element: (
          <Nav>
            <UserPlaces />
          </Nav>
        ),
      },
      {
        path: "auth",
        element: (
          <Nav>
            <Auth />
          </Nav>
        ),
      },
    ]);
  }
  return (
    <AuthContext.Provider
      value={{
        userId: userId,
        token: token,
        isLoggedIn: !!token,
        login: login,
        logout: logout,
      }}
    >
      <Suspense
        fallback={
          <div className="center">
            <LoadingSpinner />
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
    </AuthContext.Provider>
  );
}

export default App;
