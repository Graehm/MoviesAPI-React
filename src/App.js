// require('dotenv').config()
const PORT = process.env.PORT || 3009

import { useState, useEffect } from "react";

import Form from "./components/Form";
import MovieIndex from "./components/MovieIndex";
import MovieDisplay from "./components/MovieDisplay";

import "./styles.css";
// --------- suggested main export function from arthur ----------- //
// import MovieDisplay from './MovieDisplay'
// export default function MovieList({movies}){
//   return (
//       movies.map((movie) => {
//         return <MovieDisplay key={movie.imdbID} movie={movie}/>
//     })
//   )
// }

// -------------- seperation of concerns concern here --------------- //
// app.get('*', (req, res) => {
// 	res.sendFile(path.resolve(path.join(__dirname, 'public', 'index.html')))
// })

// app.listen(PORT, () => {
//     console.log(`API Listening on port ${PORT}`);
// });
export default function App() {
  const apiKey = process.env.REACT_APP_API_KEY; 

  // state to hold movie list data
  const [movieList, setMovieList] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [resultPage, setResultPage] = useState(1);
  const [searchTermEntered, setSearchTermEntered] = useState("Harry Potter")

  // function to get movie list
  const getMovieList = async (searchTerm) => {
    try {
      setSelectedMovie(null);
      // make fetch request and store response
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`
      );
      // parse JSON response into a javascript object
      const data = await response.json();
      // set the movie state to the movie
      setMovieList(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Adds a default search term
  useEffect(() => {
    getMovieList("Harry Potter");
  }, []);

  return selectedMovie ? (
    // if there is a movie selected, return the selected movie
    <div>
      <Form getMovieList={getMovieList} />
      <div className="movie">
        <MovieDisplay movie={selectedMovie} />
      </div>
      <div>
        <p>Director: {selectedMovie.Director}</p>
        <p>imdb Rating: {selectedMovie.imdbRating}</p>
        <p>Metascore: {selectedMovie.Metascore}</p>
        <p>Plot: {selectedMovie.Plot}</p>
        <p>Rated: {selectedMovie.Rated}</p>
      </div>
    </div>
  ) : (
    // if no movie is selected, return list of search results
    <div className="App">
      <div>
        <Form getMovieList={getMovieList} />
      </div>
      <div className="movieList">
        <MovieIndex
          movieList={movieList}
          // pass selevted movie state variable and selected movie updater function for use in MovieIndex component
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
        />
      </div>
    </div>
  );
}


// ----------------- old code -----------------------
// export default function App() {
//   const apiKey = "67faf4f6";

//   const [movie, setMovie] = useState(null);
//   const [movies, setMovies] = useState([]);  

//   const getMovie = async (searchTerm) => {
//     try {
//       const response = await fetch(
//         `https://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`
//       );
//       const data = await response.json();
//       setMovie(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const getMovies = async (searchTerm) => {
//     try {
//       const response = await fetch(
//         `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`
//       );
//       const data = await response.json();
//       setMovies(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getMovie("Eraserhead");
//   }, []);

//   return (
//     <div className="App">
//       <Form getMovie={getMovie} />
//       <MovieDisplay movie={movie} />
//       <SearchForm getMovies={getMovies} />
//       <MovieList movies={movies} />
//     </div>
//   );
// }
