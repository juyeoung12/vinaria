// server/routes/lps.js
import express from 'express';
import Lp from '../models/Lp.js';

const router = express.Router();

// LP 전체 조회
router.get('/', async (req, res) => {
  try {
    const lps = await Lp.find({});
    res.json(lps);
  } catch (err) {
    res.status(500).json({ error: '서버 오류' });
  }
});

// LP 상세 조회
router.get('/:id', async (req, res) => {
  try {
    const lp = await Lp.findOne({ id: req.params.id });
    if (!lp) return res.status(404).json({ error: 'LP 없음' });
    res.json(lp);
  } catch (err) {
    res.status(500).json({ error: '서버 오류' });
  }
});

export default router;
