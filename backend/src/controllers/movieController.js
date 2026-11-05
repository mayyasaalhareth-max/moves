import * as movieService from '../services/movieService.js';

export const getMovies = async (req, res) => {
  try {
    const movies = await movieService.getAllMovies();
    res.status(200).json({ success: true, count: movies.length, data: movies });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getMovieById = async (req, res) => {
  try {
    const movie = await movieService.getMovieById(req.params.id);
    res.status(200).json({ success: true, data: movie });
  } catch (error) {
    const statusCode = error.message === 'Movie not found' ? 404 : 500;
    res.status(statusCode).json({ success: false, error: error.message });
  }
};

export const createMovie = async (req, res) => {
  try {
    const movie = await movieService.createMovie(req.body);
    res.status(201).json({ success: true, data: movie });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const movie = await movieService.updateMovie(req.params.id, req.body);
    res.status(200).json({ success: true, data: movie });
  } catch (error) {
    const statusCode = error.message === 'Movie not found' ? 404 : 400;
    res.status(statusCode).json({ success: false, error: error.message });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const result = await movieService.deleteMovie(req.params.id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    const statusCode = error.message === 'Movie not found' ? 404 : 500;
    res.status(statusCode).json({ success: false, error: error.message });
  }
};
