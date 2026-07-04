import User from "../models/User.js";
import Board from "../models/Board.js";
import Card from "../models/Card.js";
import asyncHandler from "../middlewares/asyncHandler.js";

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    users,
  });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  if (user._id.toString() === req.user._id.toString()) {
    return res.status(400).json({
      success: false,
      message: "Admin cannot delete own account",
    });
  }

  await Board.deleteMany({ createdBy: user._id });
  await Card.deleteMany({ createdBy: user._id });
  await User.findByIdAndDelete(user._id);

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

export const getAllBoards = asyncHandler(async (req, res) => {
  const boards = await Board.find()
    .populate("createdBy", "name email role")
    .populate("members", "name email role")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    boards,
  });
});

export const deleteAnyBoard = asyncHandler(async (req, res) => {
  const board = await Board.findById(req.params.boardId);

  if (!board) {
    return res.status(404).json({
      success: false,
      message: "Board not found",
    });
  }

  await Card.deleteMany({ board: board._id });
  await board.deleteOne();

  res.status(200).json({
    success: true,
    message: "Board deleted successfully by admin",
  });
});