import Movie from '../models/movieModel.js';

export const getAllMovies = async () => {
  return await Movie.find();
};

export const getMovieById = async (id) => {
  const movie = await Movie.findById(id);
  if (!movie) throw new Error('Movie not found');
  return movie;
};

export const createMovie = async (movieData) => {
  return await Movie.create(movieData);
};

export const updateMovie = async (id, movieData) => {
  const movie = await Movie.findByIdAndUpdate(id, movieData, { new: true, runValidators: true });
  if (!movie) throw new Error('Movie not found');
  return movie;
};

export const deleteMovie = async (id) => {
  const movie = await Movie.findByIdAndDelete(id);
  if (!movie) throw new Error('Movie not found');
  return { id, message: 'Movie deleted successfully' };
};
