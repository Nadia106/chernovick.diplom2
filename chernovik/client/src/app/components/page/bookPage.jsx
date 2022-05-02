import React from "react";
import PropTypes from "prop-types";
import BookCard from "../ui/bookCard";
import GenresCard from "../ui/genresCard";
import DescriptionCard from "../ui/descriptionCard";
import Comments from "../ui/comments";
import BackHistoryButton from "../common/backButton";
import { useSelector } from "react-redux";
import { getBookById } from "../../store/book";

const BookPage = ({ bookId }) => {
  const book = useSelector(getBookById(bookId));
  if (book) {
    return (
      <div className="container">
        <div>
          <BackHistoryButton />
        </div>
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <BookCard book={book} />
            <GenresCard data={book.genres} />
          </div>
          <div className="col-md-8">
            <DescriptionCard value={book.description} />
            <Comments />
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>Loading...</h1>;
  }
};
BookPage.propTypes = {
  boolId: PropTypes.string
};

export default BookPage;
