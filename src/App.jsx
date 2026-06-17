import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import WaveInterference from './pages/WaveInterference';
import LensRefraction from './pages/LensRefraction';
import DualNature from './pages/DualNature';
import AtomicStructure from './pages/AtomicStructure';
import EnergyBand from './pages/EnergyBand';
import Relativity from './pages/Relativity';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const pages = {
    home: { component: Home, title: '홈' },
    wave: { component: WaveInterference, title: '빛의 파동성' },
    lens: { component: LensRefraction, title: '굴절과 렌즈' },
    dual: { component: DualNature, title: '빛과 물질의 이중성' },
    atom: { component: AtomicStructure, title: '원자 구조와 에너지 준위' },
    band: { component: EnergyBand, title: '에너지띠와 반도체' },
    relativity: { component: Relativity, title: '특수 상대성 이론' },
  };

  const CurrentComponent = pages[currentPage]?.component || Home;

  return (
    <div className="flex h-screen bg-gray-50">
      <Navigation 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title={pages[currentPage]?.title || '2022 개정 물리학: 빛과 물질'}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        
        <main className="flex-1 overflow-y-auto">
          <CurrentComponent />
        </main>
      </div>
    </div>
  );
}

export default App;
