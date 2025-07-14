import express from 'express';
import Lp from '../models/Lp.js';

const router = express.Router();

// GET /api/lps
router.get('/', async (req, res) => {
  try {
    const lps = await Lp.find();
    res.json(lps);
  } catch (err) {
    res.status(500).json({ error: 'LP 데이터 불러오기 실패' });
  }
});

export default router;
