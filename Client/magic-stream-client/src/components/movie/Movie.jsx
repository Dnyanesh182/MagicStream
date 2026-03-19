import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCirclePlay} from '@fortawesome/free-solid-svg-icons';
import "./Movie.css";

const getRankingClass = (rankingName) => {
    if (!rankingName) return 'rank-default';
    const name = rankingName.toLowerCase();
    if (name.includes('great') || name.includes('excellent') || name.includes('amazing')) return 'rank-great';
    if (name.includes('good')) return 'rank-good';
    if (name.includes('okay') || name.includes('ok') || name.includes('average')) return 'rank-okay';
    if (name.includes('bad') || name.includes('poor')) return 'rank-bad';
    if (name.includes('terrible') || name.includes('awful') || name.includes('worst')) return 'rank-terrible';
    return 'rank-default';
};

const Movie = ({movie, updateMovieReview}) => {
    return (
        <div className="col-lg-4 col-md-6 mb-4" key={movie._id}>
            <Link
                to={`/stream/${movie.youtube_id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
            >
            <div className="card h-100 movie-card">
                <div className="poster-container">
                    <img src={movie.poster_path} alt={movie.title} 
                        className="card-img-top"
                        style={{
                            objectFit: "cover",
                            height: "320px",
                            width: "100%"
                        }}
                    />
                    <div className="poster-overlay"></div>
                    <span className="play-icon-overlay">
                            <FontAwesomeIcon icon={faCirclePlay} />
                    </span>
                </div>
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{movie.title}</h5>
                    <p className="card-text mb-2">{movie.imdb_id}</p>
                </div>
                {movie.ranking?.ranking_name && (
                    <span className={`ranking-badge ${getRankingClass(movie.ranking.ranking_name)}`}>
                        {movie.ranking.ranking_name}
                    </span>
                )}
                  {updateMovieReview && (
                        <Button
                            variant="outline-info"
                            onClick={e => {
                                e.preventDefault();
                                updateMovieReview(movie.imdb_id);
                            }}
                            className="btn-review"
                        >
                            ✍️ Write Review
                        </Button>
                    )}
            </div>
            </Link>
        </div>
    )
}
export default Movie;