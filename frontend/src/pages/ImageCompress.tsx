import { CompressForm } from "../components/CompressForm";
import { API_BASE } from "../config";

export const ImageCompress: React.FC = () => (
  <CompressForm
    title="Compress Image"
    apiUrl={`${API_BASE}/compress/image`}
    downloadPrefix="compressed"
  />
);
