import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import lpRoutes from './routes/lps.js';
import authRoutes from './routes/auth.js'; // 🔹 auth 라우터 추가

dotenv.config();

const app = express();

// ✅ CORS 설정 (Vite 및 배포용 도메인 허용)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// ✅ MongoDB 연결
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ DB 연결됨'))
  .catch(err => console.error('❌ DB 연결 실패:', err));

// ✅ 라우터 연결
app.use('/api/lps', lpRoutes);
app.use('/api/auth', authRoutes); // 🔹 auth 라우터 경로 등록

// ✅ 서버 실행
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
});
