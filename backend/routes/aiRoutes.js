const express = require("express");

const {
  generateFlashcards,
  generateQuiz,
  generateSummary,
  chat,
  explainConcept,
  getChatHistory,
} = require("../controllers/aiController");

const protect = require("../middleware/auth");

const router = express.Router();

router.use(protect);

router.post("/generate-flashcards", generateFlashcards);
router.post("/generate-quiz", generateQuiz);
router.post("/generate-summary", generateSummary);
router.post("/chat", chat);
router.post("/explain-concept", explainConcept);
router.get("/chat-history/:documentId", getChatHistory);

module.exports = router;
