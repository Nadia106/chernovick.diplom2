import React, { useEffect } from "react";
import Genre from "./genre";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getGenresByIds, getGenresLoadingStatus, loadGenresList } from "../../../store/geres";

const GenresList = ({ genres }) => {
  const dispatch = useDispatch()
  const isLoading = useSelector(getGenresLoadingStatus());
  const genresList = useSelector(getGenresByIds(genres));


  useEffect(()=> {
    dispatch(loadGenresList())
  }, [])
  if (isLoading) return "Loading";

  return (
    <div>
      {genresList.map((genre) => (
        <Genre key={genre._id} {...genre} />
      ))}
    </div>
  );
};
GenresList.propTypes = {
  genres: PropTypes.array
};

export default GenresList;
