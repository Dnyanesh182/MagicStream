import {Form, Button} from 'react-bootstrap';
import { useRef,useEffect,useState } from 'react';
import {useParams} from 'react-router-dom'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';
import Movie from '../movie/Movie'
import Spinner from '../spinner/Spinner';

const Review = () => {

    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(false);
    const revText = useRef();
    const { imdb_id } = useParams();
    const {auth} = useAuth();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const fetchMovie = async () => {
            setLoading(true);
            try {
                const response = await axiosPrivate.get(`/movie/${imdb_id}`);
                setMovie(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching movie:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imdb_id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setLoading(true);
        try {
            
            const response = await axiosPrivate.patch(`/updatereview/${imdb_id}`, { admin_review: revText.current.value });
            console.log(response.data);           

            setMovie(() => ({
                ...movie,
                admin_review: response.data?.admin_review ?? movie.admin_review,
                ranking: {
                    ranking_name: response.data?.ranking_name ?? movie.ranking?.ranking_name
                }
            }));

        } catch (err) {
            console.error(err);
            if (err.response && err.response.status === 401) {
                 console.error('Unauthorized access - redirecting to login');
                 localStorage.removeItem('user');
            } else {
                console.error('Error updating review:', err);
            }

        } finally {
            setLoading(false);
        }
    }; 

    return (
      <>
        {loading ? (
            <Spinner />
        ) : (
            <div className="container page-container">
                <div className="section-header animate-in">
                    <h2>✍️ Movie Review</h2>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                        Share your thoughts on this film
                    </p>
                </div>
                <div className="row justify-content-center animate-in" style={{ animationDelay: '0.1s' }}>
                    <div className="col-12 col-md-5 d-flex align-items-start justify-content-center mb-4 mb-md-0">
                        <div style={{
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: 'var(--radius-lg)',
                            padding: '1rem',
                            width: '100%',
                        }}>
                            <Movie movie={movie} />
                        </div>
                    </div>
                    <div className="col-12 col-md-7 d-flex align-items-stretch">
                        <div style={{
                            width: '100%',
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: 'var(--radius-lg)',
                            padding: '2rem',
                        }}>
                            {auth && auth.role === "ADMIN" ? (
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="adminReviewTextarea">
                                        <Form.Label style={{ fontWeight: 600, fontSize: '1.05rem' }}>Admin Review</Form.Label>
                                        <Form.Control
                                            ref={revText}
                                            required
                                            as="textarea"
                                            rows={8}
                                            defaultValue={movie?.admin_review}
                                            placeholder="Write your review here..."
                                            style={{ resize: "vertical" }}
                                        />
                                    </Form.Group>
                                    <div className="d-flex justify-content-end">
                                        <Button type="submit" style={{
                                            background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
                                            border: 'none',
                                            fontWeight: 600,
                                            borderRadius: '10px',
                                            padding: '0.6rem 2rem',
                                            boxShadow: '0 4px 15px rgba(0, 212, 255, 0.25)',
                                        }}>
                                            Submit Review
                                        </Button>
                                    </div>
                                </Form> ):(
                                <div>
                                    <h5 style={{ fontWeight: 600, marginBottom: '1rem' }}>Review</h5>
                                    <p style={{
                                        color: 'var(--text-secondary)',
                                        lineHeight: 1.8,
                                        fontSize: '0.95rem',
                                        background: 'var(--bg-glass)',
                                        padding: '1.25rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--border-subtle)',
                                    }}>
                                        {movie.admin_review || 'No review available yet.'}
                                    </p>
                                </div>
                            )}                           
                        </div>
                    </div>
                </div>
            </div>
        )}
    </>      

    );
}

export default Review;