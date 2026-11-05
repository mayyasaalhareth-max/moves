# Express.js Backend Boilerplate (Movies & Actors API)

A production-ready MVC + Service layer architecture using **Express.js**, **Mongoose (MongoDB)**, and **dotenv**.

## Project Structure

```text
Back end/
├── src/
│   ├── config/
│   │   └── db.js                   # Database connection
│   ├── models/
│   │   ├── actorModel.js           # Actor schema
│   │   ├── movieModel.js           # Movie schema
│   │   └── actorMovieModel.js      # Movie-Actor cast junction schema
│   ├── services/
│   │   ├── actorService.js         # Actor business logic & queries
│   │   ├── movieService.js         # Movie business logic & queries
│   │   ├── actorMovieService.js    # Cast relations logic & populate queries
│   │   └── userService.js          # User service
│   ├── controllers/
│   │   ├── actorController.js      # Actor HTTP request handlers
│   │   ├── movieController.js      # Movie HTTP request handlers
│   │   ├── actorMovieController.js # Cast relations HTTP request handlers
│   │   └── userController.js       # User controller
│   ├── routes/
│   │   ├── actorRoutes.js          # /api/actors endpoints
│   │   ├── movieRoutes.js          # /api/movies endpoints
│   │   ├── actorMovieRoutes.js     # /api/movie-actors endpoints
│   │   └── userRoutes.js           # /api/users endpoints
│   ├── app.js                      # Express app setup & route registration
│   └── server.js                   # Entry point (server listener & DB connection)
├── .env                            # Environment variables
├── .env.example                    # Template for env variables
├── package.json
└── README.md
```

## Getting Started

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run Server:**
   - Development (live reload):
     ```bash
     npm run dev
     ```
   - Production:
     ```bash
     npm start
     ```

## API Endpoints

### 🎬 Movies (`/api/movies`)
- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get movie by ID
- `POST /api/movies` - Create a new movie
- `PUT /api/movies/:id` - Update movie by ID
- `DELETE /api/movies/:id` - Delete movie by ID

### 🎭 Actors (`/api/actors`)
- `GET /api/actors` - Get all actors
- `GET /api/actors/:id` - Get actor by ID
- `POST /api/actors` - Create a new actor
- `PUT /api/actors/:id` - Update actor by ID
- `DELETE /api/actors/:id` - Delete actor by ID

### 🤝 Cast & Movie-Actor Relations (`/api/movie-actors`)
- `GET /api/movie-actors` - Get all cast links (populated with Actor & Movie details)
- `GET /api/movie-actors/:id` - Get single cast relation by ID
- `GET /api/movie-actors/movie/:movieId` - Get all actors in a specific movie
- `GET /api/movie-actors/actor/:actorId` - Get all movies a specific actor starred in
- `POST /api/movie-actors` - Assign actor to movie with `{ actor, movie, role }`
- `DELETE /api/movie-actors/:id` - Remove actor from movie

The API is available under the `/api` prefix. The original unprefixed routes
(`/movies`, `/actors`, and `/movie-actors`) remain available for compatibility.
