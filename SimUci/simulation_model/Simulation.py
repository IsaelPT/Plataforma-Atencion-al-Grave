import simpy

from SimUci.helpers import distribution_helpers


class Simulation:
    def __init__(self, experiment, cluster) -> None:
        self.experiment = experiment
        self.cluster = cluster

    def uci(self, env: simpy.Environment):
        if self.cluster == 0:
            post_uci = int(distribution_helpers.tiemp_postUCI0())
            uci = int(distribution_helpers.estad_UTI0())
            while True:
                vam = int(distribution_helpers.tiemp_VAM0())
                if vam <= uci:
                    break
        else:
            post_uci = int(distribution_helpers.tiemp_postUCI1())
            uci = int(distribution_helpers.estad_UTI1())
            while True:
                vam = int(distribution_helpers.tiemp_VAM1())
                if vam <= uci:
                    break

        pre_vam = int((uci - vam) * self.experiment.porciento / 100)
        post_vam = uci - pre_vam - vam
        self.experiment.result["Tiempo Post VAM"] = post_vam
        self.experiment.result["Tiempo VAM"] = vam
        self.experiment.result["Tiempo Pre VAM"] = pre_vam
        self.experiment.result["Estadia Post UCI"] = post_uci
        self.experiment.result["Estadia UCI"] = uci

        yield env.timeout(pre_vam)
        yield env.timeout(vam)
        yield env.timeout(post_vam)
        yield env.timeout(post_uci)
