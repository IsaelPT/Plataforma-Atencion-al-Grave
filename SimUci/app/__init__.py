from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from starlette.status import HTTP_500_INTERNAL_SERVER_ERROR
import logging
import os
from pydantic_settings import BaseSettings
from app.routes.simulation_router import simulation_router
from app.routes.sim_patient_router import sim_patient_router
from app.routes.patient_router import patient_router

# 7. Validación de variables de entorno
class Settings(BaseSettings):
    # =========== RUTAS NECESARIAS ===============
    RUTA_DFCENTROIDES_CSV: str = os.getenv("RUTA_DFCENTROIDES_CSV", "")

    # =========== VARIABLES NECESARIAS ===========
    VARIABLES_EXPERIMENTO: str = os.getenv("VARIABLES_EXPERIMENTO", "")

    # =========== CONFIGURACIÓN GENERAL ===========
    ENV: str = os.getenv("ENV", "development")
    ALLOWED_ORIGINS: str = os.getenv("ALLOWED_ORIGINS", "*")

    # =========== MONGODB CONNECTION =============
    MONGO_HOST: str = os.getenv("MONGO_HOST", "")
    MONGO_PORT: str = os.getenv("MONGO_PORT", "")
    MONGO_DB: str = os.getenv("MONGO_DB", "")
    MONGO_USER: str = os.getenv("MONGO_USER", "")  # Puede estar comentado en .env
    MONGO_PASS: str = os.getenv("MONGO_PASS", "")  # Puede estar comentado en .env

    class Config:
        env_file = ".env"

settings = Settings()

# 6. Logging estructurado
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s %(message)s",
)
logger = logging.getLogger("simuci")

# 1. Documentación OpenAPI personalizada
app = FastAPI(
    title="SimUCI Microservicio",
    description="Microservicio para simulación y gestión de pacientes críticos.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# 5. CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.ALLOWED_ORIGINS] if settings.ALLOWED_ORIGINS != "*" else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Manejo global de errores
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled error: {exc}")
    return JSONResponse(
        status_code=HTTP_500_INTERNAL_SERVER_ERROR,
        content={"success": False, "error": str(exc)},
    )

# 3. Endpoint healthcheck
@app.get("/health", tags=["Health"])
async def health():
    return {"status": "ok"}

app.include_router(router=simulation_router, tags=["Simulation"])
app.include_router(router=sim_patient_router, tags=["Sim_Patient"])
app.include_router(router=patient_router, tags=["Patient"],)