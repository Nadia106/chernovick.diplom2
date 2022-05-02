import React, { useState, useEffect } from "react";
import Pagination from "../common/pagination";
import GroupList from "../common/groupList";
import SearchStatus from "../ui/searchStatus";
import PropTypes from "prop-types";
import BookTable from "../ui/bookTable";
import _ from "lodash";
import { useSelector } from "react-redux";
import { getGenresLoadingStatus, getGentes } from "../../store/geres";
import { getBooksList } from "../../store/book";

const BooksList = () => {
  const books = useSelector(getBooksList())

  const genres = useSelector(getGentes());
  const genresLoading = useSelector(getGenresLoadingStatus());

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const pageSize = 10;

  // const [inBasket, setInBasket] = useState();

  // useEffect(() => {
  //   api.books.fetchAll().then((data) => setBooks(data));
  // });

  const handleAddInBasket = (id) => {
    const newArray = books.map((book) => {
      if (book._id === id) {
        return { ...book, addedInBasket: !book.addedInBasket };
      }
      return book;
    });
    // setBooks(newArray)
    console.log(newArray);
  };

  const handleAddInFavourite = (id) => {
    const newArray = books.map((book) => {
      if (book._id === id) {
        return { ...book, favourite: !book.favourite };
      }
      return book;
    });
    // setBooks(newArray)
    console.log(newArray);
  };
  // const [countInBasket, setCountinBasket] = useState(0)
  //
  // const handleIncrement = () => {
  //     setCountinBasket()
  // }

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedGenre, searchQuery]);

  const handleGenreSelect = (item) => {
    if (searchQuery !== "") setSearchQuery("");
    setSelectedGenre(item);
  };

  const handleSeachQuery = ({ target }) => {
    setSelectedGenre(undefined);
    setSearchQuery(target.value);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return [...items].splice(startIndex, pageSize);
  };

  if (books) {
    const filteredBooks = searchQuery
      ? books.filter(
          (book) =>
            book.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
        )
      : selectedGenre
      ? books.filter(
          (book) =>
            JSON.stringify(book.genres.find((item, index, arr) => item)) ===
            JSON.stringify(selectedGenre._id)
        )
      : books;

    const count = filteredBooks.length;
    const sortedBooks = _.orderBy(filteredBooks, [sortBy.path], [sortBy.order]);
    const booksCrop = paginate(sortedBooks, currentPage, pageSize);
    const clearFilter = () => {
      setSelectedGenre();
    };
    return (
      <div className="d-flex">
        {genres && !genresLoading && (
          <div className="d-flex flex-column flex-shrink-0 p-2">
            <GroupList
              selectedItem={selectedGenre}
              items={genres}
              onItemSelect={handleGenreSelect}
            />
            <button className="btn btn-info mt-2" onClick={clearFilter}>
              Очистить
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <SearchStatus length={count} />
          <input
            type="text"
            name="searchQuery"
            placeholder="Поиск"
            onChange={handleSeachQuery}
            value={searchQuery}
          />
          {count > 0 && (
            <BookTable
              books={booksCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onAddInBasket={handleAddInBasket}
              onAddInFavourite={handleAddInFavourite}
            />
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    );
  }
  return <h1>Loading...</h1>;
};
BooksList.propTypes = {
  books: PropTypes.array
};

export default BooksList;
