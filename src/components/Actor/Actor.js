import axios from 'axios';
import { Fragment, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Loader } from '../Loader/Loader';
import notImageFound from '../../assets/No_image.svg.png';
import { Container } from '../NavBar/NavBar';
import { ShowError } from '../Error/showError';
export function Actor() {
  const [isError, setIsError] = useState();
  const actorId = useSelector((state) => state.toolkit.actorId);
  let parseActor = JSON.parse(actorId);
  const [info, setInfo] = useState();
  const [isLoading, setIsisLoading] = useState(false);
  const linkHref = +window.location.href.match(/\d+$/gi);
  const linkId = parseActor || linkHref;
  const { setCurrentPageType } = useContext(Container);
  const getActorInfo = async () => {
    setIsisLoading(!isLoading);
    const data = await axios
      .get(`https://api.themoviedb.org/3/person/${linkId}`, {
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
    getActorInfo();
    setCurrentPageType(false);
  }, []);
  const imageBaseLink = 'https://image.tmdb.org/t/p/w500/';
  return (
    <Fragment>
      {isError ? ShowError(isError.message) : null}
      {isLoading ? (
        <Loader loading={isLoading} />
      ) : info ? (
        <div className='BGmovie'>
          <div className='movieFullInfo'>
            <p>
              {info.profile_path ? (
                <img
                  src={`${imageBaseLink}${info.profile_path}`}
                  alt=''
                  className='ImgInfor'
                />
              ) : (
                <img src={`${notImageFound}`} alt='' className='ImgInfor' />
              )}
            </p>
            <div className='descriptionMovie'>
              <br></br>
              <p>Name: {info.name}</p>
              <br></br>
              <p>Birthday: {info.birthday}</p>
              <br></br>
              <p>Known for department: {info.known_for_department}</p>
              <br></br>
              <p>Place of birth: {info.place_of_birth}</p>
              <br></br>
              <p>Popularity: {info.popularity}</p>
              <br></br>
              <p>Deathday: {info.deathday || `Alive`}</p>
              <br></br>
            </div>
          </div>
          <div className='moreMovieInfo'>
            <p>
              Biography: {info.biography ? info.biography : `don't seted yet  `}
            </p>
          </div>
        </div>
      ) : (
        ''
      )}
    </Fragment>
  );
}
