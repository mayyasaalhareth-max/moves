import mongoose from 'mongoose';

const movieActorSchema = new mongoose.Schema(
    {
        actor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Actor',
            required: [true, 'Please add an actor reference'],
        },
        movie: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie',
            required: [true, 'Please add a movie reference'],
        },
        role: {
            type: String,
            required: [true, 'Please add the actor role in this movie'],
            trim: true,
        },
    },
    { timestamps: true }
);

movieActorSchema.index({ actor: 1, movie: 1 }, { unique: true });

const MovieActor = mongoose.model('MovieActor', movieActorSchema);
export default MovieActor;
