from fastapi import APIRouter, Body
from SimUci.helpers.experiment_helpers import multiple_replication
from SimUci.simulation_model.Experiment import Experiment

import pandas as pd

simulation_router = APIRouter(prefix="/simulation")

@simulation_router.post("", response_model=list)
async def simulate(edad: int = Body(...), diag1: int = Body(...),
            diag2: int = Body(...), diag3: int = Body(...),
            diag4: int = Body(...), apache: int = Body(...), 
            ins_res: int = Body(...), vent_art: int = Body(...),
            est_uti: int = Body(...), tmp_vam: int = Body(...), 
            tmp_est_pre_uti: int = Body(...), por: int = 10, n_reps: int = 100) -> list[dict]   :
    
    experiment: Experiment = Experiment(edad, diag1, diag2, diag3, diag4,
                        apache, ins_res, vent_art, est_uti,
                        tmp_vam, tmp_est_pre_uti, por)

    df: pd.DataFrame = multiple_replication(experiment, n_reps)
    return df.to_dict(orient="records")

