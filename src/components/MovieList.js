import MovieDisplay from "./MovieDisplay";
export default function MovieList({ movies }) {
  const loading = () => <>LOADING</>;
  const loaded = () => (
    <ul>
      {movies.Search.map((movie) => (
        <MovieDisplay key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
  return !movies || !movies.Search || movies.length === 0
    ? loading()
    : loaded();
}
