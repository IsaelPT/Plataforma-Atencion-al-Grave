from pydantic import BaseModel, Field, model_validator
from typing import Optional
from bson import ObjectId

class Patient(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    edad: int = Field(..., ge=14, le=90)
    diag1: int = Field(..., ge=0, le=40)
    diag2: int = Field(..., ge=0, le=40)
    diag3: int = Field(..., ge=0, le=40)
    diag4: int = Field(..., ge=0, le=40)
    apache: int = Field(..., ge=0, le=36)
    ins_res: int = Field(..., ge=0, le=5)
    vent_art: int = Field(..., ge=0, le=2)
    est_uti: int = Field(..., ge=0)
    tmp_vam: int = Field(..., ge=0)
    tmp_est_pre_uti: int = Field(...)
    por: int = Field(...)
    n_reps: int = Field(...)

    @model_validator(mode="before")
    @classmethod
    def generate_id_if_zero(cls, values):
        if '_id' in values and values['_id'] == 0:
            values['_id'] = str(ObjectId())
        return values


