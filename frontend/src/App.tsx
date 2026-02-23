import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'

import { Navbar } from './components/Navbar';

import { Home } from './pages/Home';
import { Convert } from './pages/Convert';
import { Compress } from './pages/Compress';
import { ImageToImage } from './pages/ImageToImage';
import { ImageToPDF } from './pages/ImageToPDF';
import { PDFToImage } from './pages/PDFToImage';
import { ImageCompress } from './pages/ImageCompress';
import { PDFCompress } from './pages/PDFCompress';
import { NotFound } from './pages/NotFound';

export default function App() {
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    document.documentElement.style.colorScheme = storedTheme === 'dark' ? 'dark' : 'light';
  }, []);

  return (
    <Router>
      <div id="app-wrapper" className="flex flex-col" style={{ minHeight: '100vh' }}>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}
