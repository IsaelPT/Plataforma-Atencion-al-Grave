from fastapi import APIRouter
from fastapi.responses import JSONResponse

from app.database.mongo import db

from app.models.Patient import Patient

patient_router = APIRouter(prefix="/patient")

@patient_router.get("/all", response_model=list[Patient])
async def get_all_patients():
    patients = list(db.patients.find())
    data = [Patient(**patient).model_dump(by_alias=True) for patient in patients] if patients else []
    return JSONResponse(content={"success": True, "data": data})

@patient_router.get("", response_model=Patient)
async def get_patient(id: str):
    patient = db.patients.find_one({"_id": id})
    if patient:
        return JSONResponse(content={"success": True, "data": Patient(**patient).model_dump(by_alias=True)})
    else:
        return JSONResponse(status_code=404, content={"success": False, "error": "Patient not found"})

@patient_router.post("")
async def create_patient(patient: Patient):
    db.patients.insert_one(patient.model_dump(by_alias=True))
    return JSONResponse(status_code=201, content={"success": True, "message": "Patient created successfully"})




