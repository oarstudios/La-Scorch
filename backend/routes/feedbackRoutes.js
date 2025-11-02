const express = require('express');
const router = express.Router();
const {
  createFeedback,
  getFeedbacksByUser,
  deleteFeedback,
  getAllFeedbacks,
} = require('../controllers/feedbackController');

// POST /api/feedback - Submit new feedback
router.post('/', createFeedback);


// Get all feedbacks route
router.get('/', getAllFeedbacks);

// GET /api/feedback/user/:userId - Get feedbacks from a user
router.get('/user/:userId', getFeedbacksByUser);

// DELETE /api/feedback/:id - Delete feedback
router.delete('/:id', deleteFeedback);

module.exports = router;
