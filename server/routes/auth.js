import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

// 🔐 회원가입
router.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: '이미 존재하는 이메일입니다.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, name });

    res.status(201).json({ message: '회원가입 성공' });
  } catch (err) {
    res.status(500).json({ message: '서버 오류' });
  }
});

// 🔑 로그인
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: '존재하지 않는 이메일입니다.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: '비밀번호가 일치하지 않습니다.' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '3d',
    });

    res.status(200).json({
      message: '로그인 성공',
      token,
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (err) {
    res.status(500).json({ message: '서버 오류' });
  }
});

// ✅ 사용자 정보 조회 (/me)
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user)
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });

    res.status(200).json({ user }); // ✅ 클라이언트에서 user로 받기 쉽게 통일
  } catch (err) {
    res.status(500).json({ message: '서버 오류' });
  }
});

export default router;
