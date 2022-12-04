import React from 'react'

import { IMovieList } from '../types';
import MovieTile from './MovieTile';

import './MovieList.css'
interface IMovieListProps {
  movieList: IMovieList[];
}
function MovieList({ movieList }: IMovieListProps) {
  return (
    <>
      <div className='movieList'>
        {movieList.map((movie, index) =>
          <div className='movie' key={`movie-${movie.imdbID}-${index}`}>
            <MovieTile movie={movie} />
          </div>)}
      </div>
    </>
  )
}

export default MovieList