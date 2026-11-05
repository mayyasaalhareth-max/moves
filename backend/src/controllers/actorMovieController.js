import * as actorMovieService from '../services/actorMovieService.js';

export const getMovieActors = async (req, res) => {
  try {
    const relations = await actorMovieService.getAllMovieActors();
    res.status(200).json({ success: true, count: relations.length, data: relations });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getMovieActorById = async (req, res) => {
  try {
    const relation = await actorMovieService.getMovieActorById(req.params.id);
    res.status(200).json({ success: true, data: relation });
  } catch (error) {
    const statusCode = error.message === 'Cast relation not found' ? 404 : 500;
    res.status(statusCode).json({ success: false, error: error.message });
  }
};

export const getActorsByMovie = async (req, res) => {
  try {
    const relations = await actorMovieService.getActorsByMovie(req.params.movieId);
    res.status(200).json({ success: true, count: relations.length, data: relations });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getMoviesByActor = async (req, res) => {
  try {
    const relations = await actorMovieService.getMoviesByActor(req.params.actorId);
    res.status(200).json({ success: true, count: relations.length, data: relations });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const assignActorToMovie = async (req, res) => {
  try {
    const relation = await actorMovieService.assignActorToMovie(req.body);
    res.status(201).json({ success: true, data: relation });
  } catch (error) {
    const statusCode =
      error.message === 'Actor not found' || error.message === 'Movie not found'
        ? 404
        : 400;
    res.status(statusCode).json({ success: false, error: error.message });
  }
};

export const updateActorInMovie = async (req, res) => {
  try {
    const relation = await actorMovieService.updateActorInMovie(
      req.params.id,
      req.body,
    );
    res.status(200).json({ success: true, data: relation });
  } catch (error) {
    const statusCode =
      error.message === 'Cast relation not found' ||
      error.message === 'Actor not found' ||
      error.message === 'Movie not found'
        ? 404
        : 400;
    res.status(statusCode).json({ success: false, error: error.message });
  }
};

export const removeActorFromMovie = async (req, res) => {
  try {
    const result = await actorMovieService.removeActorFromMovie(req.params.id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    const statusCode = error.message === 'Cast relation not found' ? 404 : 500;
    res.status(statusCode).json({ success: false, error: error.message });
  }
};
