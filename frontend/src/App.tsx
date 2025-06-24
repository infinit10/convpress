import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import { Navbar } from './components/Navbar';

// Pages
import { Home } from './pages/Home';
import { Convert } from './pages/Convert';
import { Compress } from './pages/Compress';
import { ImageToImage } from './pages/ImageToImage';
import { ImageToPDF } from './pages/ImageToPDF';
import { PDFToImage } from './pages/PDFToImage';
import { ImageCompress } from './pages/ImageCompress';
import { PDFCompress } from './pages/PDFCompress';


export default function App() {
  return (
    <Router>
      <div id="app-wrapper" className="d-flex flex-column min-vh-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/convert" element={<Convert />} />
          <Route path="/convert/image-to-image" element={<ImageToImage />} />
          <Route path="/convert/image-to-pdf" element={<ImageToPDF />} />
          <Route path="/convert/pdf-to-image" element={<PDFToImage />} />
          <Route path="/compress" element={<Compress />} />
          <Route path="/compress/image" element={<ImageCompress />} />
          <Route path="/compress/pdf" element={<PDFCompress />} />
          <Route path="*" element={<div className="p-4 text-danger">404 — Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}
