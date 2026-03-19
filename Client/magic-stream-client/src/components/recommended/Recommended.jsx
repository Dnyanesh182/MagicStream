import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import {useEffect, useState} from 'react';
import Movie from '../movie/Movie';
import Spinner from '../spinner/Spinner';

const Recommended = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const fetchRecommendedMovies = async () => {
            setLoading(true);
            setMessage("");

            try{
                const response = await axiosPrivate.get('/recommendedmovies');
                setMovies(response.data);
                if (!response.data || response.data.length === 0) {
                    setMessage("No recommendations yet. Select your favourite genres in your profile to get personalized movie recommendations!");
                }
            } catch (error){
                console.error("Error fetching recommended movies:", error)
                setMessage("Unable to load recommendations. Please try again later.");
            } finally {
                setLoading(false);
            }

        }
        fetchRecommendedMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="container page-container">
            <div className="section-header animate-in">
                <h2>⭐ Recommended For You</h2>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                    Personalized picks based on your taste
                </p>
            </div>

            {loading ? (
                <Spinner/>
            ) : movies && movies.length > 0 ? (
                <div className="row stagger-children">
                    {movies.map((movie) => (
                        <Movie key={movie._id} movie={movie} />
                    ))}
                </div>
            ) : (
                <div className="empty-state animate-in">
                    <div className="empty-state-icon">🎯</div>
                    <h3>No Recommendations Yet</h3>
                    <p>{message || "Select your favourite genres when you register to get personalized movie recommendations!"}</p>
                </div>
            )}
        </div>
    )

}
export default Recommended