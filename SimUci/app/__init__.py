from fastapi import FastAPI
from app.routes.simulation_router import simulation_router
from app.routes.sim_pacient_router import sim_pacient_router
from app.routes.pacient_router import pacient_router

app = FastAPI()

app.include_router(router=simulation_router, tags=["Simulation"])
app.include_router(router=sim_pacient_router, tags=["Sim_Pacient"])
app.include_router(router=pacient_router, tags=["Pacient"],)