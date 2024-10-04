import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import store from './store/store';
import SearchMovies from './components/SearchMovies';
import Favorites from './components/Favorites';
import MovieDetailView from './components/MovieDetailView';
import NotFound from './components/NotFound';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <nav>
            <Link to="/">Поиск</Link>
            <Link to="/favorites">Избранное</Link>
          </nav>
        </div>
        <Routes>
          <Route path="/" element={<SearchMovies />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:id" element={<MovieDetailView />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
