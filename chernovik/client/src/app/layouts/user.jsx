import React from "react";
import { useParams, Redirect } from "react-router-dom";
import EditUserPage from "../components/ui/editUserPage";
import UserPage from "../components/ui/userPage";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../store/users";
import Main from "./main";
import UsersLoader from "../components/ui/hoc/usersLoader";

const User = () => {
  const params = useParams();
  const { userId, edit } = params;
  const currentUserId = useSelector(getCurrentUserId())

  return (
    <>
      <UsersLoader>
          {userId ? (
            edit ? (
              userId === currentUserId ? (
                <EditUserPage />
              ) : (
                <Redirect to={`/users/${currentUserId}/edit`} />
              )
            ) : (
              <UserPage userId={userId} />
            )
          ) : (
            <Main />
          )}
      </UsersLoader>
    </>

  );
};
export default User;
