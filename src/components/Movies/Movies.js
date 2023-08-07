import axios from 'axios';
import './Movies.css';
import { Fragment, useEffect, useState, useContext } from 'react';
import { Container } from '../NavBar/NavBar';
import notImageFound from '../../assets/No_image.svg.png';
import { Loader } from '../Loader/Loader';
import { PaginatedItems } from '../Pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setCurrentPageOfMovie, setMovieId } from '../redux/Reducer';
import { ShowError } from '../Error/showError';

export function Movies() {
  const [isError, setIsError] = useState();
  const [moviesData, setMoviesData] = useState();
  const { searchValue, filetr, setCurrentPageType } = useContext(Container);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const inputValue = searchValue;
  const [totalPages, setTotalPages] = useState();
  const page = useSelector((state) => state.toolkit.currentPageOfMovie);

  const searchMovie = `https://api.themoviedb.org/3/search/movie`;

  const nowPlaying = `https://api.themoviedb.org/3/movie/now_playing`;
  const popular = `https://api.themoviedb.org/3/movie/popular`;
  const topRated = `https://api.themoviedb.org/3/movie/top_rated`;

  const filetrMovie = inputValue
    ? searchMovie
    : filetr == 'now_playing'
    ? nowPlaying
    : filetr == 'top_rated'
    ? topRated
    : popular;

  const imageBaseLink = 'https://image.tmdb.org/t/p/w500/';
  const getMovie = async () => {
    setIsLoading(!isLoading);
    const data = await axios
      .get(filetrMovie, {
        params: {
          api_key: 'e83ea331186eba300f23910c5752598a',
          query: inputValue,
          page: page,
        },
      })
      .then((data) => {
        const results = data.data.results;
        setTotalPages(
          data.data.total_pages > 500 ? 500 : data.data.total_pages
        );

        setMoviesData(results);
      })
      .catch((error) => {
        setIsError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getMovie();
  }, [inputValue, filetr, page]);
  const handleClick = (item) => {
    dispatch(setMovieId(JSON.stringify(item.id)));
    setCurrentPageType(false);
  };
  return (
    <Fragment>
      {isLoading ? (
        <Loader loading={isLoading} />
      ) : (
        <ul className='movieList'>
          {moviesData?.map((item) => {
            const link = `/id:${item.id}`;
            return (
              <NavLink to={link}>
                <li
                  key={item.id}
                  id={item.id}
                  className='movieLink'
                  onClick={() => handleClick(item)}>
                  <h3 className='titleMove'>{item.title}</h3>
                  {item.poster_path ? (
                    <img
                      src={`${imageBaseLink}${item.poster_path}`}
                      alt=''
                      className='movieImg'
                    />
                  ) : (
                    <img
                      src={`${notImageFound}`}
                      alt=''
                      className='movieImgError'
                    />
                  )}
                </li>
              </NavLink>
            );
          })}
        </ul>
      )}
      {isError ? ShowError(isError.message) : null}
      <PaginatedItems maxPageCount={totalPages} type={setCurrentPageOfMovie} />
    </Fragment>
  );
}
