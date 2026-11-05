import mongoose from 'mongoose';

const actorSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Please add a name'] },
    birthDay: { type: Date, required: [true, 'Please add a birth day'] },
    nationality: { type: String, required: [true, 'Please add a nationality'] }
  },
  { timestamps: true }
);

const Actor = mongoose.model('Actor', actorSchema);
export default Actor;
