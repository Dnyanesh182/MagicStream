import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import {useEffect, useState} from 'react';
import Movies from '../movies/Movies';
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
        <>
            {loading ? (
                <Spinner/>
            ) :(
                <Movies movies = {movies} message ={message} />
            )}
        </>
    )

}
export default Recommended