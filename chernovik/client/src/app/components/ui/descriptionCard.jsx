import React from "react";
import PropTypes from "prop-types";

const DescriptionCard = ({ value }) => {
  return (
    <div className="card mb-2">
      <div className="card-body ">
        <h5 className="card-title">
          <span>Описание</span>
        </h5>
        <p>{value}</p>
      </div>
    </div>
  );
};
DescriptionCard.propTypes = {
  value: PropTypes.string
};

export default DescriptionCard;
//d-flex flex-column justify-content-center text-center
