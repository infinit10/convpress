from PIL import Image
from io import BytesIO

format_mapping = {
  "jpg": "JPEG",
  "jpeg": "JPEG",
  "png": "PNG",
  "webp": "WEBP"
}

quality_mapping = {
  "low": 30,
  "medium": 50,
  "high": 80
}

def convert_image_to_image(file, fmt: str):
  fmt = fmt.lower()
  if fmt not in format_mapping:
    raise ValueError("Unsupported format")

  img = Image.open(file.stream).convert("RGB")
  output = BytesIO()
  img.save(output, format=format_mapping[fmt])
  output.seek(0)

  return output, f"image/{fmt}", f"converted.{fmt}"

def convert_image_to_pdf(file):
  margin = 50
  img = Image.open(file.stream).convert("RGB")
  
  new_width = img.width + 2 * margin
  new_height = img.height + 2 * margin
  
  background = Image.new("RGB", (new_width, new_height), 'white')
  background.paste(img, (margin, margin))

  output = BytesIO()
  img.save(output, format="PDF")
  output.seek(0)

  return output, "application/pdf", "converted.pdf"

def compress_image(file, file_format: str, quality: str = 'medium'):
  img = Image.open(file.stream).convert("RGB")
  
  output = BytesIO()
  
  save_kwargs = {
    'optimize': True
  }
  
  if (file_format in ['jpg', 'jpeg']):
    save_kwargs['quality'] = quality_mapping[quality]
  elif file_format == 'png':
    save_kwargs['compress_level'] = 6
    
  img.save(output, format=format_mapping[file_format], **save_kwargs)
  output.seek(0)
  
  return output, f"image/{file_format}", f"compressed.{file_format}"
