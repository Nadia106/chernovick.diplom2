import { combineReducers, configureStore } from "@reduxjs/toolkit";
import booksReducer from "./book";
import commentsReducer from "./comments";
import genresReducer from "./geres";
import usersReducer from "./users";

const rootReducer = combineReducers({
  genres: genresReducer,
  users: usersReducer,
  books: booksReducer,
  comment: commentsReducer
});

export function createStore() {
  return configureStore({
    reducer: rootReducer
  });
}
