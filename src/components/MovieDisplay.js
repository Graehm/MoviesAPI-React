export default function MovieDisplay({
  movie,
  selectedMovie,
  setSelectedMovie
}) {
  const apiKey = "98e3fb1f";
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

  // function to display loading text while data is beign fetched
  const loading = () => <>Currently Loading Movie...</>;
  // once data is received...
  const loaded = () => (
    // if there is a movie selected, return the selected movie and extended details
    <div className="movie" onClick={handleClick}>
      <h2>{movie.Title}</h2>
      <p>{movie.Year}</p>
      <img src={movie.Poster} alt={movie.Title} />
      {selectedMovie ? (
        <div>
          <p>Director: {movie.Director}</p>
          <p>imdb Rating: {movie.imdbRating}</p>
          <p>Metascore: {movie.Metascore}</p>
          <p>Plot: {movie.Plot}</p>
          <p>Rated: {movie.Rated}</p>
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
