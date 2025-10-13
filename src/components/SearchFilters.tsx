import React from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { movieGenres } from '../data/movieData';

interface SearchFiltersProps {
  isOpen: boolean;
  onToggle: () => void;
  filters: {
    genre: string;
    year: number[];
    rating: number[];
    status: string;
  };
  onFiltersChange: (filters: any) => void;
}

export function SearchFilters({ isOpen, onToggle, filters, onFiltersChange }: SearchFiltersProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  const handleFilterChange = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const resetFilters = () => {
    onFiltersChange({
      genre: '전체',
      year: [1990, currentYear],
      rating: [0, 10],
      status: '전체'
    });
  };

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        variant="outline"
        className="mb-6"
      >
        <Filter className="w-4 h-4 mr-2" />
        필터
      </Button>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-600 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">검색 필터</h3>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            초기화
          </Button>
          <Button variant="ghost" size="sm" onClick={onToggle}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Genre Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            장르
          </label>
          <Select
            value={filters.genre}
            onValueChange={(value) => handleFilterChange('genre', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="장르 선택" />
            </SelectTrigger>
            <SelectContent>
              {movieGenres.map((genre) => (
                <SelectItem key={genre} value={genre}>
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Year Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            개봉년도: {filters.year[0]} - {filters.year[1]}
          </label>
          <Slider
            value={filters.year}
            onValueChange={(value) => handleFilterChange('year', value)}
            min={1990}
            max={currentYear}
            step={1}
            className="w-full"
          />
        </div>

        {/* Rating Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            평점: {filters.rating[0]} - {filters.rating[1]}점
          </label>
          <Slider
            value={filters.rating}
            onValueChange={(value) => handleFilterChange('rating', value)}
            min={0}
            max={10}
            step={0.1}
            className="w-full"
          />
        </div>

        {/* Status Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            상태
          </label>
          <Select
            value={filters.status}
            onValueChange={(value) => handleFilterChange('status', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="상태 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="전체">전체</SelectItem>
              <SelectItem value="released">개봉 완료</SelectItem>
              <SelectItem value="upcoming">상영예정</SelectItem>
              <SelectItem value="in_theaters">상영중</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filters Display */}
      <div className="mt-4 flex flex-wrap gap-2">
        {filters.genre !== '전체' && (
          <div className="flex items-center space-x-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200 px-2 py-1 rounded text-sm">
            <span>장르: {filters.genre}</span>
            <button
              onClick={() => handleFilterChange('genre', '전체')}
              className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-200"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
        
        {(filters.year[0] !== 1990 || filters.year[1] !== currentYear) && (
          <div className="flex items-center space-x-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200 px-2 py-1 rounded text-sm">
            <span>년도: {filters.year[0]}-{filters.year[1]}</span>
            <button
              onClick={() => handleFilterChange('year', [1990, currentYear])}
              className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-200"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
        
        {(filters.rating[0] !== 0 || filters.rating[1] !== 10) && (
          <div className="flex items-center space-x-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200 px-2 py-1 rounded text-sm">
            <span>평점: {filters.rating[0]}-{filters.rating[1]}</span>
            <button
              onClick={() => handleFilterChange('rating', [0, 10])}
              className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-200"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
        
        {filters.status !== '전체' && (
          <div className="flex items-center space-x-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200 px-2 py-1 rounded text-sm">
            <span>상태: {filters.status === 'released' ? '개봉완료' : filters.status === 'upcoming' ? '상영예정' : '상영중'}</span>
            <button
              onClick={() => handleFilterChange('status', '전체')}
              className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-200"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}