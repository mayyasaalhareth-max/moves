import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Actor from './src/models/actorModel.js';
import Movie from './src/models/movieModel.js';
import MovieActor from './src/models/actorMovieModel.js';

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB successfully...');

    await MovieActor.deleteMany({});
    await Actor.deleteMany({});
    await Movie.deleteMany({});
    console.log('Cleared existing Actors, Movies, and Cast relations.');

    const actors = await Actor.insertMany([
      { name: 'Leonardo DiCaprio', birthDay: new Date('1974-11-11'), nationality: 'American' },
      { name: 'Joseph Gordon-Levitt', birthDay: new Date('1981-02-17'), nationality: 'American' },
      { name: 'Elliot Page', birthDay: new Date('1987-02-21'), nationality: 'Canadian' },
      { name: 'Christian Bale', birthDay: new Date('1974-01-30'), nationality: 'British' },
      { name: 'Heath Ledger', birthDay: new Date('1979-04-04'), nationality: 'Australian' },
      { name: 'Cillian Murphy', birthDay: new Date('1976-05-25'), nationality: 'Irish' },
    ]);
    console.log(`Inserted ${actors.length} actors.`);

    const movies = await Movie.insertMany([
      { title: 'Inception', director: 'Christopher Nolan', category: 'Sci-Fi / Action', releaseDate: new Date('2010-07-16'), rating: 8.8 },
      { title: 'The Dark Knight', director: 'Christopher Nolan', category: 'Action / Crime', releaseDate: new Date('2008-07-18'), rating: 9.0 },
      { title: 'Oppenheimer', director: 'Christopher Nolan', category: 'Biography / Drama', releaseDate: new Date('2023-07-21'), rating: 8.9 },
    ]);
    console.log(`Inserted ${movies.length} movies.`);

    const leo = actors.find((a) => a.name === 'Leonardo DiCaprio');
    const joseph = actors.find((a) => a.name === 'Joseph Gordon-Levitt');
    const elliot = actors.find((a) => a.name === 'Elliot Page');
    const bale = actors.find((a) => a.name === 'Christian Bale');
    const heath = actors.find((a) => a.name === 'Heath Ledger');
    const cillian = actors.find((a) => a.name === 'Cillian Murphy');

    const inception = movies.find((m) => m.title === 'Inception');
    const darkKnight = movies.find((m) => m.title === 'The Dark Knight');
    const oppenheimer = movies.find((m) => m.title === 'Oppenheimer');

    const movieActors = await MovieActor.insertMany([
      { movie: inception._id, actor: leo._id, role: 'Dom Cobb' },
      { movie: inception._id, actor: joseph._id, role: 'Arthur' },
      { movie: inception._id, actor: elliot._id, role: 'Ariadne' },
      { movie: inception._id, actor: cillian._id, role: 'Robert Fischer' },
      { movie: darkKnight._id, actor: bale._id, role: 'Bruce Wayne / Batman' },
      { movie: darkKnight._id, actor: heath._id, role: 'Joker' },
      { movie: darkKnight._id, actor: cillian._id, role: 'Jonathan Crane / Scarecrow' },
      { movie: oppenheimer._id, actor: cillian._id, role: 'J. Robert Oppenheimer' },
    ]);
    console.log(`Inserted ${movieActors.length} movie-actor cast links.`);

    console.log('\nData seeding completed successfully! ✨');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedData();
