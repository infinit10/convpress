import { PageContainer } from "../components/PageContainer";

export function Home() {
  return (
    <PageContainer>
      <h1 className="text-primary display-4 fw-semibold">Welcome to Convpress</h1>
      <p className="mt-3 fs-5 theme-muted-text">
        Convert and compress your files with ease.
      </p>
      <div className="d-flex gap-4 mt-5 justify-content-center">
        <a href="/convert" className="text-decoration-none">
          <div className="theme-card p-3" style={{ width: "18rem" }}>
            <div className="text-center">
              <h5 className="mb-2">Convert Files</h5>
              <p className="mb-0">Easily convert files between formats.</p>
            </div>
          </div>
        </a>
        <a href="/compress" className="text-decoration-none">
          <div className="theme-card p-3" style={{ width: "18rem" }}>
            <div className="text-center">
              <h5 className="mb-2">Compress Files</h5>
              <p className="mb-0">Reduce file size quickly and securely.</p>
            </div>
          </div>
        </a>
      </div>
    </PageContainer>
  );
}
