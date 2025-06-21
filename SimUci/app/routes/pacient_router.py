from fastapi import APIRouter
from fastapi.responses import HTMLResponse

from app.database.mongo import db

from app.models.Pacient import Pacient

pacient_router = APIRouter(prefix="/pacient")

@pacient_router.get("/all", response_model=list[Pacient])
async def get_all_pacients():
    pacients = list(db.pacients.find())
    return [Pacient(**pacient) for pacient in pacients] if pacients else []

@pacient_router.get("", response_model=Pacient)
async def get_pacient(id: int):
    pacient = db.pacients.find_one({"id": id})
    return Pacient(**pacient) if pacient else None

@pacient_router.post("")
async def create_pacient(pacient: Pacient):
    db.pacients.insert_one(pacient.model_dump(by_alias=True))
    return HTMLResponse(status_code=201, content="Pacient created successfully")




