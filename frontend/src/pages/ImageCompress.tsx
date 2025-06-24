import { CompressPage } from "../components/CompressComponent";

export const ImageCompress: React.FC = () => (
  <CompressPage
    title="Compress Image"
    apiUrl="http://localhost:5000/compress/image"
    downloadPrefix="compressed"
  />
);