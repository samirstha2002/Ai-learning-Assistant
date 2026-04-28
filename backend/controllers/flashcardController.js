const Flashcard = require("../models/Flashcard");

//@desc get all flashcards for document
//@routes get /api/flashcards/:documentId
//@access Private

const getFlashcards = async (req, res, next) => {
  try {
    const flashcards = await Flashcard.find({
      userId: req.user._id,
      documentId: req.params.documentId,
    })
      .populate("documentId", "title fileName")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: flashcards.length,
      data: flashcards,
    });
  } catch (error) {
    next(error);
  }
};

//@desc get all flashcardsets for user
//@routes get /api/flashcards
//@access Private

const getAllFlashcardSets = async (req, res, next) => {
  try {
    const flashcardSets = await Flashcard.find({ userId: req.user._id })
      .populate("documentId", "title")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: flashcardSets.length,
      data: flashcardSets,
    });
  } catch (error) {
    next(error);
  }
};

//@desc mark flashcards as reviewwd
//@routes get /api/flashcards/:cardId/review
//@access Private
const reviewFlashcard = async (req, res, next) => {
  try {
    const flashcardSet = await Flashcard.findOne({
      "cards._id": req.params.cardId,
      userId: req.user._id,
    });

    if (!flashcardSet)
      return res.status(404).json({
        success: false,
        message: "flashcard set or card not found",
        statusCode: 404,
      });

    const cardIndex = flashcardSet.cards.findIndex(
      (card) => card._id.toString() === req.params.cardId,
    );

    if (cardIndex === -1) {
      return res.status(404).json({
        success: false,
        message: " card not found in set",
        statusCode: 404,
      });
    }

    //update review info

    flashcardSet.cards[cardIndex].lastReviewed = new Date();
    flashcardSet.cards[cardIndex].reviewCount += 1;

    await flashcardSet.save();

    res.status(200).json({
      success: true,

      data: flashcardSet,
      message: "Flashcard reviewed sucessfully",
    });
  } catch (error) {
    next(error);
  }
};

//@desc tooglestar/favourite on flash card
//@routes get /api/flashcards/:cardId/review
//@access Private

const toggleStarFlashcard = async (req, res, next) => {
  try {
    const flashcardSet = await Flashcard.findOne({
      "cards._id": req.params.cardId,
      userId: req.user._id,
    });
    if (!flashcardSet)
      return res.status(404).json({
        success: false,
        message: "flashcard set or card not found",
        statusCode: 404,
      });

    const cardIndex = flashcardSet.cards.findIndex(
      (card) => card._id.toString() === req.params.cardId,
    );

    if (cardIndex === -1) {
      return res.status(404).json({
        success: false,
        message: " card not found in set",
        statusCode: 404,
      });
    }

    //toggleStar

    flashcardSet.cards[cardIndex].isStarred =
      !flashcardSet.cards[cardIndex].isStarred;

    await flashcardSet.save();

    res.status(200).json({
      success: true,

      data: flashcardSet,
      message: `Flashcard ${flashcardSet.cards[cardIndex].isStarred ? "starred" : "unStarred"}`,
    });
  } catch (error) {
    next(error);
  }
};

//@desc delete flashcardSet
//@routes get /api/flashcard/:id
//@access Private
const deleteFlashcardSet = async (req, res, next) => {
  try {
    const flashcardSet = await Flashcard.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!flashcardSet)
      return res.status(404).json({
        success: false,
        message: "flashcard set or card not found",
        statusCode: 404,
      });

    await flashcardSet.deleteOne();

    res.status(200).json({
      success: true,
      message: "Flashcardset deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFlashcards,
  deleteFlashcardSet,
  toggleStarFlashcard,
  reviewFlashcard,
  getAllFlashcardSets,
};
