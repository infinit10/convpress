import os

class Config:
  DEBUG = os.environ.get('FLASK_DEBUG', '0') == '1'
  SUPPORTED_IMAGE_FORMATS = ['jpg', 'jpeg', 'png']
  SUPPORTED_COMPRESSION_LEVELS = ['low', 'medium', 'high']