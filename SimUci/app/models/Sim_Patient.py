from pydantic import BaseModel, Field

class SimPatient(BaseModel):
    tiempo_pre_vam: int = Field(...)
    tiempo_vam: int = Field(...)
    tiempo_post_vam: int = Field(...)
    estadia_uci: int = Field(...)
    estadia_post_uci: int = Field(...)
