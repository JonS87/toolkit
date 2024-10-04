import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites } from '../features/movieSlice';
import { RootState } from '../store/store';
import { Link } from 'react-router-dom';
import styles from './components.module.css';

interface MovieListProps {
  isSearched: boolean;
}

const MovieList: React.FC<MovieListProps> = ({ isSearched }) => {
  const { searchResults, loading, error } = useSelector((state: RootState) => state.movies);
  const dispatch = useDispatch();

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;
  if (isSearched && searchResults.length === 0) return <div>Фильмы не найдены</div>;

  return (
    <div>
      <h2>Результаты поиска:</h2>
      <ul>
        {searchResults.map(movie => (
          <li key={movie.imdbID} className={styles['styles']}>
            <h3>
              <Link to={`/movie/${movie.imdbID}`}>{movie.Title} ({movie.Year})</Link>
            </h3>
            <img src={movie.Poster} alt={movie.Title} />
            <button
              className={styles['movie-favorite']}
              onClick={() => dispatch(addToFavorites(movie))}>⭐️</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
