const Feedback = require('../models/FeedbackModel');
const { StatusCodes } = require('http-status-codes');

// Create Feedback
const createFeedback = async (req, res) => {
  try {
    const { userId, rating, feedbackText } = req.body;
    if (!userId || !rating || !feedbackText) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "All fields are required" });
    }

    if (rating < 1 || rating > 5) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "Rating must be between 1 and 5" });
    }

    const feedback = new Feedback({ userId, rating, feedbackText });
    await feedback.save();

    res.status(StatusCodes.CREATED).json({ message: "Feedback submitted successfully", feedback });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
  }
};

// Get feedbacks by user ID
const getFeedbacksByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const feedbacks = await Feedback.find({ userId });
    res.status(StatusCodes.OK).json(feedbacks);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
  }
};

// Optional: Delete feedback by ID
const deleteFeedback = async (req, res) => {
  try {
    const feedbackId = req.params.id;
    const feedback = await Feedback.findByIdAndDelete(feedbackId);
    if (!feedback) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "Feedback not found" });
    }
    res.status(StatusCodes.OK).json({ message: "Feedback deleted successfully" });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
  }
};

// Get all feedbacks
const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(StatusCodes.OK).json(feedbacks);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
  }
};


module.exports = {
  createFeedback,
  getFeedbacksByUser,
  deleteFeedback,
  getAllFeedbacks
};
