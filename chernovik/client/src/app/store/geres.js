import { createSlice } from "@reduxjs/toolkit";
import genresService from "../services/genres.service";
import { isOutdated } from "../utils/isOutdated";

const genresSlice = createSlice({
  name: "genres",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    genresRequested: (state) => {
      state.isLoading = true;
    },
    genresReceived: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    genresRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: genresReducer, actions } = genresSlice;

const { genresRequested, genresReceived, genresRequestFiled } = actions;

export const loadGenresList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().genres;
  if (isOutdated(lastFetch)) {
    dispatch(genresRequested());
    try {
      const { content } = await genresService.fetchAll();
      dispatch(genresReceived(content));
    } catch (error) {
      dispatch(genresRequestFiled(error.message));
    }
  }
};

export const getGentes = () => (state) => state.genres.entities;
export const getGenresLoadingStatus = () => (state) => state.genres.isLoading;

export const getGenresByIds = (genresIds) => (state) => {
  if (state.genres.entities) {
    const genresArray = [];
    for (const genreId of genresIds) {
      for (const genre of state.genres.entities) {
        if (genre._id === genreId) {
          genresArray.push(genre);
          break;
        }
      }
    }
    return genresArray;
  }
  return [];
};

export default genresReducer;
