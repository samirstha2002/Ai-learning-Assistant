const Quiz = require("../models/Quiz");

//@desc get all quizzes for a dcocument

//@route GET/api/quizzes/:documentId

//@acess Private

const getQuizzes = async (req, res, next) => {
  try {
    const quizzes = await Quiz.find({
      userId: req.user._id,
      documentId: req.params.documentId,
    })
      .populate("documentId", "title fileName")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: quizzes.length,
      data: quizzes,
    });
  } catch (error) {
    next(error);
  }
};

//@desc get  a quiz by Id

//@route GET/api/quizzes/quiz/:id

//@acess Private

const getQuizById = async (req, res, next) => {
  try {
    const quiz = await Quiz.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!quiz) {
      return res.status(404).json({
        success: false,
        error: "Quiz not found",
        statusCode: 404,
      });
    }

    res.status(200).json({
      success: true,
      data: quiz,
    });
  } catch (error) {
    next(error);
  }
};

//@desc submit quiz

//@route GET/api/quizzes/:id/submit

//@acess Private

const submitQuiz = async (req, res, next) => {
  try {
    const { answers } = req.body;

    if (!Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        error: "Please provide answers array",
        statusCode: 400,
      });
    }

    const quiz = await Quiz.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!quiz) {
      return res.status(404).json({
        success: false,
        error: "Quiz not found",
        statusCode: 404,
      });
    }

    if (quiz.completedAt) {
      return res.status(400).json({
        success: false,
        error: "Quiz already completed",
        statusCode: 400,
      });
    }

    // Safety fallback
    const questions = quiz.questions || [];

    let correctCount = 0;
    const userAnswers = [];

    answers.forEach((answer) => {
      const { questionIndex, selectedAnswer } = answer;

      if (questionIndex < questions.length) {
        const question = questions[questionIndex];

        const isCorrect = selectedAnswer === question.correctAnswer;

        if (isCorrect) correctCount++;

        userAnswers.push({
          questionIndex,
          selectedAnswer,
          isCorrect,
          answeredAt: new Date(),
        });
      }
    });

    const score = Math.round((correctCount / quiz.totalQuestions) * 100);

    quiz.userAnswers = userAnswers;
    quiz.score = score;
    quiz.completedAt = new Date();

    await quiz.save();

    res.status(200).json({
      success: true,
      data: {
        quizId: quiz._id,
        score,
        correctCount,
        totalQuestions: quiz.totalQuestions,
        percentage: score,
        userAnswers,
      },
      message: "Quiz submitted successfully",
    });
  } catch (error) {
    next(error);
  }
};

//@desc get quiz results

//@route GET/api/quizzes//:id/results

//@acess Private

const getQuizResults = async (req, res, next) => {
  try {
    const quiz = await Quiz.findOne({
      _id: req.params.id,
      userId: req.user._id,
    })
      .populate("documentId", "title")
      .sort({ createdAt: -1 });

    if (!quiz) {
      return res.status(404).json({
        success: false,
        error: "Quiz not found",
        statusCode: 404,
      });
    }

    if (!quiz.completedAt) {
      return res.status(400).json({
        succes: false,
        error: "Quiz not completed yet ",
        statusCode: 400,
      });
    }

    const detailedResults = quiz.questions.map((question, index) => {
      const userAnswer = quiz.userAnswers.find(
        (a) => a.questionIndex === index,
      );

      return {
        questionIndex: index,
        question: question.question,
        options: question.options,
        correctAnswer: question.correctAnswer,
        selectedAnswer: userAnswer?.selectedAnswer || null,
        isCorrect: userAnswer?.isCorrect || false,
        explanation: question.explanation,
      };
    });

    res.status(200).json({
      success: true,

      data: {
        quiz: {
          id: quiz._id,
          title: quiz.title,
          document: quiz.documentId,
          score: quiz.score,
          totalQuestions: quiz.totalQuestions,
          completedAt: quiz.completedAt,
        },
        results: detailedResults,
      },
    });
  } catch (error) {
    next(error);
  }
};

//@desc delete

//@route delete/api/quizzes/:id

//@acess Private

const deleteQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!quiz) {
      return res.status(404).json({
        success: false,
        error: "Quiz not found",
        statusCode: 404,
      });
    }

    await quiz.deleteOne();

    res.status(200).json({
      success: true,
      message: "Quiz deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getQuizzes,
  getQuizById,
  submitQuiz,
  getQuizResults,
  deleteQuiz,
};
