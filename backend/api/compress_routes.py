from flask import Blueprint, request, send_file, current_app
import os

from services import image_service
from services import doc_service

router = Blueprint('compress', __name__)

@router.post('/image')
def compress_image():
  if 'file' not in request.files:
    return {'error': 'No file part in request'}, 400

  file = request.files['file']
  if file.filename == '':
    return {'error': 'No selected file'}, 400
  
  file_ext = os.path.splitext(file.filename)[1][1:].lower()

  # Check if valid file is uploaded
  SUPPORTED_IMAGE_FORMATS = current_app.config['SUPPORTED_IMAGE_FORMATS']
  if file_ext not in SUPPORTED_IMAGE_FORMATS:
    return { 'error': f"Input file format is invalid. Expected one of {', '.join(SUPPORTED_IMAGE_FORMATS)}" }, 400
  
  # Check if compression quality is supported
  SUPPORTED_COMPRESSION_LEVELS = current_app.config['SUPPORTED_COMPRESSION_LEVELS']
  quality = request.args.get('quality', 'medium', type=str)
  
  if quality not in SUPPORTED_COMPRESSION_LEVELS:
    return {'error': f"Invalid compression quality. Expected one of {', '.join(SUPPORTED_COMPRESSION_LEVELS)}"}, 400
  
  try:
    stream, content_type, new_filename = image_service.compress_image(file, file_format=file_ext, quality=quality)
    
    return send_file(
      stream,
      mimetype=content_type,
      as_attachment=True,
      download_name=new_filename
    )
  except Exception as e:
    return { 'error': f'Error while compressing file - {e}' }, 500
  
@router.post('/pdf')
def compress_pdf():
  if 'file' not in request.files:
    return { 'error': 'No file part in request' }, 400

  file = request.files['file']
  if file.filename == '':
    return { 'error': 'No selected file' }, 400
  
  file_ext = os.path.splitext(file.filename)[1][1:]
  
  # Check if valid file is uploaded
  if file_ext != 'pdf':
    return { 'error': 'Input file is not a PDF. Please upload a valid PDF file.' }, 400
  
  # Check if compression quality is supported
  SUPPORTED_COMPRESSION_LEVELS = current_app.config['SUPPORTED_COMPRESSION_LEVELS']
  quality = request.args.get('quality', 'medium', type=str)

  if quality not in SUPPORTED_COMPRESSION_LEVELS:
    return {'error': f"Invalid compression quality. Expected one of {', '.join(SUPPORTED_COMPRESSION_LEVELS)}"}, 400
  
  try:
    result = doc_service.compress_pdf(file, quality=quality)
    
    if isinstance(result, tuple):
      output_path, content_type, new_filename = result
      return send_file(
        output_path,
        mimetype=content_type,
        as_attachment=True,
        download_name=new_filename
      )
      
    return result
  except Exception as e:
    return {'error': f'Error while compressing PDF - {e}'}, 500