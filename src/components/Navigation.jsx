import React from 'react';
import { X, Home, Waves, Focus, Zap, Atom, Grid3x3, Rocket } from 'lucide-react';

export default function Navigation({ currentPage, setCurrentPage, sidebarOpen, setSidebarOpen }) {
  const menuItems = [
    { id: 'home', label: '홈', icon: Home },
    { id: 'wave', label: '빛의 파동성', icon: Waves },
    { id: 'lens', label: '굴절과 렌즈', icon: Focus },
    { id: 'dual', label: '이중성', icon: Zap },
    { id: 'atom', label: '원자 구조', icon: Atom },
    { id: 'band', label: '에너지띠', icon: Grid3x3 },
    { id: 'relativity', label: '상대성 이론', icon: Rocket },
  ];

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* 모바일 오버레이 */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 사이드바 */}
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed lg:static inset-y-0 left-0 w-64 bg-gradient-to-b from-blue-600 to-blue-700 text-white shadow-lg transition-transform duration-300 z-40 flex flex-col`}
      >
        <div className="p-6 border-b border-blue-500">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">물리학</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 hover:bg-blue-500 rounded transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <p className="text-blue-100 text-sm mt-2">빛과 물질</p>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-white text-blue-600 font-semibold shadow-md'
                        : 'text-blue-100 hover:bg-blue-500'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-blue-500">
          <div className="bg-blue-500 rounded-lg p-4 text-center">
            <p className="text-sm text-blue-100 mb-2">
              인터랙티브 시뮬레이션으로 물리 개념을 직관적으로 학습하세요!
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
