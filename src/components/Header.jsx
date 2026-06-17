import React from 'react';
import { Menu, Lightbulb } from 'lucide-react';

export default function Header({ title, sidebarOpen, setSidebarOpen }) {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu size={24} className="text-gray-700" />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Lightbulb size={24} className="text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              <p className="text-sm text-gray-500">2022 개정 교육과정 물리학</p>
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
          <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
            인터랙티브 학습
          </span>
        </div>
      </div>
    </header>
  );
}
