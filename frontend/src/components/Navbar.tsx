import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  return (
    <nav className="theme-navbar shadow-sm px-4 py-2 d-flex justify-content-between align-items-center w-100">
      <a href="/" className="d-flex align-items-center text-decoration-none nav-link-custom gap-2">
        {/* Example icon using Bootstrap icons */}
        <img src="/convpress-logo.png" alt="Convpress Logo" width={48} height={48} />
        <span className="display-4 fw-normal" style={{ fontSize: 30 }}>Convpress</span>
      </a>
      <div className="d-flex align-items-center gap-3">
        <ThemeToggle />
      </div>
    </nav>
  );
}
