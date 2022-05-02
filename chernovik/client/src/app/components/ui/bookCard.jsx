import React from "react";
import PropTypes from "prop-types";
import Favourite from "../common/favourite";
import Basket from "../common/basket";

const BookCard = ({ book }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex flex-column align-items-center text-center position-relative">
          <img src={book.img} alt="avatar" width="140" height="250" />
          <div className="mt-3">
            <h4>{book.name}</h4>
            <p className="text-secondary mb-1">{book.author}</p>
            <div className="text-muted">
              <span className="ms-2">{`Оценка: ${book.rate}`}</span>
              <div className="m-2">
                <Basket />
              </div>
              <div className="m-2">
                <Favourite />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
BookCard.propTypes = {
  book: PropTypes.object
};

export default BookCard;
