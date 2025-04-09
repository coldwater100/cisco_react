import React, { useState } from 'react';
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit
} from 'firebase/firestore';
import { QRCodeCanvas } from 'qrcode.react';
import { db } from '../firebase/firebase.js';

function OtpQrPage() {
  const [mac, setMac] = useState('');
  const [otp, setOtp] = useState('');
  const [timestamp, setTimestamp] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchLatestOtp = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'macOtpPairs'),
        orderBy('timestamp', 'desc'),
        limit(1)
      );
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const data = snapshot.docs[0].data();
        setMac(data.mac);
        setOtp(data.otp);
        setTimestamp(data.timestamp?.toDate());
      } else {
        alert('등록된 MAC이 없습니다.');
        setMac('');
        setOtp('');
        setTimestamp(null);
      }
    } catch (err) {
      console.error('🔥 Firestore 조회 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>🔐 OTP QR 코드</h2>

      <button
        onClick={fetchLatestOtp}
        style={{
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          marginBottom: '1rem',
        }}
      >
        🔄 가장 최근 등록된 MAC 불러오기
      </button>

      {loading && <p>⏳ 불러오는 중...</p>}

      {mac && otp && (
        <div style={{ marginTop: '2rem' }}>
          <p><strong>MAC:</strong> {mac}</p>
          <p><strong>OTP:</strong> {otp}</p>
          <p>
            <strong>등록 시간:</strong>{' '}
            {timestamp?.toLocaleString('ko-KR', {
              timeZone: 'Asia/Seoul',
              hour12: false,
            })}
          </p>
          <QRCodeCanvas value={otp} size={200} />
        </div>
      )}
    </div>
  );
}

export default OtpQrPage;
