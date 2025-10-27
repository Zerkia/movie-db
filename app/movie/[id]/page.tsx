"use client";

import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/api";
import { MovieDetails } from "@/lib/types";
import useSWR from "swr";
import { use } from "react";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed ${res.status}: ${text}`);
  }
  return res.json();
};

interface MovieDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function MovieDetailPage({ params }: MovieDetailPageProps) {
  const { id } = use(params);
  const {
    data: movie,
    error,
    isLoading,
  } = useSWR<MovieDetails>(`/api/movies/${id}`, fetcher);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading movie...</p>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            Error Loading Movie
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Failed to fetch movie details.
          </p>
          <Link
            href="/"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Movies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Movie details section */}
      <div className="relative min-h-screen lg:min-h-[1130px] w-[98%] mx-auto h-full">
        {/* Background image, fills whole section */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={getImageUrl(movie.backdrop_path, "original")}
            alt={movie.title}
            fill
            className="object-cover opacity-25"
            priority
            style={{ zIndex: 0 }}
          />
        </div>
        {/* Main content: poster + details box */}
        <div className="container mx-auto px-4 py-50 relative z-10 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center w-full h-full justify-center">
            {/* Poster */}
            <div className="lg:col-span-1 flex justify-center lg:justify-end">
              <div className="relative aspect-2/3 max-w-sm w-full">
                <Image
                  src={getImageUrl(movie.poster_path, "w500")}
                  alt={movie.title}
                  fill
                  className="object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
            {/* Details (blurb box) */}
            <div className="lg:col-span-2">
              <div className="rounded-lg p-8">
                {/* Title & tagline */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-1">
                  {movie.title}
                </h1>
                {movie.tagline && (
                  <p className="text-lg text-gray-600 dark:text-gray-300 italic mb-3">
                    “{movie.tagline}”
                  </p>
                )}
                {/* Info row: rating, year, runtime, votes */}
                <div className="flex flex-wrap gap-4 items-center text-gray-900 dark:text-white mb-4">
                  {typeof movie.vote_average === "number" && (
                    <span className="bg-yellow-500 px-3 py-1 rounded-full text-sm font-semibold">
                      ⭐ {movie.vote_average.toFixed(1)}
                    </span>
                  )}
                  <span>
                    {movie.release_date
                      ? new Date(movie.release_date).getFullYear()
                      : "N/A"}
                  </span>
                  {movie.runtime && <span>{movie.runtime} min</span>}
                  <span>{movie.vote_count} votes</span>
                </div>
                {/* Overview */}
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 mt-2">
                  Overview
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {movie.overview}
                </p>
                {/* Genres */}
                {movie.genres && movie.genres.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-2">
                      Genres
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {movie.genres.map((genre) => (
                        <span
                          key={genre.id}
                          className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {/* Additional info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {movie.budget > 0 && (
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Budget:
                      </span>
                      <span className="ml-2 text-gray-700 dark:text-gray-300">
                        ${movie.budget.toLocaleString()}
                      </span>
                    </div>
                  )}
                  {movie.revenue > 0 && (
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Revenue:
                      </span>
                      <span className="ml-2 text-gray-700 dark:text-gray-300">
                        ${movie.revenue.toLocaleString()}
                      </span>
                    </div>
                  )}
                  {movie.status && (
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Status:
                      </span>
                      <span className="ml-2 text-gray-700 dark:text-gray-300">
                        {movie.status}
                      </span>
                    </div>
                  )}
                  {movie.original_language && (
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Language:
                      </span>
                      <span className="ml-2 text-gray-700 dark:text-gray-300">
                        {movie.original_language.toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
