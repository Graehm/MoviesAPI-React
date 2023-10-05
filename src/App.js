// require('dotenv').config()
const PORT = process.env.PORT || 3009

import { useEffect, useState } from "react";
import Form from "./components/Form";
import MovieDisplay from "./components/MovieDisplay";
import MovieList from "./components/MovieList";
import "./styles.css";
import SearchForm from "./components/SearchForm";
import MovieDescription from "./components/MovieDescription";

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
  const apiKey = "98e3fb1f";

  const [movie, setMovie] = useState(null);
  const [movies, setMovies] = useState([]);  

  const getMovie = async (searchTerm) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`
      );
      const data = await response.json();
      setMovie(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getMovies = async (searchTerm) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`
      );
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovie("Eraserhead");
  }, []);

  return (
    <div className="App">
      <Form getMovie={getMovie} />
      <MovieDisplay movie={movie} />
      <SearchForm getMovies={getMovies} />
      <MovieList movies={movies} />
    </div>
  );
}
