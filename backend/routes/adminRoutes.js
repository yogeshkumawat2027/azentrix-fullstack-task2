import express from "express";

import auth from "../middlewares/authMiddleware.js";
import isAdmin from "../middlewares/isAdmin.js";

import {
  getAllUsers,
  updateUserRole,
  deleteUser,
  getAllBoards,
  deleteAnyBoard,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/users", auth , isAdmin ,getAllUsers);
router.patch("/users/:userId/role",auth , isAdmin , updateUserRole);
router.delete("/users/:userId",auth , isAdmin , deleteUser);

router.get("/boards",auth, isAdmin , getAllBoards);
router.delete("/boards/:boardId", auth, isAdmin ,deleteAnyBoard);

export default router;