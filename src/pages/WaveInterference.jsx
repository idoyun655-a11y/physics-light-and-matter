import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Slider } from '../components/Slider';

export default function WaveInterference() {
  const [wavelength, setWavelength] = useState(500);
  const [slitDistance, setSlitDistance] = useState(0.5);
  const [screenDistance, setScreenDistance] = useState(2);
  const [intensity, setIntensity] = useState(1);

  // 간섭 무늬 데이터 생성
  const generateInterferencePattern = () => {
    const data = [];
    const points = 100;
    const range = 5;

    for (let i = 0; i < points; i++) {
      const y = (i / points) * range - range / 2;
      // 두 슬릿으로부터의 거리 차이
      const pathDiff = (slitDistance * y) / screenDistance;
      // 위상 차이
      const phaseDiff = (2 * Math.PI * pathDiff) / (wavelength / 1000);
      // 간섭 강도 (코사인 함수)
      const I = Math.pow(Math.cos(phaseDiff / 2), 2) * intensity;

      data.push({
        position: y.toFixed(2),
        intensity: Math.max(0, I * 100),
        constructive: Math.abs(phaseDiff % (2 * Math.PI)) < 0.5 ? I * 100 : 0,
      });
    }
    return data;
  };

  const interferenceData = generateInterferencePattern();

  // 파동 시뮬레이션 데이터
  const generateWaveData = () => {
    const data = [];
    for (let x = 0; x < 100; x += 2) {
      const wave1 = Math.sin((x / 10) * Math.PI);
      const wave2 = Math.sin((x / 10) * Math.PI + Math.PI / 4);
      const combined = wave1 + wave2;
      data.push({
        x,
        wave1: wave1 * 50,
        wave2: wave2 * 50,
        combined: combined * 50,
      });
    }
    return data;
  };

  const waveData = generateWaveData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* 제목 */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">빛의 파동성</h1>
          <p className="text-lg text-gray-600">
            중첩과 간섭을 통해 빛의 파동 특성을 이해합니다.
          </p>
        </div>

        {/* 개념 설명 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">개념 설명</h3>
            <div className="space-y-4 text-gray-700">
              <div>
                <h4 className="font-semibold text-blue-600 mb-2">🌊 파동성 (Wave Nature)</h4>
                <p>
                  빛은 전자기파로서 파동의 특성을 가집니다. 파장, 진동수, 진폭 등의 파동 특성을 나타냅니다.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-600 mb-2">🔄 중첩 (Superposition)</h4>
                <p>
                  두 개 이상의 파동이 같은 공간에서 만날 때, 합성된 파동은 각 파동의 합으로 표현됩니다.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-600 mb-2">✨ 간섭 (Interference)</h4>
                <p>
                  두 파동이 만날 때 보강 간섭(밝음)과 상쇄 간섭(어두움)이 발생합니다.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-600 mb-2">🎯 영의 이중슬릿 실험</h4>
                <p>
                  두 개의 슬릿을 통과한 빛이 간섭 무늬를 만들며, 이는 빛의 파동성을 증명합니다.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">주요 공식</h3>
            <div className="space-y-4 text-gray-700 font-mono text-sm bg-gray-50 p-4 rounded">
              <div>
                <p className="font-semibold text-blue-600">파동의 기본 관계식:</p>
                <p className="text-gray-800">c = λν</p>
                <p className="text-xs text-gray-600 mt-1">c: 광속, λ: 파장, ν: 진동수</p>
              </div>
              <div className="border-t pt-4">
                <p className="font-semibold text-blue-600">간섭 조건:</p>
                <p className="text-gray-800">경로차 = nλ (보강 간섭)</p>
                <p className="text-gray-800">경로차 = (n+1/2)λ (상쇄 간섭)</p>
              </div>
              <div className="border-t pt-4">
                <p className="font-semibold text-blue-600">이중슬릿 간섭:</p>
                <p className="text-gray-800">y = nλL/d</p>
                <p className="text-xs text-gray-600 mt-1">L: 화면까지 거리, d: 슬릿 간격</p>
              </div>
            </div>
          </div>
        </div>

        {/* 파동 중첩 시뮬레이션 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">파동 중첩 시뮬레이션</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={waveData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="wave1" stroke="#3b82f6" name="파동 1" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="wave2" stroke="#10b981" name="파동 2" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="combined" stroke="#f59e0b" name="합성파" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-gray-600 text-sm mt-4">
            두 개의 파동이 만날 때 합성파가 생성됩니다. 위상이 같으면 보강 간섭, 반대면 상쇄 간섭이 발생합니다.
          </p>
        </div>

        {/* 이중슬릿 간섭 시뮬레이션 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">영의 이중슬릿 간섭 무늬</h3>
          
          {/* 컨트롤 패널 */}
          <div className="grid md:grid-cols-3 gap-6 mb-8 bg-gray-50 p-6 rounded-lg">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                파장: {wavelength} nm
              </label>
              <input
                type="range"
                min="400"
                max="700"
                value={wavelength}
                onChange={(e) => setWavelength(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">가시광선 범위 (400-700nm)</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                슬릿 간격: {slitDistance.toFixed(2)} mm
              </label>
              <input
                type="range"
                min="0.1"
                max="2"
                step="0.1"
                value={slitDistance}
                onChange={(e) => setSlitDistance(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                화면 거리: {screenDistance.toFixed(1)} m
              </label>
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.5"
                value={screenDistance}
                onChange={(e) => setScreenDistance(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          {/* 간섭 무늬 그래프 */}
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={interferenceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="position" label={{ value: '화면 위치 (상대 단위)', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: '상대 강도', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => value.toFixed(2)} />
              <Legend />
              <Line
                type="monotone"
                dataKey="intensity"
                stroke="#f59e0b"
                name="간섭 강도"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">📊 해석</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 밝은 부분: 보강 간섭 (두 파동의 위상이 같음)</li>
              <li>• 어두운 부분: 상쇄 간섭 (두 파동의 위상이 반대)</li>
              <li>• 슬릿 간격이 좁을수록 간섭 무늬의 간격이 넓어집니다</li>
              <li>• 파장이 길수록 간섭 무늬의 간격이 넓어집니다</li>
            </ul>
          </div>
        </div>

        {/* 응용 분야 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">응용 분야</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-900 mb-2">🔬 회절 격자 (Diffraction Grating)</h4>
              <p className="text-sm text-blue-800">
                많은 슬릿을 이용하여 빛을 분산시켜 분광 분석에 사용됩니다.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <h4 className="font-semibold text-green-900 mb-2">🎬 홀로그래피 (Holography)</h4>
              <p className="text-sm text-green-800">
                간섭 무늬를 기록하여 3D 이미지를 만드는 기술입니다.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-semibold text-purple-900 mb-2">🌈 광학 코팅 (Optical Coating)</h4>
              <p className="text-sm text-purple-800">
                간섭을 이용하여 렌즈와 거울의 반사율을 조절합니다.
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
              <h4 className="font-semibold text-orange-900 mb-2">📡 간섭계 (Interferometer)</h4>
              <p className="text-sm text-orange-800">
                매우 정밀한 거리와 파장을 측정하는 데 사용됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
