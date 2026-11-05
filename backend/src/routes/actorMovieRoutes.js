import express from "express";
import * as c from "../controllers/actorMovieController.js";

const router = express.Router();

router.route("/").get(c.getMovieActors).post(c.assignActorToMovie);
router
  .route("/:id")
  .get(c.getMovieActorById)
  .put(c.updateActorInMovie)
  .delete(c.removeActorFromMovie);
router.route("/movie/:movieId").get(c.getActorsByMovie);
router.route("/actor/:actorId").get(c.getMoviesByActor);

export default router;
