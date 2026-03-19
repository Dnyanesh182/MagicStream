import { useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axiosClient from '../../api/axiosConfig';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/MagicStreamLogo.png';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [favouriteGenres, setFavouriteGenres] = useState([]);
    const [genres, setGenres] = useState([]);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const toggleGenre = (genre) => {
        setFavouriteGenres(prev => {
            const exists = prev.find(g => g.genre_id === genre.genre_id);
            if (exists) {
                return prev.filter(g => g.genre_id !== genre.genre_id);
            }
            return [...prev, { genre_id: genre.genre_id, genre_name: genre.genre_name }];
        });
    };

   const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        const defaultRole ="USER";

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);

        try {
            const payload = {
                first_name: firstName,
                last_name: lastName,
                email,
                password,
                role: defaultRole,
                favourite_genres: favouriteGenres
            };
            const response = await axiosClient.post('/register', payload);
            if (response.data.error) {
                setError(response.data.error);
                return;
            }
            navigate('/login', { replace: true });
        } catch {
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const fetchGenres = async () => {
        try {
            const response = await axiosClient.get('/genres');
            setGenres(response.data);
        } catch (error) {
            console.error('Error fetching movie genres:', error);
        }
        };
    
        fetchGenres();
    }, []);


    return (
       <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
        <div className="auth-card animate-in" style={{ maxWidth: '480px' }}>
                <div className="text-center mb-4">
                    <img src={logo} alt="Logo" width={56} style={{
                        marginBottom: '1rem',
                        filter: 'drop-shadow(0 0 10px rgba(0,212,255,0.3))',
                    }} />
                    <h2 style={{ fontWeight: 700, marginBottom: '0.4rem' }}>Create Account</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Join MagicStream for free</p>
                </div>
                {error && <div className="alert alert-danger py-2" style={{ fontSize: '0.9rem' }}>{error}</div>}
             <Form onSubmit={handleSubmit}>
                <div className="d-flex gap-3 mb-3">
                    <Form.Group style={{ flex: 1 }}>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="John"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group style={{ flex: 1 }}>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Doe"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            required
                        />
                    </Form.Group>
                </div>
                     <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                     <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                     <Form.Group className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            required
                            isInvalid ={!!confirmPassword && password !== confirmPassword}
                        />
                        <Form.Control.Feedback type="invalid">
                            Passwords do not match.
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Genre Pill Selection */}
                    <Form.Group className="mb-4">
                        <Form.Label>Favourite Genres</Form.Label>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
                            Tap to select your favourite genres for personalized recommendations
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {genres.map(genre => {
                                const isSelected = favouriteGenres.some(g => g.genre_id === genre.genre_id);
                                return (
                                    <button
                                        key={genre.genre_id}
                                        type="button"
                                        onClick={() => toggleGenre(genre)}
                                        style={{
                                            padding: '0.4rem 0.9rem',
                                            borderRadius: '9999px',
                                            fontSize: '0.82rem',
                                            fontWeight: 500,
                                            border: isSelected
                                                ? '1px solid var(--accent)'
                                                : '1px solid var(--border-glass)',
                                            background: isSelected
                                                ? 'rgba(0, 212, 255, 0.12)'
                                                : 'var(--bg-glass)',
                                            color: isSelected
                                                ? 'var(--accent)'
                                                : 'var(--text-secondary)',
                                            cursor: 'pointer',
                                            transition: 'all 150ms ease',
                                        }}
                                    >
                                        {isSelected ? '✓ ' : ''}{genre.genre_name}
                                    </button>
                                );
                            })}
                        </div>
                    </Form.Group>

                     <Button
                        type="submit"
                        className="w-100 mb-3"
                        disabled={loading}
                        style={{
                            background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
                            border: 'none',
                            fontWeight: 600,
                            letterSpacing: '0.03em',
                            padding: '0.7rem',
                            borderRadius: '10px',
                            fontSize: '1rem',
                            boxShadow: '0 4px 20px rgba(0, 212, 255, 0.25)',
                        }}
                    >
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Creating account...
                            </>
                        ) : 'Create Account'}
                    </Button>                        
            </Form>
            <div className="text-center mt-3">
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Already have an account? </span>
                <Link to="/login" style={{ fontWeight: 600, color: 'var(--accent)', fontSize: '0.9rem' }}>Sign in</Link>
            </div>
            </div>           
       </Container>

    )
}
export default Register;