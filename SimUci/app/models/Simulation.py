from pydantic import BaseModel, Field, model_validator
from app.models.Sim_Patient import SimPatient
from typing import Optional
from bson import ObjectId


class Simulation(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    id_pacient: Optional[str] = Field(None)
    nombre: str = Field(..., min_length=1, max_length=100)
    sim_patients: list[SimPatient]

    @model_validator(mode="before")
    @classmethod
    def generate_id_if_zero(cls, values):
        if '_id' in values and values['_id'] == 0:
            values['_id'] = str(ObjectId())
        return values

    class Config:
        orm_mode = True
        allow_population_by_field_name = True
        json_encoders = {
            SimPatient: lambda v: v.model_dump()
        }
