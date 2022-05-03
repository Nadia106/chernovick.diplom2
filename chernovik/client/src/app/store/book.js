import { createSlice, createAction } from "@reduxjs/toolkit";
import bookService from "../services/book.service";
import history from "../utils/history";

const booksSlice = createSlice({
  name: "books",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    booksRequested: (state) => {
      state.isLoading = true;
    },
    booksReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    booksRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    bookCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    }
  }
});

const { reducer: booksReducer, actions } = booksSlice;

const { booksRequested, booksReceived, booksRequestFiled, bookCreated } =
  actions;

const bookCreateRequested = createAction("books/bookCreateRequested");
const createBookFailed = createAction("books/createBookFailed");

export const loadBooksList = () => async (dispatch) => {
  dispatch(booksRequested());
  try {
    const { content } = await bookService.get();
    dispatch(booksReceived(content));
  } catch (error) {
    dispatch(booksRequestFiled(error.message));
  }
};

export function createBook(payload) {
  return async function (dispatch) {
    dispatch(bookCreateRequested());
    try {
      const { content } = await bookService.create(payload);
      dispatch(bookCreated(content));
      history.push("/books");
    } catch (error) {
      dispatch(createBookFailed(error.message));
    }
  };
}
console.log(createBook);

export const getBookById = (bookId) => (state) => {
  if (state.books.entities) {
    return state.books.entities.find((b) => bookId);
  }
};

export const getBooksList = () => (state) => state.books.entities;
export const getBooksLoadingStatus = () => (state) => state.books.isLoading;

export default booksReducer;
