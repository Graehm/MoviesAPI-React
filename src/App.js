// require('dotenv').config()
const PORT = process.env.PORT || 3009

import { useState, useEffect } from "react";

// import components
import Form from "./components/Form";
import MovieIndex from "./components/MovieIndex";
import MovieDisplay from "./components/MovieDisplay";
// import css styles
import "./styles.css";

export default function App() {
  // save api key to variable
  const apiKey = process.env.REACT_APP_API_KEY;
  // state to hold movie list data
  const [movieList, setMovieList] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [resultsPage, setResultsPage] = useState(1);
  const [searchTermEntered, setSearchTermEntered] = useState("Lord of the Rings");

  // function to get movie list
  const getMovieList = async (searchTerm, pageNum = 1) => {
    try {
      // reset selectedMovie state to "null"
      setSelectedMovie(null);
      if (!searchTerm) {
        throw new Error("No Movie Entered");
      }
      // make fetch request and store response
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}&type=movie&page=${pageNum}`
      );
      // parse JSON response into a javascript object
      const data = await response.json();
      // set the movie state to the movie
      setMovieList(data);
    } catch (error) {
      console.error(error);
    }
  };
  // calculate max number of pages of results
  let maxResultsPages;
  if (movieList) maxResultsPages = Math.ceil(movieList.totalResults / 10);

  // handler function for Next Page button
  const handleNextPage = async () => {
    if (resultsPage < maxResultsPages) {
      const newResultsPage = resultsPage + 1;
      setResultsPage(newResultsPage);
      getMovieList(searchTermEntered, newResultsPage);
      window.scrollTo(0, 0);
    }
  };

  // handler function for Previous Page button
  const handlePrevPage = async () => {
    if (resultsPage > 1) {
      const newResultsPage = resultsPage - 1;
      setResultsPage(newResultsPage);
      getMovieList(searchTermEntered, newResultsPage);
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    getMovieList("Lord of the Rings");
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Search Any Movie</h1>
        <div className="search">
          <Form
            getMovieList={getMovieList}
            searchTermEntered={searchTermEntered}
            setSearchTermEntered={setSearchTermEntered}
            resultsPage={resultsPage}
            setResultsPage={setResultsPage}
          />
        </div>
      </header>
      {/* check if there is a selecte movie */}
      {selectedMovie ? (
        <>
          {/* if so show only that movie's details */}
          <MovieDisplay
            movie={selectedMovie}
            getMovieList={getMovieList}
            selectedMovie={selectedMovie}
            setSelectedMovie={setSelectedMovie}
            searchTermEntered={searchTermEntered}
            resultsPage={resultsPage}
          />
        </>
      ) : (
        <>
          <div id="movie-list">
            {/* if not, show the list of movies */}
            <MovieIndex
              movieList={movieList}
              // pass selevted movie state variable and selected movie updater function for use in MovieIndex component
              selectedMovie={selectedMovie}
              setSelectedMovie={setSelectedMovie}
              getMovieList={getMovieList}
              searchTermEntered={searchTermEntered}
              resultsPage={resultsPage}
            />
          </div>
          <div id="page-btns">
            {/* check if the number of results is more than 10 */}
            {maxResultsPages > 1 && resultsPage > 1 ? (
              <>
                {/* if so, show a button to view the previous page of results */}
                <button id="prev-page" onClick={handlePrevPage}>
                  View Previous Page
                </button>
              </>
            ) : (
              <>{/* if results page number is 1, show nothing */}</>
            )}
            {movieList &&
            maxResultsPages > 1 &&
            resultsPage !== maxResultsPages ? (
              <>
                {/* if so, show a button to view the next page of results */}
                <button id="next-page" onClick={handleNextPage}>
                  View Next Page
                </button>
              </>
            ) : (
              <>{/* if number of results is less than 10, show nothing */}</>
            )}
            {/* check if the results page number is greater than one */}
          </div>
        </>
      )}
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
