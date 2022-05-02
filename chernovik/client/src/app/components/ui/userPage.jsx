import React from "react";
import PropTypes from "prop-types";
import UserCard from "./userCard";
import { useSelector } from "react-redux";
import { getUserById } from "../../store/users";

const UserPage = ({ userId }) => {
  const user = useSelector(getUserById(userId));
  if (user) {
    return (
      <div className="container">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserCard />
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>Loading...</h1>;
  }
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
};
export default UserPage;
