from pydantic import BaseModel, Field

from app.models.Sim_Pacient import SimPacient


class Simulation(BaseModel):
    id: int = Field(..., alias="_id")
    nombre: str = Field(..., min_length=1, max_length=100)
    sim_pacients: list[SimPacient]

    class Config:
        orm_mode = True
        allow_population_by_field_name = True
        json_encoders = {SimPacient: lambda v: v.model_dump()}
