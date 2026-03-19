import Movie from '../movie/Movie'

const Movies = ({movies, updateMovieReview, message}) => {

    return (
        <div className="container page-container">
            <div className="section-header animate-in">
                <h2>🎬 Now Showing</h2>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                    Explore our curated collection
                </p>
            </div>
            <div className="row stagger-children">
                {movies && movies.length > 0
                    ? movies.map((movie) => (
                        <Movie key={movie._id} updateMovieReview={updateMovieReview} movie={movie} />
                    ))
                    : message && (
                        <div className="empty-state animate-in">
                            <div className="empty-state-icon">🎥</div>
                            <h3>{message}</h3>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
export default Movies;