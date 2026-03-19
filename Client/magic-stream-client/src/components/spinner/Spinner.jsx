
const Spinner = () => {

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh',
            gap: '1.5rem',
        }}>
            {/* Gradient Spinning Ring */}
            <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                border: '3px solid rgba(255,255,255,0.06)',
                borderTopColor: '#00d4ff',
                borderRightColor: '#7c3aed',
                animation: 'gradientSpin 0.8s linear infinite',
            }}></div>
            <span style={{
                color: 'var(--text-muted)',
                fontSize: '0.9rem',
                fontWeight: 500,
                letterSpacing: '0.05em',
            }}>
                Loading...
            </span>
        </div>
    );
}

export default Spinner;