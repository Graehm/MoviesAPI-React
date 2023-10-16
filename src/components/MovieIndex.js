// import MovieDisplay component
import MovieDisplay from "./MovieDisplay";

export default function MovieIndex({
  movieList,
  selectedMovie,
  setSelectedMovie,
  getMovieList,
  searchTermEntered,
  resultsPage
}) {
  // function to display loading text while data is beign fetched
  const loading = () => <h1>Currently loading movies please be patient...</h1>;
  // once data is received...
  const loaded = () =>
    // create a MovieDisplay component for each movie in the search results
    movieList.Search.map((movie) => (
      <div className="movie" key={movie.imdbID}>
        <MovieDisplay
          key={movie.imdbID}
          movie={movie}
          // pass selevted movie state variable and selected movie updater function for use in MovieDisplay component
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          getMovieList={getMovieList}
          searchTermEntered={searchTermEntered}
          resultsPage={resultsPage}
        />
      </div>
    ));

  return movieList === null ? loading() : loaded();
}



// -------------------- old code ---------------------- 
// import MovieDisplay from "./MovieDisplay";
// export default function MovieList({ movies }) {
//   const loading = () => <>LOADING</>;
//   const loaded = () => (
//     <ul>
//       {movies.Search.map((movie) => (
//         <MovieDisplay key={movie.imdbID} movie={movie} />
//       ))}
//     </ul>
//   );
//   return !movies || !movies.Search || movies.length === 0
//     ? loading()
//     : loaded();
// }