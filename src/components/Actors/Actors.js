import { Fragment, useContext, useEffect, useState } from 'react';
import './Actors.css';
import { Loader } from '../Loader/Loader';
import axios from 'axios';
import notImageFound from '../../assets/No_image.svg.png';
import { PaginatedItems } from '../Pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '../NavBar/NavBar';
import { setActorId, setCurrentPageOfActor } from '../redux/Reducer';
import { NavLink } from 'react-router-dom';
import { ShowError } from '../Error/showError';

export function Actors() {
  const [isError, setIsError] = useState();
  const [actores, setActores] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { searchValue, setCurrentPageType } = useContext(Container);
  const inputValue = searchValue;
  const [totalPages, setTotalPages] = useState();
  const imageBaseLink = 'https://image.tmdb.org/t/p/w500/';
  const searchActor = `https://api.themoviedb.org/3/search/person`;

  const page = useSelector((state) => state.toolkit.currentPageOfActor);
  const getActors = async () => {
    setIsLoading(!isLoading);
    const data = await axios
      .get(
        inputValue
          ? searchActor
          : 'https://api.themoviedb.org/3/person/popular',
        {
          params: {
            api_key: 'e83ea331186eba300f23910c5752598a',
            query: inputValue,
            page: page,
          },
        }
      )
      .then((data) => {
        const results = data.data.results;
        setActores(results);
        setTotalPages(
          data.data.total_pages > 500 ? 500 : data.data.total_pages
        );
      })
      .catch((error) => {
        setIsError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getActors();
  }, [page, searchValue]);
  const handleClick = (item) => {
    dispatch(setActorId(JSON.stringify(item.id)));
  };
  useEffect(() => {
    setCurrentPageType();
  });
  return (
    <Fragment>
      {isLoading ? (
        <Loader loading={isLoading} />
      ) : (
        <ul className='movieList'>
          {actores?.map((item) => {
            const link = `/id_actor:${item.id}`;
            return (
              <NavLink to={link}>
                <li className='movieLink' onClick={() => handleClick(item)}>
                  <h3 className='titleMove'>{item.name}</h3>
                  {item.profile_path ? (
                    <img
                      src={`${imageBaseLink}${item.profile_path}`}
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
      <PaginatedItems maxPageCount={totalPages} type={setCurrentPageOfActor} />
    </Fragment>
  );
}
