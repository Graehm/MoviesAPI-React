export default function MovieDisplay({
  movie,
  selectedMovie,
  setSelectedMovie,
  getMovieList,
  searchTermEntered,
  resultsPage
}) {
  const apiKey = process.env.REACT_APP_API_KEY;
  const handleClick = async (e) => {
    try {
      // make fetch request and store response
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`
      );
      // parse JSON response into a javascript object
      const data = await response.json();
      // set returned movie data as SelectedMovie state
      setSelectedMovie(data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleBackBttn = async () => {
    setSelectedMovie(null);
    await getMovieList(searchTermEntered, resultsPage);
    window.scrollTo(0, 0);
  };
  // function to display loading text while data is beign fetched
  const loading = () => <>Currently Loading Movie...</>;
  // once data is received...
  const loaded = () => (
    // if there is a movie selected, return the selected movie and extended details
    <div className="movie-info">
      <div className="clickable" onClick={handleClick}>
        <img src={movie.Poster} alt={movie.Title} />
        <h2 className="movie-title">{movie.Title}</h2>
        <h3 className="movie-year">{movie.Year}</h3>
      </div>
      {selectedMovie ? (
        <div className="movie-details">
          <p>
            <span className="bold">Director:</span> {movie.Director}
          </p>
          <p>
            <span className="bold">Writer:</span> {movie.Writer}
          </p>
          <p>
            <span className="bold">Actors:</span> {movie.Actors}
          </p>
          <p>
            <span className="bold">Genre:</span> {movie.Genre}
          </p>
          <p>
            <span className="bold">IMDB Rating:</span>{" "}
            <span style={{ color: movie.imdbRating < 5 ? "red" : "green" }}>
              {movie.imdbRating}
            </span>
          </p>
          <p>
            <span className="bold">Metascore:</span>{" "}
            <span style={{ color: movie.Metascore < 50 ? "red" : "green" }}>
              {movie.Metascore}
            </span>
          </p>
          <p>
            <span className="bold">Plot:</span> {movie.Plot}
          </p>
          <p>
            <span className="bold">Rated:</span> {movie.Rated}
          </p>
          <button id="back-btn" onClick={handleBackBttn}>
            Back to Results
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );

  return movie && movie.Title ? loaded() : loading();
}




// ------------------- old code -------------------------------- 
// import { useState } from "react";
// import MovieDescription from "./MovieDescription";

// export default function MovieDisplay({ movie }) {
//   const [desc, setDesc] = useState(false);

//   function handleClick() {
//     setDesc(!desc);
//   }

//   const loading = () => <>Currently Loading Movie...</>;

//   const loaded = () => (
//     <div onClick={handleClick}>
//       <h2>{movie.Title}</h2>
//       <img src={movie.Poster} alt={movie.Title} />
//       {desc && <MovieDescription movie={movie} />}
//     </div>
//   );

//   return movie && movie.Title ? loaded() : loading();
// }
