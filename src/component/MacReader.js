import React, { useState } from "react";

function MacReader() {
  const [macAddress, setMacAddress] = useState("");
  const [error, setError] = useState("");

  const readSerial = async () => {
    setError("");
    try {
      // 포트 선택
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 9600 });

      const decoder = new TextDecoderStream();
      const inputDone = port.readable.pipeTo(decoder.writable);
      const inputStream = decoder.readable.getReader();

      let mac = "";
      while (true) {
        const { value, done } = await inputStream.read();
        if (done) break;
        if (value) {
          mac += value;
          // MAC 주소 형식으로 보이면 출력
          if (mac.match(/^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/)) {
            setMacAddress(mac.trim());
            break;
          }
        }
      }

      inputStream.releaseLock();
      await port.close();
    } catch (err) {
      console.error("Error reading from serial port:", err);
      setError("Serial 통신 오류: " + err.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">📡 MAC 주소 리더</h1>
      <button
        onClick={readSerial}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        시리얼에서 MAC 주소 읽기
      </button>
      {macAddress && (
        <div className="mt-4 text-green-600">
          ✅ MAC 주소: <span className="font-mono">{macAddress}</span>
        </div>
      )}
      {error && (
        <div className="mt-4 text-red-600">
          ⚠️ 오류: {error}
        </div>
      )}
    </div>
  );
}

export default MacReader;
