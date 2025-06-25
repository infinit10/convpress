import { CompressForm } from "../components/CompressForm";

export const PDFCompress: React.FC = () => (
  <CompressForm
    title="Compress PDF"
    apiUrl="http://localhost:5000/compress/pdf"
    downloadPrefix="compressed"
  />
);
