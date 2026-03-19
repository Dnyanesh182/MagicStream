import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import {useNavigate, NavLink} from 'react-router-dom'
import useAuth from '../../hooks/useAuth';
import logo from '../../assets/MagicStreamLogo.png';

const Header = ({handleLogout}) => {
    const navigate = useNavigate();
    const {auth} = useAuth();

    return (
        <Navbar expand="lg" sticky="top" className="shadow-sm" style={{
            background: 'rgba(10, 14, 23, 0.9)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
            <Container>
                <Navbar.Brand as={NavLink} to="/" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                }}>
                     <img
                        alt=""
                        src={logo}
                        width="32"
                        height="32"
                        style={{ filter: 'drop-shadow(0 0 6px rgba(0,212,255,0.4))' }}
                    />
                    <span style={{
                        fontWeight: 800,
                        fontSize: '1.35rem',
                        background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}>MagicStream</span>
                </Navbar.Brand>

            <Navbar.Toggle aria-controls="main-navbar-nav" style={{
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '0.35rem 0.65rem',
            }} />
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/" end style={{
                            color: '#8b95a5',
                            fontWeight: 500,
                            fontSize: '0.95rem',
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            transition: 'all 150ms ease',
                        }}>
                            Home
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/recommended" style={{
                            color: '#8b95a5',
                            fontWeight: 500,
                            fontSize: '0.95rem',
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            transition: 'all 150ms ease',
                        }}>
                            Recommended
                        </Nav.Link>
                    </Nav>
    
                    <Nav className="ms-auto align-items-center" style={{ gap: '0.5rem' }}>
                        {auth ? (
                        <>
                            <span style={{
                                color: '#8b95a5',
                                fontSize: '0.9rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                            }}>
                                <span style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 700,
                                    fontSize: '0.8rem',
                                    color: '#fff',
                                }}>
                                    {auth.first_name?.charAt(0)?.toUpperCase()}
                                </span>
                                <span style={{ color: '#f0f2f5' }}>
                                    {auth.first_name}
                                </span>
                            </span>
                            <Button
                                variant="outline-light"
                                size="sm"
                                onClick={handleLogout}
                                style={{
                                    borderColor: 'rgba(255,255,255,0.15)',
                                    color: '#8b95a5',
                                    borderRadius: '8px',
                                    fontWeight: 500,
                                    fontSize: '0.85rem',
                                    padding: '0.35rem 1rem',
                                }}
                            >
                                Logout
                            </Button>
                        </>
                        ):(
                            <>
                                <Button
                                    variant="outline-info"
                                    size="sm"
                                    className="me-1"
                                    onClick={() => navigate("/login")}
                                    style={{
                                        borderRadius: '8px',
                                        fontWeight: 500,
                                        fontSize: '0.85rem',
                                        padding: '0.35rem 1.1rem',
                                    }}
                                >
                                    Login
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={() => navigate("/register")}
                                    style={{
                                        background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontWeight: 600,
                                        fontSize: '0.85rem',
                                        padding: '0.35rem 1.1rem',
                                        boxShadow: '0 4px 15px rgba(0, 212, 255, 0.25)',
                                    }}
                                >
                                    Register
                                </Button>                        
                            </>
                        )}
                    </Nav>       
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default Header;