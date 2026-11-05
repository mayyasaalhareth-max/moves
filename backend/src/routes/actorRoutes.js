import express from "express";
import * as c from "../controllers/actorController.js";

const router = express.Router();

router.route("/").get(c.getActors).post(c.createActor);
router
  .route("/:id")
  .get(c.getActorById)
  .put(c.updateActor)
  .delete(c.deleteActor);

export default router;
