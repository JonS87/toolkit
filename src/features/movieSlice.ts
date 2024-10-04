import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '64405bd2';

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
}

export interface MovieDetail {
  Title: string;
  Year: string;
  Genre: string;
  Runtime: string;
  Director: string;
  Actors: string;
  imdbRating: string;
  Poster: string;
  Plot: string;
}

interface MovieState {
  searchResults: Movie[];
  favorites: Movie[];
  movieDetail: MovieDetail | null;
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  searchResults: [],
  favorites: [],
  movieDetail: null,
  loading: false,
  error: null,
};

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (searchTerm: string) => {
  const response = await axios.get(`https://www.omdbapi.com?apikey=${API_KEY}&s=${searchTerm}`);
  return response.data.Search || [];
});

export const fetchMovieDetail = createAsyncThunk('movies/fetchMovieDetail', async (id: string) => {
  const response = await axios.get(`https://www.omdbapi.com?apikey=${API_KEY}&i=${id}`);
  return response.data as MovieDetail;
});

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(movie => movie.imdbID !== action.payload);
    },
    setMovieDetail: (state, action) => {
      state.movieDetail = action.payload;
    },
    clearMovieDetail: (state) => {
      state.movieDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching movies';
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        state.movieDetail = action.payload;
      });
  },
});

export const { addToFavorites, removeFromFavorites, setMovieDetail, clearMovieDetail } = movieSlice.actions;

export default movieSlice.reducer;
