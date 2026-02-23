import { CompressForm } from "../components/CompressForm";
import { API_BASE } from "../config";

export const PDFCompress: React.FC = () => (
  <CompressForm
    title="Compress PDF"
    apiUrl={`${API_BASE}/compress/pdf`}
    downloadPrefix="compressed"
  />
);
