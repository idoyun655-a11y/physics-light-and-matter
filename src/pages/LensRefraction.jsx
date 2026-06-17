import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function LensRefraction() {
  const [objectDistance, setObjectDistance] = useState(30);
  const [focalLength, setFocalLength] = useState(10);
  const [refractiveIndex, setRefractiveIndex] = useState(1.5);

  // 렌즈 공식: 1/f = 1/o + 1/i
  const imageDistance = (focalLength * objectDistance) / (objectDistance - focalLength);
  const magnification = -imageDistance / objectDistance;
  const isRealImage = imageDistance > 0;

  // 굴절률에 따른 굴절각 데이터
  const generateRefractionData = () => {
    const data = [];
    for (let incidentAngle = 0; incidentAngle <= 80; incidentAngle += 10) {
      const incidentRad = (incidentAngle * Math.PI) / 180;
      const refractedRad = Math.asin(Math.sin(incidentRad) / refractiveIndex);
      const refractedAngle = (refractedRad * 180) / Math.PI;
      
      data.push({
        incidentAngle,
        refractedAngle: Math.min(refractedAngle, 90),
      });
    }
    return data;
  };

  const refractionData = generateRefractionData();

  // 렌즈 종류별 특성
  const lensTypes = [
    {
      name: '볼록렌즈 (수렴렌즈)',
      description: '중앙이 두꺼운 렌즈로 빛을 한 점으로 모읍니다.',
      properties: ['초점거리: 양수', '실상 또는 허상 형성', '돋보기로 사용'],
      icon: '🔍',
    },
    {
      name: '오목렌즈 (발산렌즈)',
      description: '중앙이 얇은 렌즈로 빛을 퍼뜨립니다.',
      properties: ['초점거리: 음수', '항상 허상 형성', '근시 안경에 사용'],
      icon: '📐',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* 제목 */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">굴절과 렌즈</h1>
          <p className="text-lg text-gray-600">
            빛의 굴절 현상과 렌즈에서의 상 맺힘을 학습합니다.
          </p>
        </div>

        {/* 개념 설명 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">개념 설명</h3>
            <div className="space-y-4 text-gray-700">
              <div>
                <h4 className="font-semibold text-green-600 mb-2">🔄 굴절 (Refraction)</h4>
                <p>
                  빛이 서로 다른 매질의 경계를 지날 때 진행 방향이 바뀌는 현상입니다.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-green-600 mb-2">📏 스넬의 법칙</h4>
                <p>
                  n₁sin(θ₁) = n₂sin(θ₂) - 입사각과 굴절각의 관계를 나타냅니다.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-green-600 mb-2">🔍 렌즈 (Lens)</h4>
                <p>
                  굴곡진 표면을 가진 투명한 물질로 빛을 굴절시켜 상을 형성합니다.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-green-600 mb-2">🎯 광선 추적 (Ray Tracing)</h4>
                <p>
                  렌즈를 통과하는 광선의 경로를 그려 상의 위치와 크기를 결정합니다.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">주요 공식</h3>
            <div className="space-y-4 text-gray-700 font-mono text-sm bg-gray-50 p-4 rounded">
              <div>
                <p className="font-semibold text-green-600">스넬의 법칙:</p>
                <p className="text-gray-800">n₁sin(θ₁) = n₂sin(θ₂)</p>
                <p className="text-xs text-gray-600 mt-1">n: 굴절률, θ: 각도</p>
              </div>
              <div className="border-t pt-4">
                <p className="font-semibold text-green-600">렌즈 공식:</p>
                <p className="text-gray-800">1/f = 1/o + 1/i</p>
                <p className="text-xs text-gray-600 mt-1">f: 초점거리, o: 물체거리, i: 상거리</p>
              </div>
              <div className="border-t pt-4">
                <p className="font-semibold text-green-600">배율:</p>
                <p className="text-gray-800">m = -i/o = h'/h</p>
                <p className="text-xs text-gray-600 mt-1">h: 물체 높이, h': 상의 높이</p>
              </div>
            </div>
          </div>
        </div>

        {/* 렌즈 종류 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {lensTypes.map((lens, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md p-6">
              <div className="text-4xl mb-3">{lens.icon}</div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">{lens.name}</h4>
              <p className="text-gray-600 mb-4">{lens.description}</p>
              <ul className="space-y-2">
                {lens.properties.map((prop, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    {prop}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 렌즈 시뮬레이션 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">렌즈 시뮬레이션</h3>
          
          {/* 컨트롤 */}
          <div className="grid md:grid-cols-3 gap-6 mb-8 bg-gray-50 p-6 rounded-lg">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                물체 거리: {objectDistance.toFixed(1)} cm
              </label>
              <input
                type="range"
                min="5"
                max="50"
                step="1"
                value={objectDistance}
                onChange={(e) => setObjectDistance(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                초점거리: {focalLength.toFixed(1)} cm
              </label>
              <input
                type="range"
                min="5"
                max="20"
                step="1"
                value={focalLength}
                onChange={(e) => setFocalLength(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                굴절률: {refractiveIndex.toFixed(2)}
              </label>
              <input
                type="range"
                min="1.3"
                max="2"
                step="0.1"
                value={refractiveIndex}
                onChange={(e) => setRefractiveIndex(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          {/* 결과 표시 */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <p className="text-sm text-gray-600 mb-1">상의 거리</p>
              <p className="text-2xl font-bold text-blue-600">
                {Math.abs(imageDistance).toFixed(1)} cm
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {isRealImage ? '실상' : '허상'}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
              <p className="text-sm text-gray-600 mb-1">배율</p>
              <p className="text-2xl font-bold text-green-600">
                {magnification.toFixed(2)}×
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {Math.abs(magnification) > 1 ? '확대' : '축소'}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
              <p className="text-sm text-gray-600 mb-1">상의 성질</p>
              <p className="text-sm font-semibold text-purple-600">
                {isRealImage ? '실상, 역상' : '허상, 정상'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {isRealImage ? '스크린에 맺힘' : '스크린에 맺히지 않음'}
              </p>
            </div>
          </div>

          {/* 광선 추적 다이어그램 */}
          <div className="bg-gray-100 rounded-lg p-6 mb-4 h-64 flex items-center justify-center">
            <svg viewBox="0 0 400 200" className="w-full h-full">
              {/* 광축 */}
              <line x1="20" y1="100" x2="380" y2="100" stroke="#999" strokeDasharray="5,5" strokeWidth="1" />
              
              {/* 렌즈 */}
              <circle cx="200" cy="100" r="50" fill="none" stroke="#0066cc" strokeWidth="2" />
              <line x1="200" y1="50" x2="200" y2="150" stroke="#0066cc" strokeWidth="2" />
              
              {/* 초점 */}
              <circle cx={200 + focalLength * 5} cy="100" r="3" fill="#ff6600" />
              <circle cx={200 - focalLength * 5} cy="100" r="3" fill="#ff6600" />
              
              {/* 물체 */}
              <line x1={200 - objectDistance * 5} y1="100" x2={200 - objectDistance * 5} y2="60" stroke="#00cc99" strokeWidth="3" />
              <circle cx={200 - objectDistance * 5} cy="100" r="3" fill="#00cc99" />
              
              {/* 상 */}
              {imageDistance > 0 && (
                <>
                  <line x1={200 + imageDistance * 5} y1="100" x2={200 + imageDistance * 5} y2={100 + magnification * 40} stroke="#ff6600" strokeWidth="3" />
                  <circle cx={200 + imageDistance * 5} cy={100 + magnification * 40} r="3" fill="#ff6600" />
                </>
              )}
              
              {/* 텍스트 */}
              <text x="20" y="20" fontSize="12" fill="#666">초점거리: {focalLength} cm</text>
              <text x="20" y="180" fontSize="12" fill="#666">물체거리: {objectDistance} cm</text>
            </svg>
          </div>
          <p className="text-sm text-gray-600">
            파란색 원: 렌즈 | 주황색 점: 초점 | 초록색 선: 물체 | 주황색 선: 상
          </p>
        </div>

        {/* 굴절 시뮬레이션 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">스넬의 법칙 - 굴절각 변화</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={refractionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="incidentAngle" label={{ value: '입사각 (도)', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: '굴절각 (도)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="incidentAngle" stroke="#3b82f6" name="입사각" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="refractedAngle" stroke="#10b981" name="굴절각" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-sm text-gray-600 mt-4">
            굴절률이 높을수록 굴절각이 작아집니다. 입사각이 증가하면 굴절각도 증가하지만, 항상 입사각보다 작습니다.
          </p>
        </div>

        {/* 응용 분야 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">응용 분야</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <h4 className="font-semibold text-green-900 mb-2">👁️ 안경과 콘택트렌즈</h4>
              <p className="text-sm text-green-800">
                굴절 이상을 교정하기 위해 렌즈를 사용합니다.
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-900 mb-2">📷 카메라와 현미경</h4>
              <p className="text-sm text-blue-800">
                렌즈를 조합하여 상을 형성하고 확대합니다.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-semibold text-purple-900 mb-2">🔬 포토리소그래피</h4>
              <p className="text-sm text-purple-800">
                반도체 제작에서 정밀한 회로 기판을 인쇄합니다.
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
              <h4 className="font-semibold text-orange-900 mb-2">🌈 광학 시스템</h4>
              <p className="text-sm text-orange-800">
                망원경, 현미경, 프로젝터 등에 사용됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
