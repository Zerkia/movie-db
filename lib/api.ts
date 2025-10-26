import { Movie, MovieDetails, PopularMoviesResponse } from "./types";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export const getApiKey = () => {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  if (!apiKey) {
    throw new Error("TMDB API key is not configured");
  }
  return apiKey;
};

export const getImageUrl = (
  path: string | null,
  size: "w200" | "w300" | "w500" | "original" = "w500"
) => {
  if (!path) return "/placeholder-movie.jpg";
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

export const fetchPopularMovies = async (
  page: number = 1
): Promise<PopularMoviesResponse> => {
  const apiKey = getApiKey();
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/popular?api_key=${apiKey}&page=${page}`,
    {
      cache: "force-cache", // Cache for performance
      next: { revalidate: 3600 }, // Cache for 1 hour
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch popular movies");
  }

  const data = await response.json();
  return data;
};

export const fetchMovieDetails = async (
  movieId: number
): Promise<MovieDetails> => {
  const apiKey = getApiKey();
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/${movieId}?api_key=${apiKey}`,
    {
      cache: "force-cache", // Cache for performance
      next: { revalidate: 3600 }, // Cache for 1 hour
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }

  const data = await response.json();
  return data;
};
