from pydantic import BaseModel, Field, model_validator
from typing import Optional
from bson import ObjectId

class Predict_Patient(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    edad: int = Field(..., ge=14, le=90)
    diag_ing1: int = Field(..., ge=0, le=40)
    diag_ing2: int = Field(..., ge=0, le=40)
    diag_egr2: int = Field(..., ge=0, le=40)
    apache: int = Field(..., ge=0, le=36)
    tiempo_vam: int = Field(...)

    @model_validator(mode="before")
    @classmethod
    def generate_id_if_zero(cls, values):
        if '_id' in values and values['_id'] == 0:
            values['_id'] = str(ObjectId())
        return values
