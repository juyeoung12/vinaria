// server/scripts/seedLp.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import Lp from '../models/Lp.js';
import lpData from './lpData.js';

// __dirname 대체 (ESM용)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 루트에 있는 .env 파일 읽기
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

console.log('📡 MONGO_URI:', process.env.MONGO_URI); // 테스트용 로그

const insert = async () => {
  try {
    // ✅ 여기 이 두 줄이 중요!
    await mongoose.connect(process.env.MONGO_URI);   // MongoDB 연결
    await Lp.create(lpData);                         // 더미 데이터 저장

    console.log('✅ 저장 완료!');
    process.exit(); // 저장 끝나면 종료
  } catch (err) {
    console.error('❌ 저장 오류:', err);
    process.exit(1);
  }
};

insert();
