import React, { useCallback, useState } from 'react'

import MovieList from './MovieList/MovieList';
import SearchBox from './SearchBox/SearchBox';

import { getMovieList } from './Services';
import { IMovieList } from './types';

import Pagination from './Pagination/Pagination';
import Loader from '../Loader/Loader';

import './Movies.css';

interface IMovieRes {
  Search: IMovieList[];
  totalResults: string;
  Error?: string;
}

function Movies() {
  const [searchText, setSearchText] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [movieRes, setMovieRes] = useState<IMovieRes>({ Search: [], totalResults: '0' });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSearchBoxChange = (value: string = '') => setSearchText(value);

  const getMovies = (selectedPage: number = 1) => {
    setIsLoading(true);
    setCurrentPage(selectedPage);
    setMovieRes({ Search: [], totalResults: '0' })
    getMovieList(searchText, selectedPage)
      .then(movieRes => {
        setMovieRes(movieRes);
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => setIsLoading(false))
  };

  const onPageClick = useCallback((selectedPage: number | string) => {
    setCurrentPage(Number(selectedPage));
    getMovies(Number(selectedPage))
  }, [currentPage, movieRes]);

  return (
    <>
      <h1>Search the movie</h1>
      <div className='inputContainer'>
        <SearchBox onChange={onSearchBoxChange} value={searchText} />
        <button onClick={() => getMovies(1)}>Search</button>
      </div>
      {movieRes.Error && <div className='errorRes'>{movieRes.Error}</div>}
      {!isLoading && movieRes?.Search?.length > 0 && <MovieList
        movieList={movieRes.Search}
      />}
      {!isLoading && movieRes?.Search?.length > 0 && <Pagination
        records={Number(movieRes.totalResults || 0)}
        currentPage={currentPage}
        pageSize={10}
        onPageClick={onPageClick}
      />}
      {isLoading && <div
        className='loaderContainer'><Loader />
      </div>}
    </>
  )
}

export default Movies;