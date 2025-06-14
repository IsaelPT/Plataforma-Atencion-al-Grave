import os
from dotenv import load_dotenv

# Cargar las variables de entorno desde el archivo .env
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path)
ruta_csv = os.getenv("RUTA_DFCENTROIDES_CSV")
RUTA_DFCENTROIDES_CSV = os.path.join(os.path.dirname(__file__), '..', ruta_csv)
print(f"RUTA_DFCENTROIDES_CSV: {RUTA_DFCENTROIDES_CSV}")