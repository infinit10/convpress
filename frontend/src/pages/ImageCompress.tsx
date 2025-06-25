import { CompressForm } from "../components/CompressForm";

export const ImageCompress: React.FC = () => (
  <CompressForm
    title="Compress Image"
    apiUrl="http://localhost:5000/compress/image"
    downloadPrefix="compressed"
  />
);
