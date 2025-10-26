import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/lib/types";
import { getImageUrl } from "@/lib/api";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movie/${movie.id}`} className="group">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg">
        <div className="relative aspect-2/3">
          <Image
            src={getImageUrl(movie.poster_path, "w300")}
            alt={movie.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          {movie.vote_average > 0 && (
            <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
              ⭐ {movie.vote_average.toFixed(1)}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {movie.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
            {movie.overview}
          </p>
          <div className="mt-3 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
            <span>
              {movie.release_date
                ? new Date(movie.release_date).getFullYear()
                : "N/A"}
            </span>
            <span>{movie.vote_count} votes</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
