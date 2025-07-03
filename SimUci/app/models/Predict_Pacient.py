from pydantic import BaseModel, Field


class Predict_Pacient(BaseModel):
    id: int = Field(..., alias="_id")
    edad: int = Field(..., ge=14, le=90)
    diag_ing1: int = Field(..., ge=0, le=40)
    diag_ing2: int = Field(..., ge=0, le=40)
    diag_egr2: int = Field(..., ge=0, le=40)
    apache: int = Field(..., ge=0, le=36)
    tiempo_vam: int = Field(
        ...,
    )
