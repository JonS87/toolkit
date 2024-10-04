import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMovies/*, fetchMovieDetail*/  } from '../features/movieSlice';
import { AppDispatch } from '../store/store';
import MovieList from './MovieList';
// import { useNavigate } from 'react-router-dom';


const SearchMovies: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearched, setIsSearched] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  // const navigate = useNavigate();

  const handleSearch = async () => {
    if (searchTerm) {
      setIsSearched(true);
      dispatch(fetchMovies(searchTerm));
      // const movies = await dispatch(fetchMovies(searchTerm));
      // if (movies.payload.length === 0) {
      //   await dispatch(fetchMovieDetail(searchTerm));
      // }
      // navigate('/');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Поиск фильмов"
      />
      <button onClick={handleSearch}>Поиск</button>
      <MovieList isSearched={isSearched} />
    </div>
  );
};

export default SearchMovies;
