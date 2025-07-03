# API Gateway - Plataforma Atención al Grave

Este API Gateway está construido con FastAPI y sirve como punto de entrada para enrutar las peticiones al microservicio SimUCI.

## Estructura
- `main.py`: Código principal del gateway.
- `requirements.txt`: Dependencias necesarias.

## Uso

1. Instala las dependencias:
   ```bash
   pip install -r requirements.txt
   ```
2. Ejecuta el gateway:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8080
   ```
3. Todas las rutas `/simuci/*` serán redirigidas al microservicio SimUCI.

## Variables de entorno
- `SIMUCI_MICROSERVICE_URL`: URL base del microservicio SimUCI (por defecto: `http://simuci:8000`).
