from scipy.stats import wilcoxon

class Wilcoxon:
    def __init__(self):
        self.statistic: float = 0
        self.p_value: float = 0
        
    def test(self, x, y) -> None:
        res = wilcoxon(x, y)
        self.statistic = res[0]
        self.p_value = res[1]
