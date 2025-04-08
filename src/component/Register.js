// src/components/Register.js
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const Register = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');

  const handleRegister = async () => {
    if (!id || !password) {
      setResult('ID와 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'users'), {
        id: id,
        password: password, // 실제 서비스에서는 해시화 필요!
        createdAt: new Date()
      });
      setResult(`회원가입 성공! 사용자 문서 ID: ${docRef.id}`);
      setId('');
      setPassword('');
    } catch (error) {
      console.error("회원가입 에러:", error);
      setResult('회원가입 실패');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>회원가입</h2>
      <input
        type="text"
        placeholder="ID (이메일 형태도 가능)"
        value={id}
        onChange={(e) => setId(e.target.value)}
      /><br /><br />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />
      <button onClick={handleRegister}>가입하기</button>
      <p>{result}</p>
    </div>
  );
};

export default Register;
