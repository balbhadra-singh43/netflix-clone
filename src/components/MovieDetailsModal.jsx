import "./MovieDetailsModal.css";

function MovieDetailsModal({ movie, onClose, onToggleMyList, isInMyList, isLiked, onToggleLike }) {
  if (!movie) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        {/* Modal Backdrop Banner */}
        <div
          className="modal-banner"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(20, 20, 20, 1)), url("${movie.backdrop}")`,
          }}
        >
          <div className="modal-banner-content">
            <h2>{movie.title}</h2>
            <div className="modal-actions">
              <button className="modal-btn play-btn-main" onClick={() => alert(`Playing: ${movie.title}`)}>▶ Play</button>
              <button 
                className={`modal-btn-round ${isInMyList ? "added" : ""}`} 
                title={isInMyList ? "Remove from My List" : "Add to My List"}
                onClick={() => onToggleMyList(movie)}
              >
                {isInMyList ? "✓" : "+"}
              </button>
              <button 
                className={`modal-btn-round ${isLiked ? "liked" : ""}`} 
                title={isLiked ? "Unlike" : "Like"}
                onClick={() => onToggleLike(movie)}
              >
                {isLiked ? "❤️" : "👍"}
              </button>
            </div>
          </div>
        </div>

        {/* Modal Info Details */}
        <div className="modal-details">
          <div className="details-left">
            <div className="details-metadata">
              <span className="metadata-match">98% Match</span>
              <span className="metadata-year">{movie.year}</span>
              <span className="metadata-rating">{movie.rating}</span>
              <span className="metadata-hd">HD</span>
            </div>
            <p className="details-desc">{movie.description}</p>
          </div>

          <div className="details-right">
            <div className="details-info-row">
              <span className="info-label">Cast: </span>
              <span className="info-value">Winona Ryder, David Harbour, Millie Bobby Brown</span>
            </div>
            <div className="details-info-row">
              <span className="info-label">Genres: </span>
              <span className="info-value">Sci-Fi, Drama, Mystery</span>
            </div>
            <div className="details-info-row">
              <span className="info-label">This show is: </span>
              <span className="info-value">Exciting, Suspenseful, Imaginative</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsModal;
