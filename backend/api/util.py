from flask import current_app

def handle_server_error(message, e):
  print(f'{message}: {e}')
  if current_app.config.get('DEBUG'):
    return { 'error': f'{message} - {e}' }, 500
  return { 'error': f'{message}. Please try again.' }, 500
