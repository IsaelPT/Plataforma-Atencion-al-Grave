from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import httpx
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

# Cargar variables de entorno desde .env
load_dotenv()

app = FastAPI(title="API Gateway - Plataforma Atención al Grave")

# Permitir CORS para desarrollo (ajusta origins si es necesario)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # O especifica ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuración del microservicio (ajusta la URL según docker compose o entorno)
MICROSERVICE_URL = os.getenv("SIMUCI_MICROSERVICE_URL", "http://simuci:8000")
TIMEOUT = float(os.getenv("GATEWAY_TIMEOUT", 10))  # Timeout en segundos

@app.api_route("/simuci/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH"])
async def proxy_simuci(path: str, request: Request):
    # Ya no es necesario mapear rutas legacy, el frontend usa los nuevos endpoints
    url = f"{MICROSERVICE_URL}/{path}"
    method = request.method
    headers = dict(request.headers)
    body = await request.body()
    try:
        async with httpx.AsyncClient(timeout=TIMEOUT) as client:
            response = await client.request(
                method,
                url,
                headers=headers,
                content=body,
                params=dict(request.query_params),
            )
        return JSONResponse(status_code=response.status_code, content=response.json())
    except httpx.RequestError as exc:
        return JSONResponse(status_code=504, content={"success": False, "error": f"Microservicio SimUCI no disponible: {str(exc)}"})

@app.get("/")
def root():
    return {"message": "API Gateway running"}
