import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function AtomicStructure() {
  const [electronShell, setElectronShell] = useState(2);
  const [wavelengthFilter, setWavelengthFilter] = useState(656);

  // 보어 모형 에너지 준위
  const calculateEnergy = (n) => {
    return -13.6 / (n * n); // eV
  };

  // 에너지 준위 데이터
  const energyLevels = [
    { n: 1, energy: calculateEnergy(1), label: 'n=1' },
    { n: 2, energy: calculateEnergy(2), label: 'n=2' },
    { n: 3, energy: calculateEnergy(3), label: 'n=3' },
    { n: 4, energy: calculateEnergy(4), label: 'n=4' },
    { n: 5, energy: calculateEnergy(5), label: 'n=5' },
    { n: 6, energy: calculateEnergy(6), label: 'n=6' },
  ];

  // 수소 원자 선스펙트럼 (발머 계열)
  const generateSpectrum = () => {
    const data = [];
    for (let n = 3; n <= 6; n++) {
      const E1 = calculateEnergy(2);
      const En = calculateEnergy(n);
      const energyDiff = En - E1;
      const c = 3e8;
      const h = 6.626e-34;
      const frequency = Math.abs(energyDiff * 1.602e-19) / h;
      const wavelength = c / frequency * 1e9;
      
      data.push({
        transition: `n=${n}→2`,
        wavelength: Math.round(wavelength),
        energy: Math.abs(energyDiff),
        color: wavelength > 700 ? '#ff0000' : wavelength > 600 ? '#ff7700' : wavelength > 500 ? '#00ff00' : '#0000ff',
      });
    }
    return data;
  };

  const spectrum = generateSpectrum();

  // 에너지 준위 다이어그램 데이터
  const energyDiagramData = energyLevels.map((level, idx) => ({
    n: level.n,
    energy: level.energy,
    index: idx,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* 제목 */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">원자 구조와 에너지 준위</h1>
          <p className="text-lg text-gray-600">
            보어의 원자 모형과 양자화된 에너지 준위를 학습합니다.
          </p>
        </div>

        {/* 개념 설명 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">개념 설명</h3>
            <div className="space-y-4 text-gray-700">
              <div>
                <h4 className="font-semibold text-purple-600 mb-2">⚛️ 보어의 원자 모형</h4>
                <p>
                  전자는 원자핵 주위의 정해진 궤도에만 존재할 수 있으며, 특정한 에너지를 가집니다.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-purple-600 mb-2">📊 양자화된 에너지</h4>
                <p>
                  전자의 에너지는 연속적이지 않고 특정 값만 가능합니다. 이를 에너지 준위라 합니다.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-purple-600 mb-2">🌈 선스펙트럼</h4>
                <p>
                  전자가 에너지 준위 간에 전이할 때 특정 파장의 빛을 방출합니다.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-purple-600 mb-2">💫 여기와 이완</h4>
                <p>
                  에너지를 받은 전자는 높은 준위로 이동(여기)했다가 낮은 준위로 돌아옵니다(이완).
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">주요 공식</h3>
            <div className="space-y-4 text-gray-700 font-mono text-sm bg-gray-50 p-4 rounded">
              <div>
                <p className="font-semibold text-purple-600">보어 모형 에너지:</p>
                <p className="text-gray-800">En = -13.6/n² eV</p>
                <p className="text-xs text-gray-600 mt-1">n: 주양자수 (1, 2, 3, ...)</p>
              </div>
              <div className="border-t pt-4">
                <p className="font-semibold text-purple-600">전이 에너지:</p>
                <p className="text-gray-800">ΔE = Ef - Ei = hν</p>
                <p className="text-xs text-gray-600 mt-1">방출 또는 흡수되는 에너지</p>
              </div>
              <div className="border-t pt-4">
                <p className="font-semibold text-purple-600">리드베르그 공식:</p>
                <p className="text-gray-800">1/λ = R(1/n₁² - 1/n₂²)</p>
                <p className="text-xs text-gray-600 mt-1">R: 리드베르그 상수</p>
              </div>
            </div>
          </div>
        </div>

        {/* 보어 모형 시각화 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">보어의 원자 모형</h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* 원자 다이어그램 */}
            <div className="flex items-center justify-center bg-gray-100 rounded-lg p-8">
              <svg viewBox="0 0 300 300" className="w-full h-auto max-w-xs">
                {/* 궤도 */}
                {[1, 2, 3, 4].map((n) => (
                  <circle
                    key={n}
                    cx="150"
                    cy="150"
                    r={50 * n}
                    fill="none"
                    stroke="#ccc"
                    strokeDasharray="5,5"
                    strokeWidth="1"
                  />
                ))}
                
                {/* 원자핵 */}
                <circle cx="150" cy="150" r="12" fill="#ff0000" />
                <text x="150" y="155" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">
                  +
                </text>
                
                {/* 전자 */}
                {[1, 2, 3, 4].map((n) => {
                  const angle = (n * 90) * (Math.PI / 180);
                  const x = 150 + 50 * n * Math.cos(angle);
                  const y = 150 + 50 * n * Math.sin(angle);
                  return (
                    <g key={`electron-${n}`}>
                      <circle cx={x} cy={y} r="6" fill="#0066cc" />
                      <text x={x} y={y + 15} textAnchor="middle" fontSize="10" fill="#666">
                        n={n}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* 에너지 준위 */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">에너지 준위</h4>
              <div className="space-y-3">
                {energyLevels.slice(0, 6).map((level) => (
                  <div key={level.n} className="flex items-center gap-4">
                    <div className="w-16">
                      <span className="font-semibold text-gray-900">{level.label}</span>
                    </div>
                    <div className="flex-1 bg-gray-200 rounded h-8 flex items-center px-3" 
                         style={{ width: `${Math.abs(level.energy) * 10}px` }}>
                      <span className="text-xs font-semibold text-gray-700">
                        {level.energy.toFixed(2)} eV
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-600 mt-4">
                음수 에너지는 전자가 원자에 속박되어 있음을 의미합니다.
              </p>
            </div>
          </div>
        </div>

        {/* 에너지 준위 다이어그램 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">에너지 준위 다이어그램</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={energyDiagramData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="n" label={{ value: '주양자수 (n)', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: '에너지 (eV)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Bar dataKey="energy" fill="#a855f7" name="에너지" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-sm text-gray-600 mt-4">
            n이 증가할수록 에너지가 0에 가까워집니다. n=∞일 때 전자가 원자에서 완전히 떨어집니다.
          </p>
        </div>

        {/* 선스펙트럼 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">수소 원자의 선스펙트럼 (발머 계열)</h3>
          
          <div className="mb-6 p-6 bg-gray-900 rounded-lg">
            <div className="flex justify-between items-end h-32 gap-2">
              {spectrum.map((line, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full rounded-t"
                    style={{
                      backgroundColor: line.color,
                      height: `${line.energy * 30}px`,
                      minHeight: '20px',
                    }}
                  />
                  <p className="text-xs text-gray-300 mt-2 text-center">{line.wavelength} nm</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {spectrum.map((line, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg border-l-4" style={{ borderColor: line.color }}>
                <p className="font-semibold text-gray-900 mb-1">{line.transition}</p>
                <p className="text-sm text-gray-600">
                  파장: <span className="font-mono font-semibold">{line.wavelength} nm</span>
                </p>
                <p className="text-sm text-gray-600">
                  에너지: <span className="font-mono font-semibold">{line.energy.toFixed(2)} eV</span>
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
            <h4 className="font-semibold text-purple-900 mb-2">📊 발머 계열</h4>
            <p className="text-sm text-purple-800">
              n ≥ 3인 준위에서 n=2로의 전이로 발생하는 스펙트럼입니다. 
              가시광선 영역에서 관찰되어 수소 원자의 존재를 확인하는 데 사용됩니다.
            </p>
          </div>
        </div>

        {/* 여기와 이완 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">여기 (Excitation)</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="font-semibold text-blue-900 mb-2">정의</p>
                <p className="text-sm text-blue-800">
                  전자가 에너지를 받아 낮은 에너지 준위에서 높은 에너지 준위로 전이하는 현상
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="font-semibold text-green-900 mb-2">에너지 공급 방법</p>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• 광자 흡수 (광 여기)</li>
                  <li>• 전자 충돌 (충돌 여기)</li>
                  <li>• 열 에너지 (열 여기)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">이완 (Relaxation)</h3>
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 rounded-lg">
                <p className="font-semibold text-orange-900 mb-2">정의</p>
                <p className="text-sm text-orange-800">
                  여기된 전자가 에너지를 방출하며 낮은 에너지 준위로 돌아가는 현상
                </p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <p className="font-semibold text-red-900 mb-2">에너지 방출 방법</p>
                <ul className="text-sm text-red-800 space-y-1">
                  <li>• 광자 방출 (형광, 인광)</li>
                  <li>• 열 에너지 방출</li>
                  <li>• 비복사 전이</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 응용 분야 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">응용 분야</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-semibold text-purple-900 mb-2">💡 형광등과 LED</h4>
              <p className="text-sm text-purple-800">
                전자의 여기와 이완 과정에서 방출되는 빛을 이용합니다.
              </p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
              <h4 className="font-semibold text-indigo-900 mb-2">🔬 분광 분석</h4>
              <p className="text-sm text-indigo-800">
                선스펙트럼으로 물질의 원소를 식별합니다.
              </p>
            </div>
            <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-500">
              <h4 className="font-semibold text-pink-900 mb-2">🎆 레이저</h4>
              <p className="text-sm text-pink-800">
                유도 방출을 통해 코히어런트한 빛을 생성합니다.
              </p>
            </div>
            <div className="p-4 bg-rose-50 rounded-lg border-l-4 border-rose-500">
              <h4 className="font-semibold text-rose-900 mb-2">📺 형광 화면</h4>
              <p className="text-sm text-rose-800">
                전자 빔이 형광체를 여기시켜 이미지를 표시합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
