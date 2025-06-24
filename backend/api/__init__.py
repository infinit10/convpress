from .convert_routes import router as convert
from .health_routes import router as health
from .compress_routes import router as compress

def register_blueprints(app):
  app.register_blueprint(convert, url_prefix='/convert')
  app.register_blueprint(compress, url_prefix='/compress')

  # Register health check routes
  app.register_blueprint(health)
