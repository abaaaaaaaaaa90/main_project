import express from "express";

const router = express.Router();

import {
  CreateGame,
  games,
  game,
  gameRequest,
  gameRequests,
  gameUpdated,
  updated,
} from "../controllers/games";

router.post("/create-game", CreateGame);

router.get("/games", games);
router.get("/game/:slug", game);

router.put("/gameRequest", gameRequest);

router.get("/game-requests/:slug", gameRequests);

router.put("/game-upadate/:slug", gameUpdated);

router.put("/game-updated/:_id", updated);
module.exports = router;
