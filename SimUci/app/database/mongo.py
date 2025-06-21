import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Cargar variables de entorno desde la ruta absoluta del .env
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ENV_PATH = os.path.join(BASE_DIR, '..', '.env')
load_dotenv(dotenv_path=os.path.abspath(ENV_PATH))

MONGO_HOST = os.getenv("MONGO_HOST")
MONGO_PORT = int(os.getenv("MONGO_PORT"))
MONGO_DB = os.getenv("MONGO_DB")
MONGO_USER = os.getenv("MONGO_USER")
MONGO_PASS = os.getenv("MONGO_PASS")

if MONGO_USER:
    # Si el password es vacío, igual se debe pasar en la URI
    mongo_uri = f"mongodb://{MONGO_USER}:{MONGO_PASS}@{MONGO_HOST}:{MONGO_PORT}/{MONGO_DB}?authSource=admin"
else:
    mongo_uri = f"mongodb://{MONGO_HOST}:{MONGO_PORT}/{MONGO_DB}"

client = MongoClient(mongo_uri)
db = client[MONGO_DB]
