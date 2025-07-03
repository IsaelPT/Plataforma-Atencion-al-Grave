import os

from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), "..", ".env")
load_dotenv(dotenv_path)


class Experiment:
    def __init__(
        self,
        edad: int,
        diagnostico_ingreso1: int,
        diagnostico_ingreso2: int,
        diagnostico_ingreso3: int,
        diagnostico_ingreso4: int,
        apache: int,
        insuficiencia_respiratoria: int,
        ventilacion_artificial: int,
        estadia_uti: int,
        tiempo_vam: int,
        tiempo_estadia_pre_uti: int,
        porciento: int = 10,
    ):
        self.edad = edad
        self.diagn1 = diagnostico_ingreso1
        self.diagn2 = diagnostico_ingreso2
        self.diagn3 = diagnostico_ingreso3
        self.diagn4 = diagnostico_ingreso4
        self.apache = apache
        self.insuf_resp = insuficiencia_respiratoria
        self.va = ventilacion_artificial
        self.estadia_uti = estadia_uti
        self.tiempo_vam = tiempo_vam
        self.tiempo_pre_uti = tiempo_estadia_pre_uti
        self.porciento = porciento

        self.result = {}

    def init_results_variables(self) -> None:
        VARIABLES_EXPERIMENTO = os.getenv("VARIABLES_EXPERIMENTO").split(",")
        self.result = {valor: 0 for valor in VARIABLES_EXPERIMENTO}
