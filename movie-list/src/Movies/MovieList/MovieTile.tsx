import React from 'react'
import { IMovieList } from '../types';

interface IMovieTile {
    movie: IMovieList;
}
function MovieTile({movie}: IMovieTile) {
  return (
    <>
        <div className='movieImg'>
        <img src={movie.Poster} alt="Movie poster" />
        </div>
        <div className='movieDetails'>
        <div className='title'>{movie.Title}</div>
        <div className='year'>{movie.Year}</div>
        </div>
    </>
  )
}

export default MovieTile