export default function Home() {
  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-blue-200 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white/90 rounded-2xl shadow-2xl p-10 border border-blue-300 backdrop-blur-md">
        <h1 className="text-4xl font-extrabold mb-4 text-blue-900 drop-shadow-lg tracking-tight text-center">Bienvenido a la Plataforma de Simulación UCI</h1>
        <p className="mb-6 text-lg text-blue-800 text-center">Simula la evolución de pacientes críticos, explora análisis estadísticos y visualiza predicciones de manera profesional y armónica.</p>
        <ul className="list-disc pl-8 mb-8 text-blue-700 text-base space-y-2">
          <li>Simula pacientes y guarda los resultados para análisis posteriores.</li>
          <li>Realiza tests estadísticos <span className="font-semibold text-purple-700">Wilcoxon</span> y <span className="font-semibold text-green-700">Friedman</span> sobre tus simulaciones guardadas.</li>
          <li>Visualiza predicciones de mortalidad y probabilidades asociadas.</li>
        </ul>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-6">
          <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-base font-medium shadow">Navega usando la barra lateral izquierda</span>
          <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-base font-medium shadow">Simula y analiza con confianza</span>
        </div>
      </div>
    </div>
  );
}
