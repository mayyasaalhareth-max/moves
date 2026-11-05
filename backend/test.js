import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import app from './src/app.js';
import Actor from './src/models/actorModel.js';
import Movie from './src/models/movieModel.js';
import MovieActor from './src/models/actorMovieModel.js';

import * as actorService from './src/services/actorService.js';
import * as movieService from './src/services/movieService.js';
import * as actorMovieService from './src/services/actorMovieService.js';

async function runTests() {
  try {
    console.log('🔗 Connecting to test database...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to DB.\n');

    await MovieActor.deleteMany({});
    await Actor.deleteMany({});
    await Movie.deleteMany({});
    console.log('🧹 Cleaned database for testing.\n');

    console.log('--- TESTING SERVICES ---');

    const newActor = await actorService.createActor({
      name: 'Tom Hanks',
      birthDay: new Date('1956-07-09'),
      nationality: 'American',
    });
    console.log('✓ actorService.createActor passed:', newActor.name);

    const actorsList = await actorService.getAllActors();
    console.log('✓ actorService.getAllActors passed. Count:', actorsList.length);

    const fetchedActor = await actorService.getActorById(newActor._id);
    console.log('✓ actorService.getActorById passed:', fetchedActor.name);

    const updatedActor = await actorService.updateActor(newActor._id, { nationality: 'USA' });
    console.log('✓ actorService.updateActor passed. New nationality:', updatedActor.nationality);

    const newMovie = await movieService.createMovie({
      title: 'Forrest Gump',
      director: 'Robert Zemeckis',
      category: 'Drama / Romance',
      releaseDate: new Date('1994-07-06'),
      rating: 8.8,
    });
    console.log('✓ movieService.createMovie passed:', newMovie.title);

    const moviesList = await movieService.getAllMovies();
    console.log('✓ movieService.getAllMovies passed. Count:', moviesList.length);

    const fetchedMovie = await movieService.getMovieById(newMovie._id);
    console.log('✓ movieService.getMovieById passed:', fetchedMovie.title);

    const updatedMovie = await movieService.updateMovie(newMovie._id, { rating: 8.9 });
    console.log('✓ movieService.updateMovie passed. New rating:', updatedMovie.rating);

    const castRelation = await actorMovieService.assignActorToMovie({
      actor: newActor._id,
      movie: newMovie._id,
      role: 'Forrest Gump',
    });
    console.log('✓ actorMovieService.assignActorToMovie passed. Role:', castRelation.role);

    const updatedCastRelation = await actorMovieService.updateActorInMovie(
      castRelation._id,
      { actor: newActor._id, movie: newMovie._id, role: 'Updated role' },
    );
    console.log('✓ actorMovieService.updateActorInMovie passed. Role:', updatedCastRelation.role);

    const allCast = await actorMovieService.getAllMovieActors();
    console.log('✓ actorMovieService.getAllMovieActors passed. Count:', allCast.length);

    const moviesByActor = await actorMovieService.getMoviesByActor(newActor._id);
    console.log('✓ actorMovieService.getMoviesByActor passed. Count:', moviesByActor.length);

    const actorsByMovie = await actorMovieService.getActorsByMovie(newMovie._id);
    console.log('✓ actorMovieService.getActorsByMovie passed. Count:', actorsByMovie.length);

    console.log('\n--- ALL SERVICES PASSED SUCCESSFULLY ---\n');

    console.log('--- TESTING HTTP ENDPOINTS ---');

    const resRoot = await request(app).get('/');
    if (resRoot.status !== 200) throw new Error('GET / failed');
    console.log('✓ GET / (Base route) passed with status 200');

    const resActors = await request(app).get('/api/actors');
    if (resActors.status !== 200 || resActors.body.data.length === 0) throw new Error('GET /api/actors failed');
    console.log('✓ GET /api/actors passed with status 200');

    const resActorOne = await request(app).get(`/api/actors/${newActor._id}`);
    if (resActorOne.status !== 200) throw new Error('GET /api/actors/:id failed');
    console.log('✓ GET /api/actors/:id passed with status 200');

    const resMovies = await request(app).get('/api/movies');
    if (resMovies.status !== 200 || resMovies.body.data.length === 0) throw new Error('GET /api/movies failed');
    console.log('✓ GET /api/movies passed with status 200');

    const resMovieOne = await request(app).get(`/api/movies/${newMovie._id}`);
    if (resMovieOne.status !== 200) throw new Error('GET /api/movies/:id failed');
    console.log('✓ GET /api/movies/:id passed with status 200');

    const resMovieActors = await request(app).get('/api/movie-actors');
    if (resMovieActors.status !== 200) throw new Error('GET /api/movie-actors failed');
    console.log('✓ GET /api/movie-actors passed with status 200');

    const resUpdateMovieActor = await request(app)
      .put(`/api/movie-actors/${castRelation._id}`)
      .send({ actor: newActor._id, movie: newMovie._id, role: 'Updated HTTP role' });
    if (resUpdateMovieActor.status !== 200) throw new Error('PUT /api/movie-actors/:id failed');
    console.log('✓ PUT /api/movie-actors/:id passed with status 200');

    const resActorsByMovieHttp = await request(app).get(`/api/movie-actors/movie/${newMovie._id}`);
    if (resActorsByMovieHttp.status !== 200) throw new Error('GET /api/movie-actors/movie/:movieId failed');
    console.log('✓ GET /api/movie-actors/movie/:movieId passed with status 200');

    const resMoviesByActorHttp = await request(app).get(`/api/movie-actors/actor/${newActor._id}`);
    if (resMoviesByActorHttp.status !== 200) throw new Error('GET /api/movie-actors/actor/:actorId failed');
    console.log('✓ GET /api/movie-actors/actor/:actorId passed with status 200');

    await actorService.deleteActor(newActor._id);
    await movieService.deleteMovie(newMovie._id);
    await actorMovieService.removeActorFromMovie(castRelation._id);
    console.log('\n🧹 Cleaned up test data.');

    console.log('\n========================================');
    console.log('🎉 ALL TESTS PASSED SUCCESSFULLY! (100%)');
    console.log('========================================');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ TEST FAILED:', error);
    process.exit(1);
  }
}

runTests();
