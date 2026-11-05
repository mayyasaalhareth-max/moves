import express from "express";
import * as c from "../controllers/movieController.js";

const router = express.Router();

router.route("/").get(c.getMovies).post(c.createMovie);
router
  .route("/:id")
  .get(c.getMovieById)
  .put(c.updateMovie)
  .delete(c.deleteMovie);

export default router;
