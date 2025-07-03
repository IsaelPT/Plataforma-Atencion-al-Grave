from fastapi import APIRouter
from fastapi.responses import JSONResponse

from bson import ObjectId

from app.database.mongo import db

from app.models.Simulation import Simulation

sim_patient_router = APIRouter(prefix="/sim_patient")

@sim_patient_router.get("/all", response_model=list[Simulation])
async def get_all_patients(id: str):
    sims = db.sim_patients.find({"id_pacient": id})
    result = [Simulation(**sim) for sim in sims]
    return JSONResponse(content={"success": True,
                                  "data": [sim.model_dump(by_alias=True) for sim in result]
                                },
                        status_code=200)

@sim_patient_router.post("")
async def create_patient(patient: Simulation):
    db.sim_patients.insert_one(patient.model_dump(by_alias=True))
    return JSONResponse(status_code=201, content={"success": True, "message": "Simulation saved successfully"})