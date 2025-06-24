from flask import Flask
from flask_cors import CORS
from config import Config

from api import register_blueprints

app = Flask(__name__)
CORS(app)

# Load app configuration from Config class
app.config.from_object(Config)

# Register routes for the application
register_blueprints(app)