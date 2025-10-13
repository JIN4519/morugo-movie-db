import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MovieCard } from './components/MovieCard';
import { MovieDetail } from './components/MovieDetail';
import { SearchFilters } from './components/SearchFilters';
import { LoginModal } from './components/LoginModal';
import { Chatbot } from './components/Chatbot';
import { Movie } from './data/movieData';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { Button } from './components/ui/button';
import { Star, TrendingUp, Calendar, Award, Heart, Bookmark, Loader2 } from 'lucide-react';
import * as tmdbService from './services/tmdb';
import { GENRE_MAP } from './services/tmdb';
import './styles/globals.css';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
  favoriteGenres: string[];
  watchedMovies: string[];
  favorites: string[];
  watchlist: string[];
}

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [filters, setFilters] = useState({
    genre: '?꾩껜',
    year: [1990, new Date().getFullYear()],
    rating: [0, 10],
    status: '?꾩껜'
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  // TMDB data states
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);

  // Load movies from TMDB based on active section
  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        let tmdbMovies: tmdbService.TMDBMovie[] = [];
        
        switch (activeSection) {
          case 'latest':
            tmdbMovies = await tmdbService.getNowPlayingMovies();
            break;
          case 'upcoming':
            tmdbMovies = await tmdbService.getUpcomingMovies();
            break;
          case 'popular':
            tmdbMovies = await tmdbService.getPopularMovies();
            break;
          case 'top-rated':
            tmdbMovies = await tmdbService.getTopRatedMovies();
            break;
          case 'home':
            tmdbMovies = await tmdbService.getPopularMovies();
            break;
          case 'search':
            if (searchQuery) {
              tmdbMovies = await tmdbService.searchMovies(searchQuery);
            }
            break;
          default:
            tmdbMovies = await tmdbService.getPopularMovies();
        }
        
        // Convert TMDB movies to our Movie format (limited to first 10 for performance)
        const convertedMovies = await tmdbService.convertTMDBMoviesToMovies(tmdbMovies.slice(0, 20));
        setMovies(convertedMovies);
        
        // Set featured movie
        if (convertedMovies.length > 0 && activeSection === 'home') {
          setFeaturedMovie(convertedMovies[0]);
        }
      } catch (error) {
        console.error('Error loading movies:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (activeSection !== 'favorites' && activeSection !== 'watchlist') {
      loadMovies();
    }
  }, [activeSection, searchQuery]);

  // Filter movies based on filters (client-side filtering)
  const getFilteredMovies = () => {
    let filteredMovies = movies;

    // Apply filters
    if (filters.genre !== '?꾩껜') {
      filteredMovies = filteredMovies.filter(movie =>
        movie.genre.includes(filters.genre)
      );
    }

    if (filters.status !== '?꾩껜') {
      filteredMovies = filteredMovies.filter(movie =>
        movie.status === filters.status
      );
    }

    const [minYear, maxYear] = filters.year;
    filteredMovies = filteredMovies.filter(movie => {
      const movieYear = new Date(movie.releaseDate).getFullYear();
      return movieYear >= minYear && movieYear <= maxYear;
    });

    const [minRating, maxRating] = filters.rating;
    filteredMovies = filteredMovies.filter(movie =>
      movie.rating >= minRating && movie.rating <= maxRating
    );

    return filteredMovies;
  };

  const getMoviesBySection = () => {
    switch (activeSection) {
      case 'favorites':
        return user ? movies.filter(movie => user.favorites.includes(movie.id)) : [];
      case 'watchlist':
        return user ? movies.filter(movie => user.watchlist.includes(movie.id)) : [];
      case 'search':
        return getFilteredMovies();
      default:
        return movies;
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      setActiveSection('search');
    }
  };

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsDetailOpen(true);
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    if (activeSection === 'favorites' || activeSection === 'watchlist') {
      setActiveSection('home');
    }
  };

  const handleToggleFavorite = (movieId: string) => {
    if (!user) return;
    
    const newFavorites = user.favorites.includes(movieId)
      ? user.favorites.filter(id => id !== movieId)
      : [...user.favorites, movieId];
    
    setUser({ ...user, favorites: newFavorites });
  };

  const handleToggleWatchlist = (movieId: string) => {
    if (!user) return;
    
    const newWatchlist = user.watchlist.includes(movieId)
      ? user.watchlist.filter(id => id !== movieId)
      : [...user.watchlist, movieId];
    
    setUser({ ...user, watchlist: newWatchlist });
  };

  const moviesToShow = getMoviesBySection();

      const getSectionTitle = () => {
    switch (activeSection) {
      case 'latest': return 'Latest Movies';
      case 'upcoming': return 'Upcoming';
      case 'popular': return 'Popular Movies';
      case 'top-rated': return 'Top Rated';
      case 'favorites': return 'Favorites';
      case 'watchlist': return 'Watchlist';
      case 'search': return `${searchQuery} search results`;
      default: return 'Recommended';
    }
  };

      const getSectionIcon = () => {
    switch (activeSection) {
      case 'latest': return <Calendar className="w-5 h-5" />;
      case 'upcoming': return <Calendar className="w-5 h-5" />;
      case 'popular': return <TrendingUp className="w-5 h-5" />;
      case 'top-rated': return <Award className="w-5 h-5" />;
      case 'favorites': return <Heart className="w-5 h-5" />;
      case 'watchlist': return <Bookmark className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header */}
      <Header
        onSearch={handleSearch}
        onNavigate={setActiveSection}
        activeSection={activeSection}
        isLoggedIn={!!user}
        onLogin={() => setIsLoginOpen(true)}
        onLogout={handleLogout}
      />

      {/* Hero Section */}
      {activeSection === 'home' && featuredMovie && (
        <section className="relative h-96 md:h-[500px] overflow-hidden">
          <ImageWithFallback
            src={featuredMovie.backdrop}
            alt={featuredMovie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-7xl mx-auto">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  {featuredMovie.title}
                </h1>
                <p className="text-lg text-gray-200 mb-6 line-clamp-3">
                  {featuredMovie.synopsis}
                </p>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-white font-medium">
                      {featuredMovie.rating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-gray-300">·</span>
                  <span className="text-gray-300">
                    {new Date(featuredMovie.releaseDate).getFullYear()}
                  </span>
                  <span className="text-gray-300">·</span>
                  <span className="text-gray-300">
                    {featuredMovie.genre.join(', ')}
                  </span>
                </div>
                <Button 
                  onClick={() => handleMovieSelect(featuredMovie)}
                  size="lg"
                  className="bg-cyan-500 hover:bg-cyan-600"
                >
                  자세히보기
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Section Header */}
        <div className="flex items-center space-x-3 mb-8">
          {getSectionIcon()}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {getSectionTitle()}
          </h2>
          {!loading && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({moviesToShow.length}개)
            </span>
          )}
          {loading && (
            <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
          )}
        </div>

        {/* Search Filters */}
        {activeSection === 'search' && (
          <SearchFilters
            isOpen={isFiltersOpen}
            onToggle={() => setIsFiltersOpen(!isFiltersOpen)}
            filters={filters}
            onFiltersChange={setFilters}
          />
        )}

        {/* User-specific sections info */}
        {(activeSection === 'favorites' || activeSection === 'watchlist') && !user && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                {activeSection === 'favorites' ? 
                  <Heart className="w-8 h-8 text-gray-400" /> : 
                  <Bookmark className="w-8 h-8 text-gray-400" />
                }
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                로그인이 필요합니다
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                이 기능을 보려면 로그인해 주세요.
              </p>
              <Button onClick={() => setIsLoginOpen(true)}>
                로그인
              </Button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-cyan-500 animate-spin mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">영화 데이터를 불러오는 중...</p>
            </div>
          </div>
        )}

        {/* Movies Grid */}
        {!loading && moviesToShow.length > 0 && (user || (activeSection !== 'favorites' && activeSection !== 'watchlist')) ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {moviesToShow.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onSelect={handleMovieSelect}
                onToggleFavorite={handleToggleFavorite}
                onToggleWatchlist={handleToggleWatchlist}
                isFavorite={user?.favorites.includes(movie.id) || false}
                isInWatchlist={user?.watchlist.includes(movie.id) || false}
                isLoggedIn={!!user}
              />
            ))}
          </div>
        ) : !loading && moviesToShow.length === 0 && activeSection === 'search' ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                검색 결과가 없습니다
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                다른 검색어나 필터 조건을 시도해보세요.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setFilters({
                    genre: '전체',
                    year: [1990, new Date().getFullYear()],
                    rating: [0, 10],
                    status: '전체'
                  });
                }}
              >
                검색 초기화              </Button>
            </div>
          </div>
        ) : null}

        {/* Empty favorites/watchlist */}
        {user && (activeSection === 'favorites' || activeSection === 'watchlist') && moviesToShow.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                {activeSection === 'favorites' ? 
                  <Heart className="w-8 h-8 text-gray-400" /> : 
                  <Bookmark className="w-8 h-8 text-gray-400" />
                }
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                목록이 비어 있습니다
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                마음에 드는 영화를 즐겨찾기 또는 시청목록에 추가해보세요.
              </p>
              <Button onClick={() => setActiveSection('home')}>
                영화 둘러보기
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Movie Detail Modal */}
      <MovieDetail
        movie={selectedMovie}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onToggleFavorite={handleToggleFavorite}
        onToggleWatchlist={handleToggleWatchlist}
        isFavorite={user?.favorites.includes(selectedMovie?.id || '') || false}
        isInWatchlist={user?.watchlist.includes(selectedMovie?.id || '') || false}
        isLoggedIn={!!user}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
      />

      {/* Chatbot */}
      <Chatbot movies={movies} />

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                모르고 Movie Database
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                당신이 모르고 있던 모든 영화를 발견하는 곳입니다. 
                최신 영화부터 숨겨진 명작까지, 완전한 영화 데이터베이스를 제공합니다.
              </p>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                 © 2025 모르고. 모든 권리 보유 Copy right Jin
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">서비스</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-cyan-500 dark:hover:text-cyan-400">영화 검색</a></li>
                <li><a href="#" className="hover:text-cyan-500 dark:hover:text-cyan-400">평점 통계</a></li>
                <li><a href="#" className="hover:text-cyan-500 dark:hover:text-cyan-400">개인화 추천</a></li>
                <li><a href="#" className="hover:text-cyan-500 dark:hover:text-cyan-400">리뷰 작성</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">고객지원</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-cyan-500 dark:hover:text-cyan-400">FAQ</a></li>
                <li><a href="#" className="hover:text-cyan-500 dark:hover:text-cyan-400">문의하기</a></li>
                <li><a href="#" className="hover:text-cyan-500 dark:hover:text-cyan-400">개인정보처리방침</a></li>
                <li><a href="#" className="hover:text-cyan-500 dark:hover:text-cyan-400">이용약관</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}














