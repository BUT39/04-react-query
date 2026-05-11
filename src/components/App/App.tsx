import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import toast from "react-hot-toast";
import { fetchMovies } from "../../services/movieService";
import { useState } from "react";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import type { Movie } from "../../types/movie";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    setMovies([]);
    setIsError(false);
    setIsLoading(true);
    try {
      const results = await fetchMovies(query);
      if (results.length === 0) {
        toast.error("No movies found for your request.");
      }
      setMovies(results);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {!isError && !isLoading && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}
