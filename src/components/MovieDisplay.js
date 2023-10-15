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
    <div className="movie">
      <div className="movieTile" onClick={handleClick}>
        <h2>{movie.Title}</h2>
        <h3>{movie.Year}</h3> 
        <img src={movie.Poster} alt={movie.Title} />
      </div>
      {selectedMovie ? (
        <div>
          <p>
            Director: {movie.Director}
          </p>
          <p>
            imdb Rating: {movie.imdbRating}
          </p>
          <p>
            Metascore: {movie.Metascore}
          </p>
          <p>
            Plot: {movie.Plot}
          </p>
          <p>
            Rated: {movie.Rated}
          </p>
          <button id='btn' onClick={handleBackBttn}>
            Back
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
