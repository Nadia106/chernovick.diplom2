import React from "react";
import PropTypes from "prop-types";
import Favourite from "../common/favourite";
import Basket from "../common/basket";
import GenresList from "./genres/genresList";
import Table from "../common/table/table";
import { Link } from "react-router-dom";

const BookTable = ({
  books,
  onSort,
  selectedSort,
  onAddInFavourite,
  onAddInBasket,
  img,
  ...rest
}) => {
  const columns = {
    img: {
      path: "image",
      component: (book) => (
        <img src={book.img} alt="avatar" width="45" height="65" />
      )
    },
    name: {
      path: "name",
      name: "Название",
      component: (book) => <Link to={`/books/${book._id}`}>{book.name}</Link>
    },
    author: { path: "author", name: "Автор" },
    genres: {
      name: "Жанр",
      component: (book) => <GenresList genres={book.genres} />
    },
    favourite: {
      name: "Избранное",
      component: (book) => (
        <Favourite
          status={book.favourite}
          onClick={() => onAddInFavourite(book._id)}
        />
      )
    },
    addedInBasket: {
      component: (book) => (
        <Basket
          status={book.addedInBasket}
          onClick={() => onAddInBasket(book._id)}
        />
      )
    }
  };
  return (
    <table className="table">
      <Table
        onSort={onSort}
        selectedSort={selectedSort}
        columns={columns}
        data={books}
      />
    </table>
  );
};

BookTable.propTypes = {
  books: PropTypes.array,
  onSort: PropTypes.func,
  currentSort: PropTypes.object,
  onAddInFavourite: PropTypes.func,
  img: PropTypes.string
};
export default BookTable;
