from flask import Blueprint, request, send_file, current_app
import os

from services import image_service
from services import doc_service

router = Blueprint('convert', __name__)

@router.post('/img2img')
def convert_image():
  try:
    if 'file' not in request.files:
      return {'error': 'No file part in request'}, 400

    file = request.files['file']
    if file.filename == '':
      return {'error': 'No selected file'}, 400
    
    file_ext = os.path.splitext(file.filename)[1][1:]
    format = request.args.get('format').lower()

    if not format:
      return { 'error': 'No output format specified. Please provide a valid format.' }, 400
    
    if file_ext == format:
      return { 'error': 'Input file format and requested output format are the same. No conversion needed.' }, 400
    
    SUPPORTED_IMAGE_FORMATS = current_app.config['SUPPORTED_IMAGE_FORMATS']
    
    if file_ext not in SUPPORTED_IMAGE_FORMATS or format not in SUPPORTED_IMAGE_FORMATS:
      return { 'error': f"Input or output file format is invalid. Expected one of {', '.join(SUPPORTED_IMAGE_FORMATS)}" }, 400
  
    stream, content_type, new_filename = image_service.convert_image_to_image(file, format)
    
    return send_file(
      stream,
      mimetype=content_type,
      as_attachment=True,
      download_name=new_filename
    )
  except Exception as e:
    return { 'error': f'Error while converting image - ${e}'}, 500

@router.post('/img2pdf')
def convert_image_to_pdf():
  try:
    print(request.files)
    if 'file' not in request.files:
      return {'error': 'No file part in request'}, 400

    file = request.files['file']
    if file.filename == '':
      return {'error': 'No selected file'}, 400

    file_ext = os.path.splitext(file.filename)[1][1:]

    if file_ext == 'pdf':
      return { 'error': 'Input file is already an PDF. No conversion needed.' }, 400
    
    SUPPORTED_IMAGE_FORMATS = current_app.config['SUPPORTED_IMAGE_FORMATS']
    
    if file_ext not in SUPPORTED_IMAGE_FORMATS:
      return { 'error': f"Input file format is invalid. Expected one of {', '.join(SUPPORTED_IMAGE_FORMATS)}" }, 400
    
    stream, content_type, new_filename = image_service.convert_image_to_pdf(file)
    
    return send_file(
      stream,
      mimetype=content_type,
      as_attachment=True,
      download_name=new_filename
    )
  except Exception as e:
    return { 'error': f'Error while converting image to PDF - ${e}'}, 500

@router.post('/pdf2img')
def convert_pdf_to_images():
  try:
    if 'file' not in request.files:
      return {'error': 'No file part in request'}, 400

    file = request.files['file']
    if file.filename == '':
      return {'error': 'No selected file'}, 400
    
    file_ext = os.path.splitext(file.filename)[1][1:]
    format = request.args.get('format')
    
    if not format:
      return { 'error': 'No output format specified. Please provide a valid format.' }, 400

    if file_ext != 'pdf':
      return { 'error': 'Input file format is invalid. Expected PDF' }, 400
    
    stream, content_type, new_filename = doc_service.convert_pdf_to_images(file, format)
    
    return send_file(
      stream,
      mimetype=content_type,
      as_attachment=True,
      download_name=new_filename
    )
  except Exception as e:
    return { 'error': f'Error while converting PDF to images - ${e}'}, 500
