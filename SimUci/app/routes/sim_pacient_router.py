from fastapi import APIRouter
from fastapi.responses import HTMLResponse

from bson import ObjectId

from app.database.mongo import db

from app.models.Simulation import Simulation

sim_pacient_router = APIRouter(prefix="/sim_pacient")

@sim_pacient_router.get("/all", response_model=list[Simulation])
async def get_all_pacients(id: int):
    sims = db.sim_pacients.find({"_id": id})
    
    return [Simulation(**sim) for sim in sims]

@sim_pacient_router.post("")
async def create_pacient(pacient: Simulation):
    db.sim_pacients.insert_one(pacient.model_dump(by_alias=True))
    return HTMLResponse(status_code=201, content="Simulation saved successfully")