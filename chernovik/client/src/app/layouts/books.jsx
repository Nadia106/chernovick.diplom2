import React from "react";
import { useParams } from "react-router-dom";
import BookPage from "../components/page/bookPage";
import BooksList from "../components/page/booksList";

const Books = () => {
  const params = useParams();
  const { bookId } = params;
  return (
    <>

        {bookId ? <BookPage bookId={bookId} /> : <BooksList />}

    </>
  );
};

export default Books;
