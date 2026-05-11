import type { Movie } from "../types/movie";
import axios from "axios";

interface MovieResponse {
  results: Movie[];
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const key = import.meta.env.VITE_TMDB_TOKEN;

  const response = await axios.get<MovieResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: { query },
      headers: {
        Authorization: `Bearer ${key}`,
      },
    },
  );
  return response.data.results;
};
