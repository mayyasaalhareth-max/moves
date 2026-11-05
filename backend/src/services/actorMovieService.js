import MovieActor from '../models/actorMovieModel.js';
import Actor from '../models/actorModel.js';
import Movie from '../models/movieModel.js';

export const getAllMovieActors = async () => {
  return await MovieActor.find()
    .populate('actor', 'name nationality birthDay')
    .populate('movie', 'title director category releaseDate rating');
};

export const getMovieActorById = async (id) => {
  const relation = await MovieActor.findById(id)
    .populate('actor', 'name nationality birthDay')
    .populate('movie', 'title director category releaseDate rating');
  if (!relation) throw new Error('Cast relation not found');
  return relation;
};

export const getActorsByMovie = async (movieId) => {
  return await MovieActor.find({ movie: movieId })
    .populate('actor', 'name nationality birthDay');
};

export const getMoviesByActor = async (actorId) => {
  return await MovieActor.find({ actor: actorId })
    .populate('movie', 'title director category releaseDate rating');
};

export const assignActorToMovie = async (data) => {
  const { actor, movie, role } = data;

  const actorExists = await Actor.findById(actor);
  if (!actorExists) throw new Error('Actor not found');

  const movieExists = await Movie.findById(movie);
  if (!movieExists) throw new Error('Movie not found');

  try {
    return await MovieActor.create({ actor, movie, role });
  } catch (error) {
    if (error.code === 11000) {
      throw new Error('This actor is already assigned to this movie');
    }
    throw error;
  }
};

export const updateActorInMovie = async (id, data) => {
  const { actor, movie, role } = data;
  const relation = await MovieActor.findById(id);
  if (!relation) throw new Error('Cast relation not found');

  const actorExists = await Actor.findById(actor);
  if (!actorExists) throw new Error('Actor not found');

  const movieExists = await Movie.findById(movie);
  if (!movieExists) throw new Error('Movie not found');

  try {
    const updatedRelation = await MovieActor.findByIdAndUpdate(
      id,
      { actor, movie, role },
      { new: true, runValidators: true },
    )
      .populate('actor', 'name nationality birthDay')
      .populate('movie', 'title director category releaseDate rating');

    if (!updatedRelation) throw new Error('Cast relation not found');
    return updatedRelation;
  } catch (error) {
    if (error.code === 11000) {
      throw new Error('This actor is already assigned to this movie');
    }
    throw error;
  }
};

export const removeActorFromMovie = async (id) => {
  const relation = await MovieActor.findByIdAndDelete(id);
  if (!relation) throw new Error('Cast relation not found');
  return { id, message: 'Actor removed from movie successfully' };
};
