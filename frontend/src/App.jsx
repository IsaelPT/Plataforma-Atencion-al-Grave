import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Home from './pages/Home';
import SimulationPage from './pages/SimulationPage';
import WilcoxonPage from './pages/WilcoxonPage';
import FriedmanPage from './pages/FriedmanPage';

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 bg-gray-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/simulacion" element={<SimulationPage />} />
            <Route path="/wilcoxon" element={<WilcoxonPage />} />
            <Route path="/friedman" element={<FriedmanPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
