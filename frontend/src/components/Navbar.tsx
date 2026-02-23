import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  return (
    <nav className="app-navbar hstack justify-between" style={{ padding: '0.5rem 1.5rem' }}>
      <a href="/" className="hstack gap-2" style={{ textDecoration: 'none', color: 'var(--foreground)' }}>
        <img src="/convpress-logo.png" alt="Convpress Logo" width={48} height={48} />
        <span style={{ fontSize: '1.5rem', fontWeight: 'var(--font-medium)' }}>Convpress</span>
      </a>
      <ThemeToggle />
    </nav>
  );
}
