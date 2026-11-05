import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Please add a title'] },
    director: { type: String, required: [true, 'Please add a director'] },
    category: { type: String, required: [true, 'Please add a category'] },
    releaseDate: { type: Date, required: [true, 'Please add a release date'] },
    rating: { type: Number, required: [true, 'Please add a rating'], min: 0, max: 10 },
  },
  { timestamps: true }
);

const Movie = mongoose.model('Movie', movieSchema);
export default Movie;
