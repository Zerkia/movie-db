import { NextResponse } from "next/server";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export async function GET(request: Request) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    if (!apiKey) {
      console.error("API key not found in environment variables");
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);

    const response = await fetch(
      `${TMDB_BASE_URL}/movie/popular?api_key=${apiKey}&page=${page}`,
      {
        cache: "force-cache",
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      console.error(
        "TMDB API returned error:",
        response.status,
        await response.text()
      );
      return NextResponse.json(
        { error: "Failed to fetch popular movies from TMDB" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch popular movies",
      },
      { status: 500 }
    );
  }
}
