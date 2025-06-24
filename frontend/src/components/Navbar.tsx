import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  return (
    <nav className="custom-navbar shadow-sm px-4 py-2 d-flex justify-content-between align-items-center">
      <div className="fw-bold">Convpress</div>
      <div className="d-flex align-items-center gap-3">
        <a href="/" className="text-decoration-none nav-link-custom">Home</a>
        <a href="/convert" className="text-decoration-none nav-link-custom">Convert</a>
        <a href="/compress" className="text-decoration-none nav-link-custom">Compress</a>
        <ThemeToggle />
      </div>
    </nav>
  );
}
