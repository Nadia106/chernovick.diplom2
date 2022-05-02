import { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoggedIn } from "../../../store/users";
import { getBooksLoadingStatus, loadBooksList } from "../../../store/book";
import { loadGenresList } from "../../../store/geres";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());
  const booksLoadingStatus = useSelector(getBooksLoadingStatus());

  useEffect(() => {
    // dispatch(loadGenresList());
    if (isLoggedIn) {
      dispatch(loadGenresList());
      dispatch(loadBooksList());
    }
  }, [isLoggedIn]);
  if (booksLoadingStatus) return "Loading...";
  return children;
};

AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default AppLoader;
