import express from 'express';
import cors from 'cors';
import actorRoutes from './routes/actorRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import actorMovieRoutes from './routes/actorMovieRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/actors', actorRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/movie-actors', actorMovieRoutes);

// Keep the original paths available for existing clients.
app.use('/actors', actorRoutes);
app.use('/movies', movieRoutes);
app.use('/movie-actors', actorMovieRoutes);

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Movies & Actors API (Next.js Training Back-end)!' });
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

export default app;
