from fastapi import APIRouter, Body, Query

from helpers.experiment_helpers import multiple_replication

from simulation_model.Experiment import Experiment
from preidiction_model.Prediction import Prediction

from app.models.Pacient import Pacient
from app.models.Sim_Pacient import SimPacient
from app.models.Predict_Pacient import Predict_Pacient
from app.models.Simulation import Simulation

from stadistical_comparison.Wilcoxon import Wilcoxon
from stadistical_comparison.Friedman import Friedman
from stadistical_comparison.StatsUtils import StatsUtils

import pandas as pd
import numpy as np

from typing import List

simulation_router = APIRouter(prefix="/simulation")

@simulation_router.post("", response_model=Simulation)
async def simulate(pacient: Pacient) -> list[dict]:
    # Realizar experimento
    experiment: Experiment = Experiment(
        pacient.edad, pacient.diag1, pacient.diag2, pacient.diag3, pacient.diag4,
        pacient.apache, pacient.ins_res, pacient.vent_art, pacient.est_uti,
        pacient.tmp_vam, pacient.tmp_est_pre_uti, pacient.por
    )

    df: pd.DataFrame = multiple_replication(experiment, pacient.n_reps)
    # Renombrar columnas para que coincidan con el modelo SimPacient
    df = df.rename(columns={
        "Tiempo Pre VAM": "tiempo_pre_vam",
        "Tiempo VAM": "tiempo_vam",
        "Tiempo Post VAM": "tiempo_post_vam",
        "Estadia UCI": "estadia_uci",
        "Estadia Post UCI": "estadia_post_uci"
    })
    # Solo devolver los campos del modelo SimPacient
    sim_pacients = df[[
        "tiempo_pre_vam", "tiempo_vam", "tiempo_post_vam", "estadia_uci", "estadia_post_uci"
    ]].to_dict(orient="records")
    
    data = {"_id" : pacient.id, "sim_pacients": sim_pacients}

    return Simulation(**data)

@simulation_router.post("/wilcoxon")
async def wilcoxon_test(
    x: List[SimPacient],
    y: List[SimPacient],
    field: str = Query(..., description="Campo a comparar (ej: tiempo_vam)")
):
    x_values = [getattr(p, field) for p in x]
    y_values = [getattr(p, field) for p in y]
    wilcoxon_test: Wilcoxon = Wilcoxon()
    wilcoxon_test.test(x_values, y_values)
    return {
        "statistic": wilcoxon_test.statistic,
        "p_value": wilcoxon_test.p_value
    }

@simulation_router.post("/friedman")
async def friedman_test(
    samples: List[List[SimPacient]],
    field: str = Query(..., description="Campo a comparar (ej: tiempo_vam)")
):
    data = []
    for sample in samples:
        data.append([getattr(p, field) for p in sample])
    friedman = Friedman()
    friedman.test(*data)
    return {
        "statistic": friedman.statistic,
        "p_value": friedman.p_value
    }

@simulation_router.post("/intervals-confidence")
async def confidence_intervals(data:list[float] = Body(..., description="Lista de datos para calcular los intervalos de confianza")):
    mean: float = np.mean(data)
    std: float = np.std(data, ddof=1)
    result: tuple = StatsUtils.confidenceinterval(mean, std, len(data))
    return {
    "lower_bound": result[0],
    "upper_bound": result[1],
    }

@simulation_router.post("/predict")
async def predict(pacient: Predict_Pacient):
    model = Prediction()
    prediction = model.predict(pacient)
    return {
        "predicted_class": prediction[0],
        "predicted_probability": prediction[1]
    }