import React, { useState, useEffect, useContext } from "react";
import "./Movieland.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";
import { ThemeContext } from "../context/ThemeContext";

const API_URL = "http://www.omdbapi.com?apikey=99a6cfbe";

const movie1 = {
  Title: "X-Men: The Animated Series",
  Year: "1992-1997",
  imdbID: "tt0103584",
  Type: "series",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BNTVjNmEwNTMtNmQ2ZC00MGJkLWI3MDgtNzMyNTc4YjVkNTQ1L2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
};

const MovieLand = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [movies, setmovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    try {
      const response = await fetch(`${API_URL}&s=${title}`);

      const data = await response.json();

      setmovies(data.Search);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    searchMovies("");
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchMovies(searchTerm);
    }
  };

  return (
    <div className={`app ${theme ? "dark-mode" : "light-mode"}`}>
      <h1>MovieLand</h1>

      <button onClick={toggleTheme} className="theme-toggle-button">
        {theme ? "Light Mode" : "Dark Mode"}
      </button>

      <div className="search">
        <input
          type="text"
          placeholder="Search for Movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default MovieLand;
