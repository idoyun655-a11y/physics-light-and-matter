import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function DualNature() {
  const [frequency, setFrequency] = useState(5e14); // Hz
  const [workFunction, setWorkFunction] = useState(2.3); // eV
  const [wavelength, setWavelength] = useState(600); // nm

  const c = 3e8; // 광속 (m/s)
  const h = 6.626e-34; // 플랑크 상수 (J·s)
  const hEV = 4.136e-15; // 플랑크 상수 (eV·s)
  const e = 1.602e-19; // 전자 전하 (C)

  // 광자 에너지 계산
  const photonEnergy = hEV * frequency;
  const kineticEnergy = Math.max(0, photonEnergy - workFunction);
  const maxVelocity = Math.sqrt((2 * kineticEnergy * e) / (9.109e-31));

  // 물질파 파장 계산 (드 브로이 파장)
  const electronMomentum = Math.sqrt(2 * 9.109e-31 * kineticEnergy * e);
  const deBroglieWavelength = h / electronMomentum * 1e9; // nm

  // 광전 효과 데이터
  const generatePhotoelectricData = () => {
    const data = [];
    for (let freq = 3e14; freq <= 8e14; freq += 5e13) {
      const energy = hEV * freq;
      const kinetic = Math.max(0, energy - workFunction);
      data.push({
        frequency: (freq / 1e14).toFixed(1),
        photoelectricCurrent: kinetic > 0 ? kinetic * 100 : 0,
      });
    }
    return data;
  };

  const photoelectricData = generatePhotoelectricData();

  // 파장 vs 광전 효과
  const generateWavelengthData = () => {
    const data = [];
    for (let wl = 200; wl <= 800; wl += 50) {
      const freq = c / (wl * 1e-9);
      const energy = hEV * freq;
      const kinetic = Math.max(0, energy - workFunction);
      data.push({
        wavelength: wl,
        kineticEnergy: kinetic,
        emitted: kinetic > 0 ? 1 : 0,
      });
    }
    return data;
  };

  const wavelengthData = generateWavelengthData();

  // 입자 특성
  const particles = [
    {
      name: '광자 (Photon)',
      wave: '파동성 (전자기파)',
      particle: '입자성 (에너지 양자)',
      energy: `E = hν = ${photonEnergy.toFixed(2)} eV`,
      momentum: `p = E/c`,
      icon: '💡',
    },
    {
      name: '전자 (Electron)',
      wave: '파동성 (물질파)',
      particle: '입자성 (질량과 전하)',
      energy: `E = ${kineticEnergy.toFixed(2)} eV`,
      momentum: `λ = h/p = ${deBroglieWavelength.toFixed(3)} nm`,
      icon: '⚛️',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* 제목 */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">빛과 물질의 이중성</h1>
          <p className="text-lg text-gray-600">
            광전 효과와 물질파를 통해 빛과 물질의 이중성을 이해합니다.
          </p>
        </div>

        {/* 개념 설명 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">개념 설명</h3>
            <div className="space-y-4 text-gray-700">
              <div>
                <h4 className="font-semibold text-orange-600 mb-2">💡 광전 효과 (Photoelectric Effect)</h4>
                <p>
                  금속 표면에 빛을 비추면 전자가 방출되는 현상입니다. 빛의 입자성을 증명합니다.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-orange-600 mb-2">⚛️ 물질파 (Matter Wave)</h4>
                <p>
                  전자와 같은 물질도 파동의 특성을 가집니다. 드 브로이가 제안한 개념입니다.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-orange-600 mb-2">🔄 이중성 (Duality)</h4>
                <p>
                  빛과 물질은 상황에 따라 파동성과 입자성을 모두 나타냅니다.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-orange-600 mb-2">🔬 응용</h4>
                <p>
                  전자 현미경, 영상 정보 저장, 태양전지 등에 활용됩니다.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">주요 공식</h3>
            <div className="space-y-4 text-gray-700 font-mono text-sm bg-gray-50 p-4 rounded">
              <div>
                <p className="font-semibold text-orange-600">광자 에너지:</p>
                <p className="text-gray-800">E = hν = hc/λ</p>
                <p className="text-xs text-gray-600 mt-1">h: 플랑크 상수, ν: 진동수</p>
              </div>
              <div className="border-t pt-4">
                <p className="font-semibold text-orange-600">광전 효과:</p>
                <p className="text-gray-800">hν = W + Ek</p>
                <p className="text-xs text-gray-600 mt-1">W: 일함수, Ek: 최대 운동에너지</p>
              </div>
              <div className="border-t pt-4">
                <p className="font-semibold text-orange-600">드 브로이 파장:</p>
                <p className="text-gray-800">λ = h/p = h/mv</p>
                <p className="text-xs text-gray-600 mt-1">p: 운동량, m: 질량, v: 속도</p>
              </div>
            </div>
          </div>
        </div>

        {/* 입자 특성 비교 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {particles.map((particle, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md p-6">
              <div className="text-4xl mb-3">{particle.icon}</div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">{particle.name}</h4>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-500">
                  <p className="text-xs text-gray-600 mb-1">파동성</p>
                  <p className="text-sm font-semibold text-blue-900">{particle.wave}</p>
                </div>
                <div className="p-3 bg-orange-50 rounded border-l-4 border-orange-500">
                  <p className="text-xs text-gray-600 mb-1">입자성</p>
                  <p className="text-sm font-semibold text-orange-900">{particle.particle}</p>
                </div>
                <div className="p-3 bg-green-50 rounded border-l-4 border-green-500">
                  <p className="text-xs text-gray-600 mb-1">에너지</p>
                  <p className="text-sm font-mono text-green-900">{particle.energy}</p>
                </div>
                <div className="p-3 bg-purple-50 rounded border-l-4 border-purple-500">
                  <p className="text-xs text-gray-600 mb-1">파장/운동량</p>
                  <p className="text-sm font-mono text-purple-900">{particle.momentum}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 광전 효과 시뮬레이션 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">광전 효과 시뮬레이션</h3>
          
          {/* 컨트롤 */}
          <div className="grid md:grid-cols-3 gap-6 mb-8 bg-gray-50 p-6 rounded-lg">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                진동수: {(frequency / 1e14).toFixed(1)} × 10¹⁴ Hz
              </label>
              <input
                type="range"
                min="3e14"
                max="8e14"
                step="1e13"
                value={frequency}
                onChange={(e) => setFrequency(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                일함수: {workFunction.toFixed(2)} eV
              </label>
              <input
                type="range"
                min="1.5"
                max="4"
                step="0.1"
                value={workFunction}
                onChange={(e) => setWorkFunction(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                파장: {wavelength} nm
              </label>
              <input
                type="range"
                min="200"
                max="800"
                step="10"
                value={wavelength}
                onChange={(e) => setWavelength(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          {/* 결과 */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <p className="text-sm text-gray-600 mb-1">광자 에너지</p>
              <p className="text-2xl font-bold text-blue-600">{photonEnergy.toFixed(2)} eV</p>
            </div>
            <div className={`p-4 rounded-lg border-l-4 ${kineticEnergy > 0 ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
              <p className="text-sm text-gray-600 mb-1">최대 운동에너지</p>
              <p className={`text-2xl font-bold ${kineticEnergy > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {kineticEnergy.toFixed(3)} eV
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
              <p className="text-sm text-gray-600 mb-1">전자 방출 상태</p>
              <p className={`text-lg font-bold ${kineticEnergy > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {kineticEnergy > 0 ? '✓ 방출됨' : '✗ 방출 안 됨'}
              </p>
            </div>
          </div>

          {/* 그래프 */}
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={wavelengthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="wavelength" label={{ value: '파장 (nm)', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: '운동에너지 (eV)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="kineticEnergy" stroke="#f59e0b" name="최대 운동에너지" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 물질파와 전자 현미경 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">물질파와 전자 현미경</h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-4">드 브로이 파장</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">운동 에너지:</span>
                  <span className="font-semibold text-gray-900">{kineticEnergy.toFixed(3)} eV</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">운동량:</span>
                  <span className="font-semibold text-gray-900">{(electronMomentum * 1e24).toFixed(3)} × 10⁻²⁴ kg·m/s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">드 브로이 파장:</span>
                  <span className="font-semibold text-gray-900">{deBroglieWavelength.toFixed(3)} nm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">전자 속도:</span>
                  <span className="font-semibold text-gray-900">{(maxVelocity / 1e6).toFixed(2)} × 10⁶ m/s</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-4">전자 현미경의 원리</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex gap-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <span>전자의 파장이 가시광선보다 훨씬 짧음</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <span>짧은 파장으로 더 작은 물체를 관찰 가능</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <span>광학 현미경보다 1000배 이상 확대 가능</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <span>원자 수준의 구조 관찰 가능</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 응용 분야 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">응용 분야</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
              <h4 className="font-semibold text-orange-900 mb-2">📷 전자 현미경</h4>
              <p className="text-sm text-orange-800">
                물질파를 이용하여 나노 스케일의 구조를 관찰합니다.
              </p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <h4 className="font-semibold text-yellow-900 mb-2">☀️ 태양전지</h4>
              <p className="text-sm text-yellow-800">
                광전 효과를 이용하여 빛을 전기 에너지로 변환합니다.
              </p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
              <h4 className="font-semibold text-red-900 mb-2">💾 영상 정보 저장</h4>
              <p className="text-sm text-red-800">
                광전 효과를 이용한 센서로 이미지를 캡처합니다.
              </p>
            </div>
            <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-500">
              <h4 className="font-semibold text-pink-900 mb-2">🔦 광전자 증배관</h4>
              <p className="text-sm text-pink-800">
                매우 약한 빛을 감지하는 장치로 사용됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
