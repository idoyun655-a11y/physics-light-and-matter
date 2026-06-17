import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function EnergyBand() {
  const [temperature, setTemperature] = useState(300);
  const [biasVoltage, setBiasVoltage] = useState(0);

  // 에너지띠 구조 데이터
  const generateBandStructure = () => {
    return [
      { material: '도체', bandGap: 0, conduction: 100, valence: 100, type: 'Conductor' },
      { material: '반도체', bandGap: 1.1, conduction: 50, valence: 50, type: 'Semiconductor' },
      { material: '절연체', bandGap: 5, conduction: 10, valence: 10, type: 'Insulator' },
    ];
  };

  const bandStructure = generateBandStructure();

  // 온도에 따른 전도도 변화
  const generateConductivityData = () => {
    const data = [];
    for (let T = 0; T <= 500; T += 50) {
      const conductivity = Math.exp(-0.05 / (8.617e-5 * T)) * 100;
      data.push({
        temperature: T,
        conductivity: Math.min(100, conductivity),
      });
    }
    return data;
  };

  const conductivityData = generateConductivityData();

  // p-n 접합 특성
  const generateDiodeCharacteristic = () => {
    const data = [];
    for (let V = -2; V <= 1; V += 0.1) {
      const thermalVoltage = 0.026; // 25°C에서
      const Is = 1e-12; // 역포화 전류
      const current = Is * (Math.exp(V / thermalVoltage) - 1) * 1e9;
      data.push({
        voltage: V.toFixed(1),
        current: Math.max(-100, Math.min(1000, current)),
      });
    }
    return data;
  };

  const diodeCharacteristic = generateDiodeCharacteristic();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* 제목 */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">에너지띠와 반도체</h1>
          <p className="text-lg text-gray-600">
            고체의 에너지띠 구조와 반도체 소자의 원리를 학습합니다.
          </p>
        </div>

        {/* 개념 설명 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">개념 설명</h3>
            <div className="space-y-4 text-gray-700">
              <div>
                <h4 className="font-semibold text-pink-600 mb-2">📊 에너지띠 (Energy Band)</h4>
                <p>
                  많은 원자가 모여 있을 때 에너지 준위가 연속적인 띠를 형성합니다.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-pink-600 mb-2">⚡ 전도띠와 원자가띠</h4>
                <p>
                  전도띠: 전자가 자유롭게 이동 가능한 띠
                  원자가띠: 원자에 속박된 전자들의 띠
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-pink-600 mb-2">🔌 밴드갭 (Band Gap)</h4>
                <p>
                  전도띠와 원자가띠 사이의 에너지 간격. 작을수록 전도성이 좋습니다.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-pink-600 mb-2">🔄 정공 (Hole)</h4>
                <p>
                  원자가띠에서 전자가 빠져나간 자리로, 양의 전하를 가진 입자처럼 작용합니다.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">주요 공식</h3>
            <div className="space-y-4 text-gray-700 font-mono text-sm bg-gray-50 p-4 rounded">
              <div>
                <p className="font-semibold text-pink-600">반도체 전도도:</p>
                <p className="text-gray-800">σ = σ₀ exp(-Eg/2kT)</p>
                <p className="text-xs text-gray-600 mt-1">Eg: 밴드갭, k: 볼츠만 상수</p>
              </div>
              <div className="border-t pt-4">
                <p className="font-semibold text-pink-600">다이오드 전류:</p>
                <p className="text-gray-800">I = Is(e^(V/Vt) - 1)</p>
                <p className="text-xs text-gray-600 mt-1">Is: 역포화 전류, Vt: 열전압</p>
              </div>
              <div className="border-t pt-4">
                <p className="font-semibold text-pink-600">열전압:</p>
                <p className="text-gray-800">Vt = kT/q ≈ 26 mV (25°C)</p>
                <p className="text-xs text-gray-600 mt-1">온도에 따라 변함</p>
              </div>
            </div>
          </div>
        </div>

        {/* 에너지띠 구조 비교 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">도체, 반도체, 절연체의 에너지띠</h3>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {/* 도체 */}
            <div className="p-6 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-4">도체 (Conductor)</h4>
              <div className="flex flex-col items-center justify-center h-40 bg-white rounded border-2 border-blue-300 mb-4">
                <div className="w-full h-16 bg-blue-400 flex items-center justify-center text-white font-semibold">
                  전도띠
                </div>
                <div className="w-full h-2 bg-gray-300"></div>
                <div className="w-full h-16 bg-blue-200 flex items-center justify-center text-blue-900 font-semibold">
                  원자가띠
                </div>
              </div>
              <p className="text-sm text-blue-800">
                밴드갭 = 0
                전자가 자유롭게 이동 가능
              </p>
            </div>

            {/* 반도체 */}
            <div className="p-6 bg-pink-50 rounded-lg">
              <h4 className="font-semibold text-pink-900 mb-4">반도체 (Semiconductor)</h4>
              <div className="flex flex-col items-center justify-center h-40 bg-white rounded border-2 border-pink-300 mb-4">
                <div className="w-full h-12 bg-pink-400 flex items-center justify-center text-white font-semibold text-sm">
                  전도띠
                </div>
                <div className="w-full h-8 bg-yellow-300 flex items-center justify-center text-yellow-900 font-semibold text-xs">
                  밴드갭
                </div>
                <div className="w-full h-12 bg-pink-200 flex items-center justify-center text-pink-900 font-semibold text-sm">
                  원자가띠
                </div>
              </div>
              <p className="text-sm text-pink-800">
                밴드갭 = 1~3 eV
                온도/전압으로 전도성 조절 가능
              </p>
            </div>

            {/* 절연체 */}
            <div className="p-6 bg-red-50 rounded-lg">
              <h4 className="font-semibold text-red-900 mb-4">절연체 (Insulator)</h4>
              <div className="flex flex-col items-center justify-center h-40 bg-white rounded border-2 border-red-300 mb-4">
                <div className="w-full h-8 bg-red-400 flex items-center justify-center text-white font-semibold text-xs">
                  전도띠
                </div>
                <div className="w-full h-20 bg-red-200 flex items-center justify-center text-red-900 font-semibold text-xs">
                  큰 밴드갭
                </div>
                <div className="w-full h-8 bg-red-300 flex items-center justify-center text-red-900 font-semibold text-xs">
                  원자가띠
                </div>
              </div>
              <p className="text-sm text-red-800">
                밴드갭 &gt; 3 eV
                전자가 거의 이동하지 않음
              </p>
            </div>
          </div>
        </div>

        {/* 온도에 따른 전도도 변화 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">온도에 따른 반도체 전도도</h3>
          
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={conductivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="temperature" label={{ value: '온도 (K)', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: '상대 전도도 (%)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="conductivity" stroke="#ec4899" name="전도도" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>

          <div className="mt-4 p-4 bg-pink-50 rounded-lg border-l-4 border-pink-500">
            <h4 className="font-semibold text-pink-900 mb-2">📊 해석</h4>
            <p className="text-sm text-pink-800">
              반도체의 전도도는 온도가 증가하면 증가합니다. 
              이는 도체와 반대로, 온도 증가에 따라 전자-정공 쌍이 더 많이 생성되기 때문입니다.
            </p>
          </div>
        </div>

        {/* p-n 접합과 다이오드 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">p-n 접합과 다이오드</h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* p-n 접합 구조 */}
            <div className="p-6 bg-gradient-to-r from-red-50 to-blue-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-4">p-n 접합 구조</h4>
              <svg viewBox="0 0 300 200" className="w-full h-auto">
                {/* p형 영역 */}
                <rect x="10" y="50" width="130" height="100" fill="#ff9999" opacity="0.5" stroke="#cc0000" strokeWidth="2" />
                <text x="75" y="105" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#cc0000">p형</text>
                <text x="75" y="125" textAnchor="middle" fontSize="12" fill="#666">정공 (⊕)</text>
                
                {/* n형 영역 */}
                <rect x="160" y="50" width="130" height="100" fill="#9999ff" opacity="0.5" stroke="#0000cc" strokeWidth="2" />
                <text x="225" y="105" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0000cc">n형</text>
                <text x="225" y="125" textAnchor="middle" fontSize="12" fill="#666">전자 (⊖)</text>
                
                {/* 접합면 */}
                <line x1="145" y1="50" x2="145" y2="150" stroke="#000" strokeWidth="3" />
                <text x="145" y="30" textAnchor="middle" fontSize="12" fontWeight="bold">접합면</text>
              </svg>
            </div>

            {/* 다이오드 기호 및 특성 */}
            <div className="p-6 bg-gradient-to-r from-green-50 to-yellow-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-4">다이오드 기호 및 동작</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <svg viewBox="0 0 100 50" className="w-24 h-auto">
                    <polygon points="20,10 20,40 50,25" fill="#333" />
                    <rect x="50" y="10" width="5" height="30" fill="#333" />
                    <line x1="10" y1="25" x2="20" y2="25" stroke="#333" strokeWidth="2" />
                    <line x1="55" y1="25" x2="70" y2="25" stroke="#333" strokeWidth="2" />
                  </svg>
                  <div className="text-sm">
                    <p className="font-semibold text-gray-900">다이오드 기호</p>
                    <p className="text-gray-600">삼각형: p형, 막대: n형</p>
                  </div>
                </div>
                <div className="p-3 bg-green-100 rounded border-l-4 border-green-600">
                  <p className="text-sm font-semibold text-green-900">순방향 편향</p>
                  <p className="text-xs text-green-800">전류 흐름, 낮은 저항</p>
                </div>
                <div className="p-3 bg-red-100 rounded border-l-4 border-red-600">
                  <p className="text-sm font-semibold text-red-900">역방향 편향</p>
                  <p className="text-xs text-red-800">전류 차단, 높은 저항</p>
                </div>
              </div>
            </div>
          </div>

          {/* 다이오드 특성 곡선 */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-4">다이오드 I-V 특성 곡선</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={diodeCharacteristic}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="voltage" label={{ value: '전압 (V)', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: '전류 (nA)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="current" stroke="#ec4899" name="전류" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-sm text-gray-600 mt-4">
              순방향(양의 전압)에서 지수함수적으로 증가하고, 역방향(음의 전압)에서는 거의 0에 가까운 역포화 전류만 흐릅니다.
            </p>
          </div>
        </div>

        {/* 응용 분야 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">응용 분야</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-500">
              <h4 className="font-semibold text-pink-900 mb-2">💡 LED (발광 다이오드)</h4>
              <p className="text-sm text-pink-800">
                전자-정공 재결합 시 발생하는 빛을 이용합니다.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-semibold text-purple-900 mb-2">🔌 정류 다이오드</h4>
              <p className="text-sm text-purple-800">
                교류를 직류로 변환하는 정류 회로에 사용됩니다.
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-900 mb-2">☀️ 태양전지</h4>
              <p className="text-sm text-blue-800">
                빛 에너지를 전기 에너지로 변환합니다.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <h4 className="font-semibold text-green-900 mb-2">📱 트랜지스터</h4>
              <p className="text-sm text-green-800">
                전자 신호를 증폭하거나 스위칭하는 데 사용됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
