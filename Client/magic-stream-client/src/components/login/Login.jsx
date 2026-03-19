import {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axiosClient from '../../api/axiosConfig';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import logo from '../../assets/MagicStreamLogo.png';

const Login = () => {
    
    const {setAuth} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);       

        try {
            const response = await axiosClient.post('/login', { email, password });
            console.log(response.data);
            if (response.data.error) {
                setError(response.data.error);
                return;
            }
            setAuth(response.data);
           navigate(from, {replace: true});

        } catch (err) {
            console.error(err);
            setError('Invalid email or password');
        } finally {
            setLoading(false);
        }
    }; 
    return (
        <Container className="d-flex align-items-center justify-content-center min-vh-100" style={{ padding: '2rem 1rem' }}>
            <div className="auth-card animate-in">
                <div className="text-center mb-4">
                    <img src={logo} alt="Logo" width={56} style={{
                        marginBottom: '1rem',
                        filter: 'drop-shadow(0 0 10px rgba(0,212,255,0.3))',
                    }} />
                    <h2 style={{ fontWeight: 700, marginBottom: '0.4rem' }}>Welcome Back</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Sign in to continue streaming</p>
                </div>
                {error && <div className="alert alert-danger py-2" style={{ fontSize: '0.9rem' }}>{error}</div>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail" className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoFocus
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" className="mb-4">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
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
                                Signing in...
                            </>
                        ) : 'Sign In'}
                    </Button>
                </Form>
                <div className="text-center mt-3">
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Don&apos;t have an account? </span>
                    <Link to="/register" style={{ fontWeight: 600, color: 'var(--accent)', fontSize: '0.9rem' }}>Create one</Link>
                </div>
            </div>
        </Container>
    )
}
export default Login;