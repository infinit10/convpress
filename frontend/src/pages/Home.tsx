import { PageContainer } from "../components/PageContainer";

export function Home() {
  return (
    <PageContainer>
      <h1>Welcome to Convpress</h1>
      <p className="text-light" style={{ fontSize: 'var(--text-5)' }}>
        Convert and compress your files with ease.
      </p>
      <div className="hstack justify-center mt-6" style={{ gap: 'var(--space-6)' }}>
        <a href="/convert" style={{ textDecoration: 'none', color: 'inherit' }}>
          <article className="card app-card" style={{ width: "18rem" }}>
            <header>
              <h4 className="text-center">Convert Files</h4>
            </header>
            <p className="text-center">Easily convert files between formats.</p>
          </article>
        </a>
        <a href="/compress" style={{ textDecoration: 'none', color: 'inherit' }}>
          <article className="card app-card" style={{ width: "18rem" }}>
            <header>
              <h4 className="text-center">Compress Files</h4>
            </header>
            <p className="text-center">Reduce file size quickly and securely.</p>
          </article>
        </a>
      </div>
    </PageContainer>
  );
}
