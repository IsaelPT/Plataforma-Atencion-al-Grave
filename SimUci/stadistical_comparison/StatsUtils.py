import numpy as np
from numpy import ndarray

from scipy.stats import norm


class StatsUtils:
    @staticmethod
    def confidenceinterval(mean, std, n) -> tuple[ndarray[float], ndarray[float]]:
        sem = std / np.sqrt(n)
        conf_int = norm.interval(confidence=0.95, loc=mean, scale=sem)
        arr_limite_inferior: ndarray[float] = conf_int[0]
        arr_limite_superior: ndarray[float] = conf_int[1]
        return arr_limite_inferior, arr_limite_superior
    
    @staticmethod
    def calibration_metric_predict(y_true, y_pred, intervals):
        within_interval = np.zeros(len(intervals))
        for i, alpha in enumerate(intervals):
            lower = np.percentile(y_pred, (1-alpha)/2 * 100, axis=0)
            upper = np.percentile(y_pred, (1+alpha)/2 * 100, axis=0)
            within_interval[i] = np.mean((y_true >= lower) & (y_true <= upper))
        return within_interval
    
    @staticmethod
    def calibration_metric_simulation(y_true, lower, upper):
        within_interval = np.mean((y_true >= lower) & (y_true <= upper))
        return within_interval
