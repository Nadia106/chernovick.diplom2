import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../store/users";

const UserCard = () => {
  const history = useHistory();
  const currentUser = useSelector(getCurrentUserData());
  const handleClick = () => {
    history.push(history.location.pathname + "/edit");
  };
  return (
    <div className="card mb-3">
      <div className="card-body">
        <button
          className="position-absolute top-0 end-0 btn btn-light btn-sm"
          onClick={handleClick}
        >
          <i className="bi bi-gear"></i>
        </button>
        <div className="d-flex flex-column align-items-center text-center position-relative">
          <img src={currentUser.image} className="rounded-circle" width="150" />
          <div className="mt-3">
            <h4>{currentUser.name}</h4>
            <p>Избранное</p>
            <p>Корзина</p>
            <p className="text-secondary mb-1">{currentUser.phoneNumber}</p>
            <div className="text-muted"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

