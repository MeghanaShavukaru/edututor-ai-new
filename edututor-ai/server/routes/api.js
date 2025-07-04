const express = require('express');
const axios = require('axios');
const router = express.Router();

const HF_API_KEY = process.env.HF_API_KEY;

router.post('/tutor', async (req, res) => {
  const { question } = req.body;

  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/google/flan-t5-large',
      { inputs: question },
      { headers: { Authorization: `Bearer ${HF_API_KEY}` } }
    );
    const answer = response.data[0]?.generated_text || 'AI could not respond.';
    res.json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'AI error' });
  }
});

// Optional LMS assignment route
router.get('/lms/assignments', (req, res) => {
  res.json([
    { course: 'Math', assignment: 'Algebra Worksheet', due: '2025-06-20' },
    { course: 'Science', assignment: 'Lab Report', due: '2025-06-22' }
  ]);
});

module.exports = router;
