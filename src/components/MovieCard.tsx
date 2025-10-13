import React from 'react';
import { Star, Heart, Bookmark, Play, Calendar, Clock } from 'lucide-react';
import { Movie } from '../data/movieData';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
  onToggleFavorite?: (movieId: string) => void;
  onToggleWatchlist?: (movieId: string) => void;
  isFavorite?: boolean;
  isInWatchlist?: boolean;
  isLoggedIn: boolean;
}

export function MovieCard({
  movie,
  onSelect,
  onToggleFavorite,
  onToggleWatchlist,
  isFavorite = false,
  isInWatchlist = false,
  isLoggedIn,
}: MovieCardProps) {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}시간 ${mins}분`;
  };

  return (
    <div className="group relative bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Movie Poster */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <ImageWithFallback
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Overlay on hover (desktop only) */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center">
          <Button onClick={() => onSelect(movie)} className="bg-white/90 text-black hover:bg-white">
            <Play className="w-4 h-4 mr-2" />
            자세히보기
          </Button>
        </div>

        {/* Status Badge */}
        {movie.status === 'upcoming' && (
          <Badge className="absolute top-3 left-3 bg-orange-500 hover:bg-orange-600">개봉예정</Badge>
        )}
        {movie.status === 'in_theaters' && (
          <Badge className="absolute top-3 left-3 bg-green-500 hover:bg-green-600">상영중</Badge>
        )}
        {movie.isPopular && (
          <Badge className="absolute top-3 right-3 bg-red-500 hover:bg-red-600">인기</Badge>
        )}

        {/* Action Buttons (desktop only) */}
        {isLoggedIn && (
          <div className="absolute bottom-3 right-3 hidden md:flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="sm"
              variant={isFavorite ? 'default' : 'secondary'}
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite?.(movie.id);
              }}
              className="w-8 h-8 p-0"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
            <Button
              size="sm"
              variant={isInWatchlist ? 'default' : 'secondary'}
              onClick={(e) => {
                e.stopPropagation();
                onToggleWatchlist?.(movie.id);
              }}
              className="w-8 h-8 p-0"
            >
              <Bookmark className={`w-4 h-4 ${isInWatchlist ? 'fill-current' : ''}`} />
            </Button>
          </div>
        )}
      </div>

      {/* Mobile compact info */}
      <div className="p-3 md:hidden">
        <h3 className="font-medium text-base text-gray-900 dark:text-white mb-1 line-clamp-2">{movie.title}</h3>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-gray-900 dark:text-white font-medium">{movie.rating > 0 ? movie.rating.toFixed(1) : '-'}</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(movie.releaseDate)}</span>
          </div>
        </div>
      </div>

      {/* Movie Info (desktop) */}
      <div className="p-4 hidden md:block">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2">{movie.title}</h3>
        {movie.originalTitle && movie.originalTitle !== movie.title && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{movie.originalTitle}</p>
        )}
        <div className="flex flex-wrap gap-1 mb-3">
          {movie.genre.slice(0, 3).map((genre) => (
            <Badge key={genre} variant="outline" className="text-xs">
              {genre}
            </Badge>
          ))}
          {movie.genre.length > 3 && <Badge variant="outline" className="text-xs">+{movie.genre.length - 3}</Badge>}
        </div>
        {movie.rating > 0 ? (
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="font-medium text-gray-900 dark:text-white">{movie.rating.toFixed(1)}</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">{movie.reviewCount.toLocaleString()}개 리뷰</span>
          </div>
        ) : (
          <div className="mb-3">
            <span className="text-sm text-gray-500 dark:text-gray-400">평점 집계중</span>
          </div>
        )}
        <div className="space-y-1 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(movie.releaseDate)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{formatRuntime(movie.runtime)}</span>
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">감독: {movie.director}</div>
      </div>
    </div>
  );
}

