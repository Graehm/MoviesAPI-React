import { useState, useEffect } from "react";
export default function MovieDescription({ movie }) {
  const apiKey = "756d36ec";
  const [item, setItem] = useState(movie);
  const getMovie = async () => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`
      );
      const data = await response.json();
      setItem(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovie("Eraserhead");
  }, []);

  return (
    <div className="descriptions">
      <ul>
        <li>Movie Plot: {item.Plot}</li>
        <li>Director(s): {item.Director}</li>
        <li>Lead Actors: {item.Actors}</li>
        <li>imdb Rating: {item.imdbRating}</li>
      </ul>
    </div>
  );
}
