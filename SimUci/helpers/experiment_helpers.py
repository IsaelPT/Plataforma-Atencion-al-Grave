import simpy

from SimUci.simulation_model.Simulation import Simulation
from SimUci.simulation_model.Experiment import Experiment

from SimUci.helpers import distribution_helpers

import pandas as pd



def single_run(experiment) -> dict[str, int]:
    env = simpy.Environment()
    experiment.init_results_variables()
    cluster = distribution_helpers.clustering(experiment.edad, experiment.diagn1, experiment.diagn2,
                                        experiment.diagn3, experiment.diagn4, experiment.apache,
                                        experiment.insuf_resp, experiment.va, experiment.estadia_uti,
                                        experiment.tiempo_vam, experiment.tiempo_pre_uti)
    simulacion = Simulation(experiment, cluster)
    env.process(simulacion.uci(env))
    env.run()

    result = experiment.result
    return result


def multiple_replication(experiment: Experiment, n_reps: int = 100) -> pd.DataFrame:
    result = [single_run(experiment) for _ in range(n_reps)]
    df = pd.DataFrame(result)
    return df
