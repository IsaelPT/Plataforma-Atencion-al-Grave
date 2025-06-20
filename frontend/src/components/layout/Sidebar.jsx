import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Inicio", to: "/", icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8m5 0a2 2 0 002-2V7a2 2 0 00-2-2h-3.5a2 2 0 00-1.5.67" /></svg>
  ) },
];

const simUciItems = [
  { label: "Simulación", to: "/simulacion", icon: (
    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h2a4 4 0 014 4v2" /><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" /></svg>
  ) },
  { label: "Wilcoxon", to: "/wilcoxon", icon: (
    <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  ) },
  { label: "Friedman", to: "/friedman", icon: (
    <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 17v-2a4 4 0 014-4h10a4 4 0 014 4v2" /><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" /></svg>
  ) },
];

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  return (
    <aside className="h-screen w-20 md:w-64 bg-white/70 backdrop-blur-lg border-r border-blue-100 shadow-2xl flex flex-col items-center py-6 relative">
      {/* Logo/avatar */}
      <div className="mb-8 flex flex-col items-center">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 shadow-lg flex items-center justify-center mb-2 border-4 border-white">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
        </div>
        <span className="hidden md:block text-lg font-extrabold text-blue-900 tracking-tight">SimUCI</span>
      </div>
      {/* Navegación */}
      <nav className="flex-1 flex flex-col gap-2 w-full items-center">
        {navItems.map(item => (
          <Link
            key={item.to}
            to={item.to}
            className={`group flex items-center w-14 md:w-52 mx-auto px-0 md:px-4 py-3 rounded-xl transition-all duration-200 font-semibold text-blue-900 hover:bg-blue-100/80 hover:shadow-md ${location.pathname === item.to ? 'bg-blue-200/80 shadow-lg ring-2 ring-blue-400' : ''}`}
          >
            <span className="flex items-center justify-center w-14 h-8 md:w-8 md:h-8">{item.icon}</span>
            <span className="hidden md:inline ml-3 text-base tracking-wide">{item.label}</span>
          </Link>
        ))}
        <button
          className="flex items-center px-6 py-3 rounded-lg mx-2 font-semibold transition-all duration-150 hover:bg-blue-100/80 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2 w-full justify-between"
          aria-expanded={open}
          aria-controls="simuci-menu"
          onClick={() => setOpen(!open)}
        >
          <span className="flex items-center gap-2">
            <svg className={`w-6 h-6 text-blue-700 transition-transform ${open ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            <span className="hidden md:inline font-bold text-blue-900">SimUCI</span>
          </span>
        </button>
        {open && (
          <div id="simuci-menu" className="flex flex-col gap-1 ml-8 mt-1 w-[80%]">
            {simUciItems.map(item => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-150 hover:bg-blue-50/80 hover:scale-105 ${location.pathname === item.to ? 'bg-blue-100/80 ring-2 ring-blue-300' : ''}`}
              >
                {item.icon}
                <span className="ml-2 text-blue-900">{item.label}</span>
              </Link>
            ))}
          </div>
        )}
      </nav>
    </aside>
  );
}
