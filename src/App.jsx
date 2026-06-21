import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Row from "./components/Row";
import MovieDetailsModal from "./components/MovieDetailsModal";
import movies from "./data/movies";

// Helper to classify TV Shows
const TV_SHOWS = [
  "Stranger Things",
  "Breaking Bad",
  "The Witcher",
  "Money Heist",
  "Peaky Blinders",
  "Narcos",
  "Squid Game",
  "Wednesday",
  "Ozark"
];

// Extract all unique movies
const allUniqueMovies = [
  ...movies.trending,
  ...movies.topRated,
  ...movies.action,
  ...movies.myList
].reduce((acc, current) => {
  if (!acc.some((item) => item.id === current.id)) {
    acc.push(current);
  }
  return acc;
}, []);

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeTab, setActiveTab] = useState("Home");
  const [searchQuery, setSearchQuery] = useState("");
  const [myListState, setMyListState] = useState(movies.myList);
  const [likedMovies, setLikedMovies] = useState([1, 8]); // Default liked movie IDs for variety

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const handleToggleMyList = (movie) => {
    if (myListState.some((m) => m.id === movie.id)) {
      setMyListState(myListState.filter((m) => m.id !== movie.id));
    } else {
      setMyListState([...myListState, movie]);
    }
  };

  const handleToggleLike = (movie) => {
    if (likedMovies.includes(movie.id)) {
      setLikedMovies(likedMovies.filter((id) => id !== movie.id));
    } else {
      setLikedMovies([...likedMovies, movie.id]);
    }
  };

  // Live filter search query
  const searchResults = allUniqueMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Categorize
  const tvShows = allUniqueMovies.filter((m) => TV_SHOWS.includes(m.title));
  const normalMovies = allUniqueMovies.filter((m) => !TV_SHOWS.includes(m.title));
  const newAndPopular = allUniqueMovies.filter((m) => m.year >= 2017);

  return (
    <div className="app">
      {/* Navigation bar at top */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Render search results if query exists */}
      {searchQuery ? (
        <div className="search-results-page">
          <h2 className="search-header">Search Results for "{searchQuery}"</h2>
          {searchResults.length > 0 ? (
            <div className="search-grid">
              {searchResults.map((movie) => (
                <div
                  key={movie.id}
                  className="search-card"
                  onClick={() => handleMovieSelect(movie)}
                >
                  <img src={movie.image} alt={movie.title} className="search-card-img" />
                  <div className="search-card-overlay">
                    <span className="play-icon-overlay">▶</span>
                    <p>{movie.title}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-results-text">No movies or TV shows matched your search.</p>
          )}
        </div>
      ) : (
        <>
          {/* Hero Banner display */}
          <Banner onMovieSelect={handleMovieSelect} />

          {/* Main content based on activeTab */}
          <div className="rows-container">
            {activeTab === "Home" && (
              <>
                <Row
                  title="Trending Now"
                  moviesList={movies.trending}
                  onMovieSelect={handleMovieSelect}
                />
                <Row
                  title="Top Rated"
                  moviesList={movies.topRated}
                  onMovieSelect={handleMovieSelect}
                />
                <Row
                  title="Action Thrillers"
                  moviesList={movies.action}
                  onMovieSelect={handleMovieSelect}
                />
                {myListState.length > 0 && (
                  <Row
                    title="My List"
                    moviesList={myListState}
                    onMovieSelect={handleMovieSelect}
                  />
                )}
              </>
            )}

            {activeTab === "TV Shows" && (
              <>
                <Row
                  title="Popular TV Shows"
                  moviesList={tvShows.slice(0, 5)}
                  onMovieSelect={handleMovieSelect}
                />
                <Row
                  title="Trending Documentaries & Series"
                  moviesList={tvShows.slice(5)}
                  onMovieSelect={handleMovieSelect}
                />
              </>
            )}

            {activeTab === "Movies" && (
              <>
                <Row
                  title="Blockbuster Movies"
                  moviesList={normalMovies.slice(0, 6)}
                  onMovieSelect={handleMovieSelect}
                />
                <Row
                  title="Sci-Fi & Action Favorites"
                  moviesList={normalMovies.slice(6)}
                  onMovieSelect={handleMovieSelect}
                />
              </>
            )}

            {activeTab === "New & Popular" && (
              <>
                <Row
                  title="New Releases"
                  moviesList={newAndPopular}
                  onMovieSelect={handleMovieSelect}
                />
              </>
            )}

            {activeTab === "My List" && (
              <div className="my-list-page">
                <h2 className="my-list-header">My List</h2>
                {myListState.length > 0 ? (
                  <div className="search-grid">
                    {myListState.map((movie) => (
                      <div
                        key={movie.id}
                        className="search-card"
                        onClick={() => handleMovieSelect(movie)}
                      >
                        <img src={movie.image} alt={movie.title} className="search-card-img" />
                        <div className="search-card-overlay">
                          <span className="play-icon-overlay">▶</span>
                          <p>{movie.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-results-text">You haven't added any titles to your list yet.</p>
                )}
              </div>
            )}
          </div>
        </>
      )}

      {/* Pop-up Movie details modal when a card is clicked */}
      {selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          onClose={handleCloseModal}
          onToggleMyList={handleToggleMyList}
          isInMyList={myListState.some((m) => m.id === selectedMovie.id)}
          isLiked={likedMovies.includes(selectedMovie.id)}
          onToggleLike={handleToggleLike}
        />
      )}
    </div>
  );
}

export default App;
