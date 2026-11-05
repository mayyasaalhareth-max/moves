import * as actorService from '../services/actorService.js';

export const getActors = async (req, res) => {
  try {
    const actors = await actorService.getAllActors();
    res.status(200).json({ success: true, count: actors.length, data: actors });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getActorById = async (req, res) => {
  try {
    const actor = await actorService.getActorById(req.params.id);
    res.status(200).json({ success: true, data: actor });
  } catch (error) {
    const statusCode = error.message === 'Actor not found' ? 404 : 500;
    res.status(statusCode).json({ success: false, error: error.message });
  }
};

export const createActor = async (req, res) => {
  try {
    const actor = await actorService.createActor(req.body);
    res.status(201).json({ success: true, data: actor });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const updateActor = async (req, res) => {
  try {
    const actor = await actorService.updateActor(req.params.id, req.body);
    res.status(200).json({ success: true, data: actor });
  } catch (error) {
    const statusCode = error.message === 'Actor not found' ? 404 : 400;
    res.status(statusCode).json({ success: false, error: error.message });
  }
};

export const deleteActor = async (req, res) => {
  try {
    const result = await actorService.deleteActor(req.params.id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    const statusCode = error.message === 'Actor not found' ? 404 : 500;
    res.status(statusCode).json({ success: false, error: error.message });
  }
};
