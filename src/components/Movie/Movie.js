import { Fragment, useContext, useEffect, useState } from 'react';
import { Loader } from '../Loader/Loader';
import './Movie.css';
import axios from 'axios';
import notImageFound from '../../assets/No_image.svg.png';
import { useSelector } from 'react-redux';
import { Container } from '../NavBar/NavBar';
import { ShowError } from '../Error/showError';

export function Movie() {
  const [isError, setIsError] = useState();
  const movieId = useSelector((state) => state.toolkit.movieId);
  const [info, setInfo] = useState();
  const [isLoading, setIsisLoading] = useState(false);
  let parseMovie = JSON.parse(movieId);
  const imageBaseLink = 'https://image.tmdb.org/t/p/w500/';
  const linkHref = +window.location.href.match(/\d+$/gi);
  const linkId = parseMovie || linkHref;
  const { setCurrentPageType } = useContext(Container);
  const getMovieInfo = async () => {
    setIsisLoading(!isLoading);
    const data = await axios
      .get(`https://api.themoviedb.org/3/movie/${linkId}`, {
        params: {
          api_key: 'e83ea331186eba300f23910c5752598a',
        },
      })
      .then((data) => {
        const results = data.data;
        setInfo(results);
      })
      .catch((error) => {
        setIsError(error);
      })
      .finally(() => {
        setIsisLoading(false);
      });
  };
  useEffect(() => {
    getMovieInfo();
    setCurrentPageType(false);
  }, []);
  return (
    <Fragment>
      {isError ? ShowError(isError.message) : null}
      {isLoading ? (
        <Loader loading={isLoading} />
      ) : info ? (
        <div className='BGmovie'>
          <div className='movieFullInfo'>
            <p>
              {info.poster_path ? (
                <img
                  src={`${imageBaseLink}${info.poster_path}`}
                  alt=''
                  className='ImgInfor'
                />
              ) : (
                <img src={`${notImageFound}`} alt='' className='ImgInfor' />
              )}
            </p>
            <div className='descriptionMovie'>
              <p>Original Title: {info.original_title}</p>
              <br></br>
              <p>Title: {info.title}</p>
              <br></br>
              <p>Release date: {info.release_date}</p>
              <br></br>
              <p>Vote average: {info.vote_average}</p>
              <br></br>
              <p>Popularity: {info.popularity}</p>
              <br></br>
              <p>Budget: {info.budget}</p>
              <br></br>
              <p>Revenue: {info.revenue}</p>
              <br></br>
              <p>
                Оriginal country:{' '}
                {info.production_countries.map((item) => (
                  <span>{item.name} </span>
                ))}
              </p>
              <br></br>
              <p>
                Genres:{' '}
                {info.genres.map((item) => (
                  <span>{item.name} </span>
                ))}
              </p>
              <br></br>
            </div>
          </div>
          <div className='moreMovieInfo'>
            <p>Overview: {info.overview ? info.overview : `don't seted yet`}</p>
          </div>
        </div>
      ) : (
        ''
      )}
    </Fragment>
  );
}
