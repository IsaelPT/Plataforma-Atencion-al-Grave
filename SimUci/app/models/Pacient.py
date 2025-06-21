from pydantic import BaseModel, Field

class Pacient(BaseModel):
    id: int = Field(..., alias="_id")
    edad: int = Field(..., ge=14, le=90)
    diag1: int = Field(..., ge=0, le=40)
    diag2: int = Field(..., ge=0, le=40)
    diag3: int = Field(..., ge=0, le=40)
    diag4: int = Field(..., ge=0, le=40)
    apache: int = Field(..., ge=0, le=36)
    ins_res: int = Field(..., ge=0, le=5)
    vent_art: int = Field(..., ge=24)
    est_uti: int = Field(..., ge=0)
    tmp_vam: int = Field(..., ge=0)
    tmp_est_pre_uti: int = Field(...)
    por: int = Field(...)
    n_reps: int = Field(...)

