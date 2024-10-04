import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromFavorites } from '../features/movieSlice';
import { RootState } from '../store/store';
import styles from './components.module.css';

const Favorites: React.FC = () => {
  const { favorites } = useSelector((state: RootState) => state.movies);
  const dispatch = useDispatch();

  return (
    <ul>
      {favorites.map(movie => (
        <li key={movie.imdbID} className={styles['styles']}>
          <h3>
            <Link to={`/movie/${movie.imdbID}`}>{movie.Title} ({movie.Year})</Link>
          </h3>
          <img src={movie.Poster} alt={movie.Title} />
          <button onClick={() => dispatch(removeFromFavorites(movie.imdbID))}>Удалить из Избранного</button>
        </li>
      ))}
    </ul>
  );
};

export default Favorites;
