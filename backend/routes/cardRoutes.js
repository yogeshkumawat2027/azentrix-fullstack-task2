import express from "express";

import auth from "../middlewares/authMiddleware.js";
import { createCard, deleteCard, getBoardCards, getSingleCard, moveCard, updateCard } from "../controllers/cardController.js";

const router = express.Router();


router.post("/:boardId/cards", auth, createCard);
router.get("/:boardId/cards", auth, getBoardCards);

router.get("/cards/:cardId", auth, getSingleCard);
router.put("/cards/:cardId", auth, updateCard);
router.delete("/cards/:cardId", auth, deleteCard);
router.patch("/cards/:cardId/move", auth, moveCard);