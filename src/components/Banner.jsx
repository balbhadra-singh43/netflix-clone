import { useState, useEffect } from "react";
import "./Banner.css";
import movies from "../data/movies";

function Banner({ onMovieSelect }) {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    // Select a random movie from trending to display in the banner
    const trendingMovies = movies.trending;
    if (trendingMovies && trendingMovies.length > 0) {
      const randomIndex = Math.floor(Math.random() * trendingMovies.length);
      setMovie(trendingMovies[randomIndex]);
    }
  }, []);

  if (!movie) return null;

  // Truncate description text
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(20, 20, 20, 1)), url("${movie.backdrop}")`,
      }}
    >
      <div className="banner-content">
        <h1 className="banner-title">{movie.title}</h1>
        
        <div className="banner-info-tags">
          <span className="banner-tag-year">{movie.year}</span>
          <span className="banner-tag-rating">{movie.rating}</span>
        </div>

        <p className="banner-description">
          {truncate(movie.description, 150)}
        </p>

        <div className="banner-buttons">
          <button className="banner-button play-btn" onClick={() => onMovieSelect(movie)}>
            <span className="btn-icon">▶</span> Play
          </button>
          <button className="banner-button info-btn" onClick={() => onMovieSelect(movie)}>
            <span className="btn-icon">ℹ</span> More Info
          </button>
        </div>
      </div>
    </header>
  );
}

export default Banner;
