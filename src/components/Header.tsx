import React, { useState } from 'react';
import { Search, User, Menu, X, Heart, Bookmark } from 'lucide-react';
import { NewMorugoLogo } from './NewMorugoLogo';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface HeaderProps {
  onSearch: (query: string) => void;
  onNavigate: (section: string) => void;
  activeSection: string;
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

export function Header({ onSearch, onNavigate, activeSection, isLoggedIn, onLogin, onLogout }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      onNavigate('search');
    }
  };

  const navItems = [
    { id: 'home', label: '홈' },
    { id: 'latest', label: '최신영화' },
    { id: 'upcoming', label: '개봉예정' },
    { id: 'popular', label: '인기영화' },
    { id: 'top-rated', label: '평점상위' },
  ];

  return (
    <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-gray-200 dark:border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div
            className="flex-shrink-0 cursor-pointer"
            role="button"
            tabIndex={0}
            onClick={() => onNavigate('home')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onNavigate('home');
              }
            }}
            aria-label="홈으로 이동"
          >
            <NewMorugoLogo size={40} />
          </div>

          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onNavigate(item.id);
                  }
                }}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20'
                    : 'text-gray-700 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400'
                }`}
                role="button"
                tabIndex={0}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <form onSubmit={handleSearch} className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="영화를 검색해보세요..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </form>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate('favorites')}
                  className="hidden md:flex items-center space-x-2"
                >
                  <Heart className="w-4 h-4" />
                  <span>즐겨찾기</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate('watchlist')}
                  className="hidden md:flex items-center space-x-2"
                >
                  <Bookmark className="w-4 h-4" />
                  <span>시청목록</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogout}
                  className="hidden md:flex items-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span>로그아웃</span>
                </Button>
              </>
            ) : (
              <Button onClick={onLogin} size="sm" className="hidden md:inline-flex">로그인</Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="영화를 검색해보세요..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </form>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors ${
                  activeSection === item.id
                    ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20'
                    : 'text-gray-700 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="border-t border-gray-200 dark:border-slate-700 pt-4 mt-4">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => {
                      onNavigate('favorites');
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 w-full"
                  >
                    <Heart className="w-4 h-4" />
                    <span>즐겨찾기</span>
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('watchlist');
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 w-full"
                  >
                    <Bookmark className="w-4 h-4" />
                    <span>시청목록</span>
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 w-full"
                  >
                    <User className="w-4 h-4" />
                    <span>로그아웃</span>
                  </button>
                </>
              ) : (
                <Button onClick={() => { onLogin(); setIsMobileMenuOpen(false); }} className="w-full">
                  로그인
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
