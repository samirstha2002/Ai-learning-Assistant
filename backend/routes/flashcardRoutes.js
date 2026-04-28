const express = require("express");

const {
  getFlashcards,
  getAllFlashcardSets,
  reviewFlashcard,
  toggleStarFlashcard,
  deleteFlashcardSet,
} = require("../controllers/flashcardController");

const protect = require("../middleware/auth");

const router = express.Router();

router.use(protect);
router.get("/", getAllFlashcardSets);
router.get("/:documentId", getFlashcards);
router.post("/:cardId/review", reviewFlashcard);
router.put("/:cardId/star", toggleStarFlashcard);
router.delete("/:id", deleteFlashcardSet);

module.exports = router;
