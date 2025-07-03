from bson import ObjectId
from fastapi import APIRouter, Body, Query
from fastapi.responses import JSONResponse

from helpers.experiment_helpers import multiple_replication

from simulation_model.Experiment import Experiment
from preidiction_model.Prediction import Prediction

from app.models.Patient import Patient
from app.models.Sim_Patient import SimPatient
from app.models.Predict_Patient import Predict_Patient
from app.models.Simulation import Simulation

from stadistical_comparison.Wilcoxon import Wilcoxon
from stadistical_comparison.Friedman import Friedman
from stadistical_comparison.StatsUtils import StatsUtils

import pandas as pd
import numpy as np

from typing import List

simulation_router = APIRouter(prefix="/simulation")

@simulation_router.post("", response_model=Simulation)
async def simulate(patient: Patient):
    # Realizar experimento
    experiment: Experiment = Experiment(
        patient.edad, patient.diag1, patient.diag2, patient.diag3, patient.diag4,
        patient.apache, patient.ins_res, patient.vent_art, patient.est_uti,
        patient.tmp_vam, patient.tmp_est_pre_uti, patient.por
    )

    df: pd.DataFrame = multiple_replication(experiment, patient.n_reps)
    # Renombrar columnas para que coincidan con el modelo SimPatient
    df = df.rename(columns={
        "Tiempo Pre VAM": "tiempo_pre_vam",
        "Tiempo VAM": "tiempo_vam",
        "Tiempo Post VAM": "tiempo_post_vam",
        "Estadia UCI": "estadia_uci",
        "Estadia Post UCI": "estadia_post_uci"
    })
    # Solo devolver los campos del modelo SimPatient
    sim_patients = df[[
        "tiempo_pre_vam", "tiempo_vam", "tiempo_post_vam", "estadia_uci", "estadia_post_uci"
    ]].to_dict(orient="records")
    
    data = {
        "_id" : str(ObjectId()),  # Generar un nuevo ID único
        "id_pacient" : patient.id,
        "nombre" : f"Paciente: {patient.id[-10]}",
        "sim_patients": sim_patients
        }
    sim = Simulation(**data)
    return JSONResponse(content={"success": True, "data": sim.model_dump(by_alias=True)})

@simulation_router.post("/wilcoxon")
async def wilcoxon_test(
    x: List[SimPatient],
    y: List[SimPatient],
    field: str = Query(..., description="Campo a comparar (ej: tiempo_vam)")
):
    x_values = [getattr(p, field) for p in x]
    y_values = [getattr(p, field) for p in y]
    wilcoxon_test: Wilcoxon = Wilcoxon()
    wilcoxon_test.test(x_values, y_values)
    return JSONResponse(content={
        "success": True,
        "statistic": wilcoxon_test.statistic,
        "p_value": wilcoxon_test.p_value
    })

@simulation_router.post("/friedman")
async def friedman_test(
    samples: List[List[SimPatient]],
    field: str = Query(..., description="Campo a comparar (ej: tiempo_vam)")
):
    data = []
    for sample in samples:
        data.append([getattr(p, field) for p in sample])
    friedman = Friedman()
    friedman.test(*data)
    return JSONResponse(content={
        "success": True,
        "statistic": friedman.statistic,
        "p_value": friedman.p_value
    })

@simulation_router.post("/stats")
async def stats_for_simulation(simulation: Simulation):
    simpatients = [SimPatient.model_validate(p) for p in simulation.sim_patients]
    tiempo_pre_vam = [p.tiempo_pre_vam for p in simpatients]
    tiempo_post_vam = [p.tiempo_post_vam for p in simpatients]
    estadia_uci = [p.estadia_uci for p in simpatients]
    estadia_post_uci = [p.estadia_post_uci for p in simpatients]
    timempo_vam = [p.tiempo_vam for p in simpatients]
    response_data = [{
        "variable": "tiempo_pre_vam",
        "mean": float(np.mean(tiempo_pre_vam)),
        "std": float(np.std(tiempo_pre_vam, ddof=1)),
        "min": float(np.min(tiempo_pre_vam)),
        "max": float(np.max(tiempo_pre_vam)),
        "ciLower": float(StatsUtils.confidenceinterval(np.mean(tiempo_pre_vam), np.std(tiempo_pre_vam, ddof=1), len(tiempo_pre_vam))[0]),
        "ciUpper": float(StatsUtils.confidenceinterval(np.mean(tiempo_pre_vam), np.std(tiempo_pre_vam, ddof=1), len(tiempo_pre_vam))[1])
    },{
        "variable": "tiempo_post_vam",
        "mean": float(np.mean(tiempo_post_vam)),
        "std": float(np.std(tiempo_post_vam, ddof=1)),
        "min": float(np.min(tiempo_post_vam)),
        "max": float(np.max(tiempo_post_vam)),
        "ciLower": float(StatsUtils.confidenceinterval(np.mean(tiempo_post_vam), np.std(tiempo_post_vam, ddof=1), len(tiempo_post_vam))[0]),
        "ciUpper": float(StatsUtils.confidenceinterval(np.mean(tiempo_post_vam), np.std(tiempo_post_vam, ddof=1), len(tiempo_post_vam))[1])
    },{
        "variable": "estadia_uci",
        "mean": float(np.mean(estadia_uci)),
        "std": float(np.std(estadia_uci, ddof=1)),
        "min": float(np.min(estadia_uci)),
        "max": float(np.max(estadia_uci)),
        "ciLower": float(StatsUtils.confidenceinterval(np.mean(estadia_uci), np.std(estadia_uci, ddof=1), len(estadia_uci))[0]),
        "ciUpper": float(StatsUtils.confidenceinterval(np.mean(estadia_uci), np.std(estadia_uci, ddof=1), len(estadia_uci))[1])
    },{
        "variable": "estadia_post_uci",
        "mean": float(np.mean(estadia_post_uci)),
        "std": float(np.std(estadia_post_uci, ddof=1)),
        "min": float(np.min(estadia_post_uci)),
        "max": float(np.max(estadia_post_uci)),
        "ciLower": float(StatsUtils.confidenceinterval(np.mean(estadia_post_uci), np.std(estadia_post_uci, ddof=1), len(estadia_post_uci))[0]),
        "ciUpper": float(StatsUtils.confidenceinterval(np.mean(estadia_post_uci), np.std(estadia_post_uci, ddof=1), len(estadia_post_uci))[1])
    },{
        "variable": "tiempo_vam",
        "mean": float(np.mean(timempo_vam)),
        "std": float(np.std(timempo_vam, ddof=1)),
        "min": float(np.min(timempo_vam)),
        "max": float(np.max(timempo_vam)),
        "ciLower": float(StatsUtils.confidenceinterval(np.mean(timempo_vam), np.std(timempo_vam, ddof=1), len(timempo_vam))[0]),
        "ciUpper": float(StatsUtils.confidenceinterval(np.mean(timempo_vam), np.std(timempo_vam, ddof=1), len(timempo_vam))[1])
    }]
    return JSONResponse(content={
        "success": True,
        "result": response_data
    })

@simulation_router.post("/predict")
async def predict(patient: Predict_Patient):
    model = Prediction()
    prediction = model.predict(patient)
    return JSONResponse(content={
        "success": True,
        "predicted_class": prediction[0],
        "predicted_probability": prediction[1]
    })