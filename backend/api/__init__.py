from flask import current_app

from .convert_routes import router as convert
from .health_routes import router as health
from .compress_routes import router as compress

def handle_server_error(message, e):
  print(f'{message}: {e}')
  if current_app.config.get('DEBUG'):
    return { 'error': f'{message} - {e}' }, 500
  return { 'error': f'{message}. Please try again.' }, 500

def register_blueprints(app):
  app.register_blueprint(convert, url_prefix='/convert')
  app.register_blueprint(compress, url_prefix='/compress')

  # Register health check routes
  app.register_blueprint(health)
