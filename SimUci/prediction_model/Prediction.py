from joblib import load
import pandas as pd


class Prediction:
    def __init__(self):
        self.model = load("prediction_model/new_workflow.joblib")

    def predict(self, df: pd.DataFrame):
        model = load("new_workflow.joblib")
        preds = model.predict(df)
        preds_proba = model.predict_proba(df)
        return preds, round(preds_proba[:, 1], 2)
