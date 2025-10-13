import React, { useState, useEffect } from 'react';
import { X, Star, Heart, Bookmark, Share2, Play, Calendar, Clock, DollarSign, Users, Film } from 'lucide-react';
import { Movie, Review, mockReviews } from '../data/movieData';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import * as tmdbService from '../services/tmdb';

interface MovieDetailProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleFavorite?: (movieId: string) => void;
  onToggleWatchlist?: (movieId: string) => void;
  isFavorite?: boolean;
  isInWatchlist?: boolean;
  isLoggedIn: boolean;
}

export function MovieDetail({ 
  movie, 
  isOpen, 
  onClose, 
  onToggleFavorite, 
  onToggleWatchlist, 
  isFavorite = false, 
  isInWatchlist = false,
  isLoggedIn 
}: MovieDetailProps) {
  const [userReview, setUserReview] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loadingTrailer, setLoadingTrailer] = useState(false);

  // Load trailer when movie changes
  useEffect(() => {
    const loadTrailer = async () => {
      if (movie && isOpen) {
        setLoadingTrailer(true);
        try {
          const videos = await tmdbService.getMovieVideos(parseInt(movie.id));
          const trailer = videos?.results.find(
            video => video.type === 'Trailer' && video.site === 'YouTube' && video.official
          ) || videos?.results.find(
            video => video.type === 'Trailer' && video.site === 'YouTube'
          );
          
          setTrailerKey(trailer?.key || null);
        } catch (error) {
          console.error('Error loading trailer:', error);
          setTrailerKey(null);
        } finally {
          setLoadingTrailer(false);
        }
      }
    };

    loadTrailer();
  }, [movie, isOpen]);

  if (!movie) return null;

  const movieReviews = reviews.filter(review => review.movieId === movie.id);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}시간 ${mins}분`;
  };

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleSubmitReview = () => {
    if (!userReview.trim() || userRating === 0) return;

    const newReview: Review = {
      id: `review_${Date.now()}`,
      movieId: movie.id,
      userId: 'current_user',
      userName: '나',
      rating: userRating,
      content: userReview,
      createdAt: new Date().toISOString(),
      likes: 0
    };

    setReviews([newReview, ...reviews]);
    setUserReview('');
    setUserRating(0);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: movie.title,
        text: movie.synopsis,
        url: window.location.href
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('링크가 클립보드에 복사되었습니다!');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] lg:max-w-[1400px] max-h-[95vh] overflow-y-auto p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>{movie.title} 상세정보</DialogTitle>
          <DialogDescription>
            {movie.title}의 상세 정보, 줄거리, 출연진, 평점 및 리뷰를 확인할 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        
        {/* Hero Section with Backdrop */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <ImageWithFallback
            src={movie.backdrop}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {movie.title}
            </h1>
            {movie.originalTitle && movie.originalTitle !== movie.title && (
              <p className="text-lg text-gray-200 mb-3">
                {movie.originalTitle}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-3">
              {movie.rating > 0 ? (
                <div className="flex items-center space-x-1 bg-black/50 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-white font-semibold">
                    {movie.rating.toFixed(1)}
                  </span>
                </div>
              ) : null}
              <div className="flex flex-wrap gap-2">
                {movie.genre.map((genre) => (
                  <Badge key={genre} variant="secondary" className="bg-white/20 text-white border-0">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sidebar - Poster and Actions */}
            <div className="lg:col-span-1">
              <div className="aspect-[3/4] rounded-lg overflow-hidden mb-4">
                <ImageWithFallback
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Action Buttons */}
              {isLoggedIn && (
                <div className="space-y-2">
                  <Button
                    onClick={() => onToggleFavorite?.(movie.id)}
                    variant={isFavorite ? "default" : "outline"}
                    className="w-full"
                  >
                    <Heart className={`w-4 h-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                    {isFavorite ? '즐겨찾기 해제' : '즐겨찾기'}
                  </Button>
                  <Button
                    onClick={() => onToggleWatchlist?.(movie.id)}
                    variant={isInWatchlist ? "default" : "outline"}
                    className="w-full"
                  >
                    <Bookmark className={`w-4 h-4 mr-2 ${isInWatchlist ? 'fill-current' : ''}`} />
                    {isInWatchlist ? '목록에서 제거' : '시청목록 추가'}
                  </Button>
                </div>
              )}
              
              <Button onClick={handleShare} variant="outline" className="w-full mt-2">
                <Share2 className="w-4 h-4 mr-2" />
                공유하기
              </Button>

              {/* Movie Info */}
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">개봉일</p>
                    <p className="text-gray-900 dark:text-white">
                      {formatDate(movie.releaseDate)}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Clock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">상영시간</p>
                    <p className="text-gray-900 dark:text-white">
                      {formatRuntime(movie.runtime)}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Users className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">감독</p>
                    <p className="text-gray-900 dark:text-white">
                      {movie.director}
                    </p>
                  </div>
                </div>
                {movie.budget && (
                  <div className="flex items-start space-x-2">
                    <DollarSign className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">제작비</p>
                      <p className="text-gray-900 dark:text-white">
                        {formatMoney(movie.budget)}
                      </p>
                    </div>
                  </div>
                )}
                {movie.boxOffice && (
                  <div className="flex items-start space-x-2">
                    <DollarSign className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">전세계 수익</p>
                      <p className="text-gray-900 dark:text-white">
                        {formatMoney(movie.boxOffice)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tabs for different sections */}
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">개요</TabsTrigger>
                  <TabsTrigger value="trailer">예고편</TabsTrigger>
                  <TabsTrigger value="reviews">리뷰 ({movieReviews.length})</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6 mt-6">
                  {/* Synopsis */}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <Film className="w-4 h-4 mr-2" />
                      줄거리
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {movie.synopsis}
                    </p>
                  </div>

                  {/* Cast */}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">주요 출연진</h3>
                    <div className="flex flex-wrap gap-2">
                      {movie.cast.map((actor) => (
                        <Badge key={actor} variant="outline">
                          {actor}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  {movie.rating > 0 && (
                    <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">통계</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">평균 평점</p>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-lg font-semibold text-gray-900 dark:text-white">
                              {movie.rating.toFixed(1)}/10
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">리뷰 수</p>
                          <p className="text-lg font-semibold text-gray-900 dark:text-white">
                            {movie.reviewCount.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>

                {/* Trailer Tab */}
                <TabsContent value="trailer" className="mt-6">
                  {loadingTrailer ? (
                    <div className="flex items-center justify-center h-64 bg-gray-100 dark:bg-slate-800 rounded-lg">
                      <p className="text-gray-500 dark:text-gray-400">예고편을 불러오는 중...</p>
                    </div>
                  ) : trailerKey ? (
                    <div className="aspect-video rounded-lg overflow-hidden bg-black">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${trailerKey}?rel=0`}
                        title={`${movie.title} 예고편`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-64 bg-gray-100 dark:bg-slate-800 rounded-lg">
                      <Play className="w-12 h-12 text-gray-400 mb-3" />
                      <p className="text-gray-500 dark:text-gray-400">
                        예고편을 찾을 수 없습니다
                      </p>
                    </div>
                  )}
                </TabsContent>

                {/* Reviews Tab */}
                <TabsContent value="reviews" className="mt-6">

            {/* Review Section */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">리뷰</h3>
              
              {/* Write Review */}
              {isLoggedIn && movie.status === 'released' && (
                <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">리뷰 작성</h4>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-sm text-gray-600 dark:text-gray-300">평점:</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => setUserRating(rating * 2)}
                          className="p-1"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              rating * 2 <= userRating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {userRating}/10
                    </span>
                  </div>

                  <Textarea
                    placeholder="이 영화에 대한 생각을 들려주세요..."
                    value={userReview}
                    onChange={(e) => setUserReview(e.target.value)}
                    className="mb-3"
                  />
                  
                  <Button 
                    onClick={handleSubmitReview}
                    disabled={!userReview.trim() || userRating === 0}
                  >
                    리뷰 등록
                  </Button>
                </div>
              )}

              {/* Reviews List */}
              <div className="space-y-4">
                {movieReviews.length > 0 ? (
                  movieReviews.map((review) => (
                    <div key={review.id} className="border border-gray-200 dark:border-slate-600 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900 dark:text-white">
                              {review.userName}
                            </span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-600 dark:text-gray-300">
                                {review.rating}/10
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(review.createdAt).toLocaleDateString('ko-KR')}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">
                        {review.content}
                      </p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <button className="flex items-center space-x-1 hover:text-red-500">
                          <Heart className="w-4 h-4" />
                          <span>{review.likes}</span>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Star className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-gray-400">
                      아직 작성된 리뷰가 없습니다.
                    </p>
                    {isLoggedIn && movie.status === 'released' && (
                      <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                        첫 리뷰를 작성해보세요!
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}