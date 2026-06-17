import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Relativity() {
  const [velocity, setVelocity] = useState(0.5); // c의 배수
  const c = 299792458; // 광속 (m/s)

  // 로렌츠 인수 계산
  const gamma = 1 / Math.sqrt(1 - velocity * velocity);
  const timeDilation = gamma;
  const lengthContraction = 1 / gamma;
  const relativisticMass = gamma;
  const kineticEnergy = (gamma - 1) * 0.511; // MeV (전자 기준)

  // 시간 팽창 데이터
  const generateTimeDilationData = () => {
    const data = [];
    for (let v = 0; v <= 0.99; v += 0.05) {
      const g = 1 / Math.sqrt(1 - v * v);
      data.push({
        velocity: (v * 100).toFixed(0),
        timeDilation: g.toFixed(2),
        lengthContraction: (1 / g).toFixed(2),
      });
    }
    return data;
  };

  const timeDilationData = generateTimeDilationData();

  // 상대론적 에너지 데이터
  const generateEnergyData = () => {
    const data = [];
    for (let v = 0; v <= 0.99; v += 0.05) {
      const g = 1 / Math.sqrt(1 - v * v);
      const E = g * 0.511; // 정지 에너지 = 0.511 MeV
      const Ek = (g - 1) * 0.511;
      data.push({
        velocity: (v * 100).toFixed(0),
        totalEnergy: E.toFixed(2),
        kineticEnergy: Ek.toFixed(2),
      });
    }
    return data;
  };

  const energyData = generateEnergyData();

  // 뮤온 수명 예제
  const muonRestLifetime = 2.2e-6; // 초
  const muonMovingLifetime = muonRestLifetime * gamma;
  const muonDistance = velocity * c * muonMovingLifetime;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* 제목 */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">특수 상대성 이론</h1>
          <p className="text-lg text-gray-600">
            광속 불변과 시간 팽창, 길이 수축 현상을 학습합니다.
          </p>
        </div>

        {/* 개념 설명 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">개념 설명</h3>
            <div className="space-y-4 text-gray-700">
              <div>
                <h4 className="font-semibold text-red-600 mb-2">💡 광속 불변의 원리</h4>
                <p>
                  모든 관성계에서 빛의 속력은 동일하게 약 3×10⁸ m/s입니다.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-red-600 mb-2">⏱️ 시간 팽창 (Time Dilation)</h4>
                <p>
                  빠르게 움직이는 물체의 시간은 느리게 흐릅니다.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-red-600 mb-2">📏 길이 수축 (Length Contraction)</h4>
                <p>
                  빠르게 움직이는 물체의 길이는 운동 방향으로 줄어듭니다.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-red-600 mb-2">⚡ 질량-에너지 동등성</h4>
                <p>
                  E = mc² - 질량과 에너지는 상호 변환 가능합니다.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">주요 공식</h3>
            <div className="space-y-4 text-gray-700 font-mono text-sm bg-gray-50 p-4 rounded">
              <div>
                <p className="font-semibold text-red-600">로렌츠 인수:</p>
                <p className="text-gray-800">γ = 1/√(1 - v²/c²)</p>
                <p className="text-xs text-gray-600 mt-1">v: 속도, c: 광속</p>
              </div>
              <div className="border-t pt-4">
                <p className="font-semibold text-red-600">시간 팽창:</p>
                <p className="text-gray-800">Δt = γΔt₀</p>
                <p className="text-xs text-gray-600 mt-1">Δt₀: 정지 시간</p>
              </div>
              <div className="border-t pt-4">
                <p className="font-semibold text-red-600">길이 수축:</p>
                <p className="text-gray-800">L = L₀/γ</p>
                <p className="text-xs text-gray-600 mt-1">L₀: 정지 길이</p>
              </div>
              <div className="border-t pt-4">
                <p className="font-semibold text-red-600">질량-에너지:</p>
                <p className="text-gray-800">E = γmc²</p>
                <p className="text-xs text-gray-600 mt-1">정지 에너지: E₀ = mc²</p>
              </div>
            </div>
          </div>
        </div>

        {/* 상대론적 효과 시뮬레이션 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">상대론적 효과 시뮬레이션</h3>
          
          {/* 속도 컨트롤 */}
          <div className="mb-8 bg-gray-50 p-6 rounded-lg">
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              속도: {(velocity * 100).toFixed(1)}% × c
            </label>
            <input
              type="range"
              min="0"
              max="0.99"
              step="0.01"
              value={velocity}
              onChange={(e) => setVelocity(Number(e.target.value))}
              className="w-full"
            />
            <p className="text-xs text-gray-600 mt-2">
              {(velocity * c / 1e6).toFixed(0)} × 10⁶ m/s
            </p>
          </div>

          {/* 결과 표시 */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <p className="text-sm text-gray-600 mb-1">로렌츠 인수 (γ)</p>
              <p className="text-3xl font-bold text-blue-600">{gamma.toFixed(3)}</p>
              <p className="text-xs text-gray-500 mt-1">
                {velocity === 0 ? '정지 상태' : `${((gamma - 1) * 100).toFixed(1)}% 증가`}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
              <p className="text-sm text-gray-600 mb-1">시간 팽창 배수</p>
              <p className="text-3xl font-bold text-green-600">{timeDilation.toFixed(3)}×</p>
              <p className="text-xs text-gray-500 mt-1">
                {velocity === 0 ? '시간이 같은 속도로 흐름' : '시간이 느리게 흐름'}
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
              <p className="text-sm text-gray-600 mb-1">길이 수축 배수</p>
              <p className="text-3xl font-bold text-orange-600">{lengthContraction.toFixed(3)}×</p>
              <p className="text-xs text-gray-500 mt-1">
                {velocity === 0 ? '길이가 변하지 않음' : '길이가 줄어듦'}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
              <p className="text-sm text-gray-600 mb-1">상대론적 질량</p>
              <p className="text-3xl font-bold text-purple-600">{relativisticMass.toFixed(3)}m</p>
              <p className="text-xs text-gray-500 mt-1">
                {velocity === 0 ? '정지 질량' : '질량이 증가함'}
              </p>
            </div>
          </div>
        </div>

        {/* 시간 팽창과 길이 수축 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">시간 팽창과 길이 수축</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeDilationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="velocity" label={{ value: '속도 (% × c)', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: '배수', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="timeDilation" stroke="#ef4444" name="시간 팽창" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="lengthContraction" stroke="#3b82f6" name="길이 수축" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-sm text-gray-600 mt-4">
            속도가 증가할수록 시간 팽창은 증가하고 길이 수축은 감소합니다.
          </p>
        </div>

        {/* 상대론적 에너지 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">상대론적 에너지</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={energyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="velocity" label={{ value: '속도 (% × c)', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: '에너지 (MeV)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="totalEnergy" stroke="#f59e0b" name="전체 에너지" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="kineticEnergy" stroke="#ef4444" name="운동 에너지" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-sm text-gray-600 mt-4">
            속도가 증가하면 운동 에너지가 급격히 증가합니다. 전체 에너지는 항상 정지 에너지(0.511 MeV)보다 큽니다.
          </p>
        </div>

        {/* 뮤온 수명 예제 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">시간 팽창의 실제 예: 뮤온</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-4">뮤온의 성질</h4>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>우주선이 지구 대기와 충돌할 때 생성</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>정지 상태에서 수명: 2.2 μs</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>매우 빠른 속도로 이동: ~0.998c</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>지표면에서 검출 가능</span>
                </li>
              </ul>
            </div>

            <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-4">계산 결과</h4>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-white rounded border-l-4 border-blue-500">
                  <p className="text-gray-600 mb-1">정지 수명</p>
                  <p className="text-lg font-semibold text-blue-600">{(muonRestLifetime * 1e6).toFixed(1)} μs</p>
                </div>
                <div className="p-3 bg-white rounded border-l-4 border-purple-500">
                  <p className="text-gray-600 mb-1">이동 중 수명 (시간 팽창)</p>
                  <p className="text-lg font-semibold text-purple-600">{(muonMovingLifetime * 1e6).toFixed(1)} μs</p>
                </div>
                <div className="p-3 bg-white rounded border-l-4 border-orange-500">
                  <p className="text-gray-600 mb-1">이동 거리</p>
                  <p className="text-lg font-semibold text-orange-600">{(muonDistance / 1000).toFixed(1)} km</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
            <h4 className="font-semibold text-red-900 mb-2">📊 해석</h4>
            <p className="text-sm text-red-800">
              시간 팽창이 없다면, 뮤온은 정지 수명 동안 약 660m만 이동하고 지표면에 도달하지 못합니다.
              하지만 실제로는 시간 팽창으로 인해 뮤온의 시간이 느리게 흐르므로, 
              뮤온 입장에서는 짧은 시간에 긴 거리를 이동할 수 있어 지표면에서 검출됩니다.
              이는 특수 상대성 이론의 직접적인 증거입니다.
            </p>
          </div>
        </div>

        {/* 응용 분야 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">응용 분야 및 영향</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
              <h4 className="font-semibold text-red-900 mb-2">🛰️ GPS 시스템</h4>
              <p className="text-sm text-red-800">
                위성의 시간 팽창을 보정해야 정확한 위치 결정이 가능합니다.
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
              <h4 className="font-semibold text-orange-900 mb-2">⚛️ 핵 에너지</h4>
              <p className="text-sm text-orange-800">
                E=mc²로 질량 손실이 엄청난 에너지를 방출합니다.
              </p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <h4 className="font-semibold text-yellow-900 mb-2">🔬 입자 가속기</h4>
              <p className="text-sm text-yellow-800">
                고에너지 입자의 거동을 상대론적으로 계산해야 합니다.
              </p>
            </div>
            <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-500">
              <h4 className="font-semibold text-pink-900 mb-2">🌌 우주론</h4>
              <p className="text-sm text-pink-800">
                우주의 팽창과 블랙홀 이론의 기초가 됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
