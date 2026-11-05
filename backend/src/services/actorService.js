import Actor from '../models/actorModel.js';

export const getAllActors = async () => {
  return await Actor.find();
};

export const getActorById = async (id) => {
  const actor = await Actor.findById(id);
  if (!actor) throw new Error('Actor not found');
  return actor;
};

export const createActor = async (actorData) => {
  return await Actor.create(actorData);
};

export const updateActor = async (id, actorData) => {
  const actor = await Actor.findByIdAndUpdate(id, actorData, { new: true, runValidators: true });
  if (!actor) throw new Error('Actor not found');
  return actor;
};

export const deleteActor = async (id) => {
  const actor = await Actor.findByIdAndDelete(id);
  if (!actor) throw new Error('Actor not found');
  return { id, message: 'Actor deleted successfully' };
};
