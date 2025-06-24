import fitz # PyMuPDF
import zipfile
from io import BytesIO
import tempfile, os, subprocess

quality_mapping = {
  'low': '/screen',
  'medium': '/ebook',
  'high': '/printer'
}

def convert_pdf_to_images(file, format: str):
  fmt = format.lower()

  doc = fitz.open(stream=file.read(), filetype='pdf')

  # Convert pages to images
  images = []
  for page_number in range(len(doc)):
    page = doc.load_page(page_number)
    pix = page.get_pixmap(dpi=150)
    img_data = pix.tobytes(fmt)
    images.append(img_data)
  
  # Single page PDF, return image directly
  if len(images) == 1:
    output = BytesIO(images[0])
    output.seek(0)
    
    return output, f'image/{fmt}', f'converted.{fmt}'
  
  # Multi-page PDF, return as zip
  zip_buffer = BytesIO()
  
  with zipfile.ZipFile(zip_buffer, 'w') as zip_file:
    for i, image in enumerate(images):
      zip_file.writestr(f'image_{i + 1}.{fmt}', image)
      
  zip_buffer.seek(0)
  
  return zip_buffer, 'application/zip', 'converted_images.zip'

def compress_pdf(file, quality: str = 'medium'):
  try:
    with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as temp_input:
      file.save(temp_input.name)
      
    base, _ = os.path.splitext(temp_input.name)
    output_path = base + '_compressed.pdf'
    
    subprocess.run([
      "gs",
      "-sDEVICE=pdfwrite",
      "-dCompatibilityLevel=1.4",
      f"-dPDFSETTINGS={quality_mapping[quality]}",
      "-dNOPAUSE",
      "-dQUIET",
      "-dBATCH",
      f"-sOutputFile={output_path}",
      temp_input.name
    ], check=True)
    
    return output_path, 'application/pdf', f'{os.path.basename(base)}_compressed.pdf'

  except subprocess.CalledProcessError as e:
    return {"error": f"PDF compression failed: {e}"}, 500

  finally:
    # Clean up temp files
    try:
      os.remove(temp_input.name)
    except Exception:
        pass
