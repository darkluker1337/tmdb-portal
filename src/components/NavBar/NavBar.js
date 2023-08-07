import { useState } from 'react';
import { createContext } from 'react';
import './NavBar.css';
import { Routes, Route, NavLink, json, Link } from 'react-router-dom';
import { Movies } from '../Movies/Movies';
import { Actors } from '../Actors/Actors';
import { useDispatch, useSelector } from 'react-redux';
import { Movie } from '../Movie/Movie';
import { Actor } from '../Actor/Actor';
import { setCurrentPageOfActor, setCurrentPageOfMovie } from '../redux/Reducer';
import { ErrorPage } from '../Error/ErrorPage';

export const Container = createContext();

export function NavBar() {
  // const movieRoute = JSON.parse(useSelector(state => state.toolkit.movieId))
  // const movieRouteId =  movieRoute ? movieRoute : ''

  const actorRoute = JSON.parse(useSelector((state) => state.toolkit.actorId));
  const actorRouteId = window.location.href.match(/\d+$/gi);
  let linkActor = actorRoute
    ? `/id_actor:${actorRoute}`
    : `/id_actor:${actorRouteId}`;

  const [searchValue, setSearchValue] = useState('');
  const [selected, setSelected] = useState('now_playing');
  const filetr = selected;
  const dispatch = useDispatch();

  const linkId = JSON.parse(useSelector((state) => state.toolkit.movieId));
  const hrefMovieId = window.location.href.match(/\d+$/gi);
  let link = linkId ? `/id:${linkId}` : `/id:${hrefMovieId}`;
  const [currentPageType, setCurrentPageType] = useState(true);
  const debounce = (cb, dellay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => cb(...args), dellay);
    };
  };
  const handleChangefilterAndToPageOne = (e) => {
    setSelected(e);
    dispatch(setCurrentPageOfMovie(1));
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };
  const debouncedLog = debounce(handleChange, 500);
  return (
    <Container.Provider
      value={{ searchValue, filetr, currentPageType, setCurrentPageType }}>
      <nav className='Nav'>
        <h1 className='title'>Movie Portal DB</h1>
        <div className='headerNav'>
          <div className='route'>
            <NavLink
              to='/'
              style={({ isActive }) => {
                return { color: isActive ? 'red' : 'white' };
              }}
              onClick={() => setCurrentPageType(true)}>
              <span
                className='category'
                onClick={() => dispatch(setCurrentPageOfMovie(1))}>
                Movies
              </span>
            </NavLink>
            <NavLink
              to='/Actors'
              style={({ isActive }) => {
                return { color: isActive ? 'red' : 'white' };
              }}
              onClick={() => setCurrentPageType(false)}>
              <span
                className='category'
                onClick={() => dispatch(setCurrentPageOfActor(1))}>
                Actors
              </span>
            </NavLink>
          </div>
          <input
            className='search'
            placeholder='Search...'
            onChange={debouncedLog}
          />
        </div>
        {currentPageType ? (
          <select
            name='movieFilter'
            className='movieFilter'
            onChange={(e) => handleChangefilterAndToPageOne(e.target.value)}
            defaultValue={'discover'}>
            <option value='now_playing'>Now playing</option>
            <option value='top_rated'>Raited</option>
            <option value='popular'>Popular</option>
          </select>
        ) : (
          ''
        )}
      </nav>

      <Routes>
        <Route path='/' element={<Movies />}></Route>
        <Route path='/Actors' element={<Actors />}></Route>
        <Route path={link} element={<Movie />}></Route>
        <Route path={linkActor} element={<Actor />}></Route>
        <Route path='*' element={<ErrorPage />}></Route>
      </Routes>
    </Container.Provider>
  );
}
