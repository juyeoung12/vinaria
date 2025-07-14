import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import lpRoutes from './routes/lps.js';

dotenv.config();

const app = express();

// ✅ CORS 설정 (여기 중요!)
app.use(cors({
  origin: 'http://localhost:5173',  // Vite 개발 서버 주소
  credentials: true
}));

app.use(express.json());

// ✅ MongoDB 연결
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ DB 연결됨'))
  .catch(err => console.error('❌ DB 연결 실패:', err));

// ✅ 라우터 연결
app.use('/api/lps', lpRoutes);

// ✅ 서버 실행
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
});
