import MovieDisplay from "./MovieDisplay";

export default function MovieIndex({
  movieList,
  selectedMovie,
  setSelectedMovie,
  getMovieList, 
  searchTermEntered, 
  resultPage
}) {
  // function to display loading text while data is beign fetched
  const loading = () => <h1>Currently loading movies</h1>;
  // once data is received...
  const loaded = () =>
    // create a MovieDisplay component for each movie in the search results
    movieList.Search.map((movie) => (
      <MovieDisplay
        key={movie.imdbID}
        movie={movie}
        // pass selected movie state variable and selected movie updater function for use in MovieDisplay component
        selectedMovie={selectedMovie}
        setSelectedMovie={setSelectedMovie}
        getMovieList={getMovieList}
        searchTermEntered={searchTermEntered}
        resultsPage={resultPage}
      />
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