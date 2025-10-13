// TMDB API Service
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
const TMDB_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MmRjOTg4Yzk5MDg4Mjg4NmYzNmJkYTQ0OTM5MjFjNyIsIm5iZiI6MTc1NzY0MTAyMC4zMTUsInN1YiI6IjY4YzM3OTNjMWYwYTQxZmRlYzJkMmU0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pmswStpBsWQz__OLBRZxD_T0lGNofuzCepxaUZixVXk';

const headers = {
  Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
  'Content-Type': 'application/json',
};

export interface TMDBMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  genre_ids: number[];
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  video: boolean;
  original_language: string;
}

export interface TMDBMovieDetail extends TMDBMovie {
  runtime: number | null;
  genres: { id: number; name: string }[];
  budget: number;
  revenue: number;
  status: string;
  tagline: string;
  production_companies: { id: number; name: string; logo_path: string | null }[];
  production_countries: { iso_3166_1: string; name: string }[];
  spoken_languages: { iso_639_1: string; name: string }[];
}

export interface TMDBCredits {
  cast: {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
    order: number;
  }[];
  crew: {
    id: number;
    name: string;
    job: string;
    department: string;
    profile_path: string | null;
  }[];
}

export interface TMDBVideos {
  results: {
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
    official: boolean;
  }[];
}

// Genre mapping (ko-KR)
export const GENRE_MAP: Record<number, string> = {
  28: '액션',
  12: '모험',
  16: '애니메이션',
  35: '코미디',
  80: '범죄',
  99: '다큐멘터리',
  18: '드라마',
  10751: '가족',
  14: '판타지',
  36: '역사',
  27: '공포',
  10402: '음악',
  9648: '미스터리',
  10749: '로맨스',
  878: 'SF',
  10770: 'TV 영화',
  53: '스릴러',
  10752: '전쟁',
  37: '서부',
};

export const getImageUrl = (path: string | null, size: 'w500' | 'w780' | 'original' = 'w500'): string => {
  if (!path) return 'https://images.unsplash.com/photo-1574267432644-f74f389d0e1c?w=500&q=80';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

export const getPosterUrl = (path: string | null): string => getImageUrl(path, 'w500');
export const getBackdropUrl = (path: string | null): string => getImageUrl(path, 'original');

// API calls
const safeJson = async (res: Response) => {
  try { return await res.json(); } catch { return {}; }
};

export const getPopularMovies = async (page: number = 1): Promise<TMDBMovie[]> => {
  const res = await fetch(`${TMDB_BASE_URL}/movie/popular?language=ko-KR&page=${page}`, { headers });
  const data = await safeJson(res);
  return (data as any).results || [];
};

export const getTopRatedMovies = async (page: number = 1): Promise<TMDBMovie[]> => {
  const res = await fetch(`${TMDB_BASE_URL}/movie/top_rated?language=ko-KR&page=${page}`, { headers });
  const data = await safeJson(res);
  return (data as any).results || [];
};

export const getNowPlayingMovies = async (page: number = 1): Promise<TMDBMovie[]> => {
  const res = await fetch(`${TMDB_BASE_URL}/movie/now_playing?language=ko-KR&page=${page}`, { headers });
  const data = await safeJson(res);
  return (data as any).results || [];
};

export const getUpcomingMovies = async (page: number = 1): Promise<TMDBMovie[]> => {
  const res = await fetch(`${TMDB_BASE_URL}/movie/upcoming?language=ko-KR&page=${page}`, { headers });
  const data = await safeJson(res);
  return (data as any).results || [];
};

export const searchMovies = async (query: string, page: number = 1): Promise<TMDBMovie[]> => {
  const q = encodeURIComponent(query);
  const res = await fetch(`${TMDB_BASE_URL}/search/movie?language=ko-KR&query=${q}&page=${page}&include_adult=false`, { headers });
  const data = await safeJson(res);
  return (data as any).results || [];
};

export const getMovieDetails = async (movieId: number): Promise<TMDBMovieDetail | null> => {
  try {
    const res = await fetch(`${TMDB_BASE_URL}/movie/${movieId}?language=ko-KR`, { headers });
    return await res.json();
  } catch {
    return null;
  }
};

export const getMovieCredits = async (movieId: number): Promise<TMDBCredits | null> => {
  try {
    const res = await fetch(`${TMDB_BASE_URL}/movie/${movieId}/credits?language=ko-KR`, { headers });
    return await res.json();
  } catch {
    return null;
  }
};

export const getMovieVideos = async (movieId: number): Promise<TMDBVideos | null> => {
  try {
    const res = await fetch(`${TMDB_BASE_URL}/movie/${movieId}/videos?language=ko-KR`, { headers });
    return await res.json();
  } catch {
    return null;
  }
};

// Convert TMDB movie to our Movie interface
export interface Movie {
  id: string;
  title: string;
  originalTitle?: string;
  genre: string[];
  releaseDate: string;
  runtime: number;
  rating: number;
  reviewCount: number;
  poster: string;
  backdrop: string;
  synopsis: string;
  director: string;
  cast: string[];
  trailerUrl?: string;
  status: 'released' | 'upcoming' | 'in_theaters';
  isPopular: boolean;
  budget?: number;
  boxOffice?: number;
}

export const convertTMDBToMovie = async (tmdbMovie: TMDBMovie): Promise<Movie> => {
  const details = await getMovieDetails(tmdbMovie.id);
  const credits = await getMovieCredits(tmdbMovie.id);
  const videos = await getMovieVideos(tmdbMovie.id);

  const director = credits?.crew.find((p) => p.job === 'Director')?.name || '정보 없음';
  const cast = credits?.cast.slice(0, 4).map((a) => a.name) || [];
  const trailer = videos?.results.find((v) => v.type === 'Trailer' && v.site === 'YouTube');

  const genres = tmdbMovie.genre_ids.map((id) => GENRE_MAP[id]).filter(Boolean) as string[];

  // Determine status
  let status: 'released' | 'upcoming' | 'in_theaters' = 'released';
  const releaseDate = new Date(tmdbMovie.release_date);
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  if (releaseDate > now) status = 'upcoming';
  else if (releaseDate > thirtyDaysAgo) status = 'in_theaters';

  return {
    id: tmdbMovie.id.toString(),
    title: tmdbMovie.title,
    originalTitle: tmdbMovie.original_title,
    genre: genres,
    releaseDate: tmdbMovie.release_date,
    runtime: details?.runtime || 0,
    rating: Math.round(tmdbMovie.vote_average * 10) / 10,
    reviewCount: tmdbMovie.vote_count,
    poster: getPosterUrl(tmdbMovie.poster_path),
    backdrop: getBackdropUrl(tmdbMovie.backdrop_path),
    synopsis: tmdbMovie.overview || '줄거리 정보가 없습니다.',
    director,
    cast,
    trailerUrl: trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : undefined,
    status,
    isPopular: tmdbMovie.popularity > 100,
    budget: details?.budget ?? undefined,
    boxOffice: details?.revenue ?? undefined,
  };
};

export const convertTMDBMoviesToMovies = async (tmdbMovies: TMDBMovie[]): Promise<Movie[]> => {
  const promises = tmdbMovies.map((m) => convertTMDBToMovie(m));
  return Promise.all(promises);
};
