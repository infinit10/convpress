import { CompressPage } from "../components/CompressComponent";

export const PDFCompress: React.FC = () => (
  <CompressPage
    title="Compress PDF"
    apiUrl="http://localhost:5000/compress/pdf"
    downloadPrefix="compressed"
  />
);