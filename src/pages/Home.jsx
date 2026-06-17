import React from 'react';
import { Waves, Focus, Zap, Atom, Grid3x3, Rocket, BookOpen } from 'lucide-react';

export default function Home() {
  const topics = [
    {
      id: 'wave',
      title: '빛의 파동성',
      description: '중첩과 간섭을 통해 빛의 파동성을 이해합니다.',
      icon: Waves,
      color: 'from-blue-400 to-blue-600',
      concepts: ['중첩', '간섭', '영의 이중슬릿 실험']
    },
    {
      id: 'lens',
      title: '굴절과 렌즈',
      description: '빛의 굴절과 볼록렌즈에서의 상 맺힘을 학습합니다.',
      icon: Focus,
      color: 'from-green-400 to-green-600',
      concepts: ['굴절', '렌즈', '광선 추적']
    },
    {
      id: 'dual',
      title: '빛과 물질의 이중성',
      description: '광전 효과와 물질파를 통해 이중성을 이해합니다.',
      icon: Zap,
      color: 'from-orange-400 to-orange-600',
      concepts: ['광전 효과', '물질파', '전자 현미경']
    },
    {
      id: 'atom',
      title: '원자 구조와 에너지 준위',
      description: '보어의 원자 모형과 양자화된 에너지를 학습합니다.',
      icon: Atom,
      color: 'from-purple-400 to-purple-600',
      concepts: ['보어 모형', '에너지 준위', '선스펙트럼']
    },
    {
      id: 'band',
      title: '에너지띠와 반도체',
      description: '고체의 에너지띠 구조와 반도체 소자를 이해합니다.',
      icon: Grid3x3,
      color: 'from-pink-400 to-pink-600',
      concepts: ['에너지띠', '도체', '반도체', '다이오드']
    },
    {
      id: 'relativity',
      title: '특수 상대성 이론',
      description: '광속 불변과 시간 팽창, 길이 수축을 학습합니다.',
      icon: Rocket,
      color: 'from-red-400 to-red-600',
      concepts: ['광속 불변', '시간 팽창', '길이 수축']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* 히어로 섹션 */}
      <section className="px-6 py-12 md:py-20 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <BookOpen size={32} className="text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            2022 개정 물리학
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-600 mb-4">
            빛과 물질
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            인터랙티브 시뮬레이션과 시각화를 통해 복잡한 물리 개념을 직관적으로 이해해보세요.
            각 단원에서는 실험, 그래프, 도표를 활용하여 개념을 설명합니다.
          </p>
        </div>

        {/* 학습 목표 */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">학습 목표</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <span className="text-xl font-bold">1</span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">빛의 파동성 이해</h4>
                <p className="text-gray-600">중첩과 간섭 현상을 통해 빛의 파동 특성을 이해합니다.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                  <span className="text-xl font-bold">2</span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">렌즈와 굴절</h4>
                <p className="text-gray-600">광선 추적을 통해 렌즈에서의 상 맺힘을 분석합니다.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                  <span className="text-xl font-bold">3</span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">이중성 개념</h4>
                <p className="text-gray-600">광전 효과와 물질파를 통해 빛과 물질의 이중성을 학습합니다.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                  <span className="text-xl font-bold">4</span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">원자와 반도체</h4>
                <p className="text-gray-600">원자 구조와 에너지띠를 통해 현대 기술을 이해합니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 토픽 카드 */}
      <section className="px-6 pb-12 max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold text-gray-900 mb-8">학습 주제</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => {
            const Icon = topic.icon;
            return (
              <div
                key={topic.id}
                className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden cursor-pointer"
              >
                <div className={`h-32 bg-gradient-to-r ${topic.color} flex items-center justify-center`}>
                  <Icon size={48} className="text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{topic.title}</h4>
                  <p className="text-gray-600 text-sm mb-4">{topic.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {topic.concepts.map((concept, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 푸터 */}
      <section className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            이 사이트는 2022 개정 교육과정 물리학 학습을 위한 인터랙티브 교육 도구입니다.
          </p>
          <p className="text-gray-500 text-sm mt-4">
            각 단원의 개념을 직관적으로 이해하기 위해 시뮬레이션, 그래프, 도표를 활용합니다.
          </p>
        </div>
      </section>
    </div>
  );
}
