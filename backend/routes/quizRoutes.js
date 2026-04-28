const express = require("express");

const {
  getQuizzes,
  getQuizById,
  submitQuiz,
  getQuizResults,
  deleteQuiz,
} = require("../controllers/quizController");

const protect = require("../middleware/auth");

const router = express.Router();

router.use(protect);

router.get("/:documentId", getQuizzes);
router.get("/quiz/:id", getQuizById);
router.post("/:id/submit", submitQuiz);
router.get("/:id/results", getQuizResults);
router.delete("/:id", deleteQuiz);

module.exports = router;
