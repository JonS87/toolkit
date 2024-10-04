import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetail, /*clearMovieDetail,*/ addToFavorites } from '../features/movieSlice';
import { AppDispatch, RootState } from '../store/store';
import { useParams, useNavigate } from 'react-router-dom';

const MovieDetailView: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const { movieDetail, loading, error } = useSelector((state: RootState) => state.movies);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetail(id));
    }/*
    return () => {
      dispatch(clearMovieDetail());
    }*/;
  }, [id, dispatch]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;
  if (!movieDetail) return <div>Детали фильма не найдены</div>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>Назад</button>
      <h2>{movieDetail.Title}</h2>
      <img src={movieDetail.Poster} alt={movieDetail.Title} />
      <p>Год: {movieDetail.Year}</p>
      <p>Жанр: {movieDetail.Genre}</p>
      <p>Продолжительность: {movieDetail.Runtime}</p>
      <p>Режиссер: {movieDetail.Director}</p>
      <p>Актеры: {movieDetail.Actors}</p>
      <p>Рейтинг: {movieDetail.imdbRating}</p>
      <button onClick={() => dispatch(addToFavorites(movieDetail))}>⭐️</button>
    </div>
  );
};

export default MovieDetailView;
