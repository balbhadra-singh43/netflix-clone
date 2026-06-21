import { useRef } from "react";
import "./Row.css";

function Row({ title, moviesList, onMovieSelect }) {
  const rowRef = useRef(null);

  // Scroll function for row navigation buttons
  const handleScroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth * 0.75
          : scrollLeft + clientWidth * 0.75;
      
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="movie-row">
      <h2 className="row-title">{title}</h2>
      
      <div className="row-container">
        {/* Left Arrow Button */}
        <button className="row-arrow left-arrow" onClick={() => handleScroll("left")}>
          ‹
        </button>

        <div className="row-posters" ref={rowRef}>
          {moviesList.map((movie) => (
            <div
              key={movie.id}
              className="row-poster-card"
              onClick={() => onMovieSelect(movie)}
            >
              <img
                src={movie.image}
                alt={movie.title}
                className="row-poster-img"
                loading="lazy"
              />
              <div className="poster-overlay">
                <span className="overlay-play-icon">▶</span>
                <p className="overlay-title">{movie.title}</p>
                <div className="overlay-meta">
                  <span>{movie.year}</span>
                  <span className="rating-badge">{movie.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button className="row-arrow right-arrow" onClick={() => handleScroll("right")}>
          ›
        </button>
      </div>
    </div>
  );
}

export default Row;
