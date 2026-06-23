import Card from "../models/Card.js";
import Board from "../models/Board.js";
import asyncHandler from "../middlewares/asyncHandler.js";

export const createCard = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    column,
    assignee,
    dueDate,
    priority,
  } = req.body;

  if (!title)  return res.status(400).json({success: false, message: "Card title is required"});
   
  const board = await Board.findById(req.params.boardId);

  if (!board) return res.status(404).json({success: false, message: "Board not found"});
    
  const isMember = board.members.some(
    (member) => member.toString() === req.user._id.toString()
  );

  if (!isMember){
    return res.status(403).json({
      success: false,
      message: "You are not a member of this board",
    });
  }

  const card = await Card.create({
    title,
    description,
    board: board._id,
    column,
    assignee,
    dueDate,
    priority,
    createdBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Card created successfully",
    card,
  });
});


export const getBoardCards = asyncHandler(async (req, res) => {
  const board = await Board.findById(req.params.boardId);

  if (!board) return res.status(404).json({success: false, message: "Board not found"});

  const isMember = board.members.some(
    (member) => member.toString() === req.user._id.toString()
  );

  if(!isMember){
    return res.status(403).json({
      success: false,
      message: "You are not a member of this board",
    });
  }

  const cards = await Card.find({ board: req.params.boardId})
    .populate("assignee", "name email")
    .populate("createdBy", "name email");

  res.status(200).json({success: true,cards})
    
});


export const getSingleCard = asyncHandler(async (req, res) => {
  const card = await Card.findById(req.params.cardId)
    .populate("assignee", "name email")
    .populate("createdBy", "name email");

  if(!card) 
    return res.status(404).json({ success: false, message: "Card not found" });
  
  const board = await Board.findById(card.board);

  const isMember = board.members.some(
    (member) => member.toString() === req.user._id.toString()
  );

  if (!isMember) {
    return res.status(403).json({ success: false, message: "Not allowed" });
  }

  res.status(200).json({ success: true, card });
});


export const updateCard = asyncHandler(async (req, res) =>{
  const { title, description, assignee, dueDate, priority } = req.body;

  const card = await Card.findById(req.params.cardId);

  if (!card) 
    return res.status(404).json({ success: false, message: "Card not found" });

  if (card.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Only card creator can update this card",
    });
  }

  if (title !== undefined && title.trim() === "") {
    return res.status(400).json({ success: false, message: "Title cannot be empty" });
  }

  card.title = title ?? card.title;
  card.description = description ?? card.description;
  card.assignee = assignee ?? card.assignee;
  card.dueDate = dueDate ?? card.dueDate;
  card.priority = priority ?? card.priority;

  await card.save();

  res.status(200).json({
    success: true,
    message: "Card updated successfully",
    card,
  });
});


export const deleteCard = asyncHandler(async (req, res) => {
  const card = await Card.findById(req.params.cardId);

  if (!card) 
    return res.status(404).json({ success: false, message: "Card not found" });

  if(card.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Only card creator can delete this card",
    });
  }
  await card.deleteOne();

  res.status(200).json({success: true, message: "Card deleted successfully"});
    
});