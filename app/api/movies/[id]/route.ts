import { fetchMovieDetails } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const movieId = parseInt(params.id, 10);

    if (isNaN(movieId)) {
      return NextResponse.json({ error: "Invalid movie ID" }, { status: 400 });
    }

    const movie = await fetchMovieDetails(movieId);
    return NextResponse.json(movie);
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return NextResponse.json(
      { error: "Failed to fetch movie details" },
      { status: 500 }
    );
  }
}
