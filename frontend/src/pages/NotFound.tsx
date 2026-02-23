import { useNavigate } from 'react-router-dom';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="vstack items-center justify-center text-center" style={{ flex: 1, padding: '4rem 1rem', gap: 'var(--space-4)' }}>
      <span style={{ fontSize: '6rem', lineHeight: 1, fontWeight: 'var(--font-bold)', color: 'var(--muted-foreground)' }}>
        404
      </span>
      <h2 style={{ margin: 0 }}>Page not found</h2>
      <p className="text-light" style={{ maxWidth: '400px' }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="hstack" style={{ gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
        <button onClick={() => navigate(-1)} data-variant="secondary">Go Back</button>
        <button onClick={() => navigate('/')}>Home</button>
      </div>
    </div>
  );
}
