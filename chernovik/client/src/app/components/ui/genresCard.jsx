import React from "react";
import Genreslist from "./genres/genresList";
import PropTypes from "prop-types";

const GenresCard = ({ data }) => {
  return (
    <div className="card mb-3">
      <div className="card-body d-flex flex-column justify-content-center text-center">
        <h5 className="card-title">
          <span>Жанры</span>
        </h5>
        <p className="card-text">
          <Genreslist genres={data} />
        </p>
      </div>
    </div>
  );
};
GenresCard.propTypes = {
  data: PropTypes.array
};

export default GenresCard;
