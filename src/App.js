import React from 'react';
import OtpQrPage from './component/OtpQrPage';

function App() {
  return (
    <div>
      {/* 테스트할 MAC 주소 입력 */}
      <OtpQrPage mac="AA:BB:CC:DD:EE:FF" />
    </div>
  );
}

export default App;
