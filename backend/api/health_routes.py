import os
from flask import Blueprint

router = Blueprint('health', __name__)

@router.get('/knockknock')
def health_check():
  return { 'message': 'Who is there?' }

@router.get('/ping')
def system_check():
  cpu_count = os.cpu_count()
  os_details = os.uname()

  return { 
    'cpus': cpu_count,
    'os': os_details.sysname,
    'arch': os_details.machine
  }