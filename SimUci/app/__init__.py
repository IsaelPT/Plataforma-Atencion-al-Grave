from fastapi import FastAPI
from app.routes.simulation_router import simulation_router

app = FastAPI()

app.include_router(router=simulation_router)