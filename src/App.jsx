import React, { useState } from 'react';
import { DollarSign, PlusCircle, LogOut, Lock, User, FileText, Calendar, Filter, TrendingUp, Wallet } from 'lucide-react';

const initialData = [
  { id: '1', fecha: '2026-01-04', concepto: 'DIEZMO', tipo: 'INGRESO', monto: 27300, semana: 1, mes: 'ENERO' },
  { id: '2', fecha: '2026-01-04', concepto: 'OFRENDA', tipo: 'INGRESO', monto: 5120, semana: 1, mes: 'ENERO' },
  { id: '3', fecha: '2026-01-04', concepto: 'MISION XOXO', tipo: 'INGRESO', monto: 750, semana: 1, mes: 'ENERO' },
  { id: '4', fecha: '2026-01-04', concepto: 'MISERICORDIA', tipo: 'INGRESO', monto: 1700, semana: 1, mes: 'ENERO' },
  { id: '5', fecha: '2026-01-04', concepto: 'PROCONSTRUCCION', tipo: 'INGRESO', monto: 7700, semana: 1, mes: 'ENERO' },
  { id: '6', fecha: '2026-01-04', concepto: 'BAÑOS Y COCINA', tipo: 'INGRESO', monto: 10000, semana: 1, mes: 'ENERO' },
  { id: '7', fecha: '2026-01-25', concepto: 'BAÑOS Y COCINA', tipo: 'INGRESO', monto: 102000, semana: 4, mes: 'ENERO' },
];

export default function App() {
  const [user, setUser] = useState(null); // { email: string, role: 'admin' | 'guest' }
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [data, setData] = useState(initialData);
  const [showModal, setShowModal] = useState(false);
  const [selectedMes, setSelectedMes] = useState('ENERO');

  // Form states
  const [formFecha, setFormFecha] = useState('');
  const [formConcepto, setFormConcepto] = useState('');
  const [formTipo, setFormTipo] = useState('INGRESO');
  const [formMonto, setFormMonto] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (emailInput.trim() === 'erik7917@gmail.com' && passwordInput === 'IPAP2026!Admin') {
      setUser({ email: 'erik7917@gmail.com', role: 'admin' });
      setErrorMsg('');
    } else if (emailInput.trim() === 'visitante.ipap@gmail.com' && passwordInput === 'IPAP2026#Visita') {
      setUser({ email: 'visitante.ipap@gmail.com', role: 'guest' });
      setErrorMsg('');
    } else {
      setErrorMsg('Credenciales incorrectas. Verifica usuario o contraseña.');
    }
  };

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!formFecha || !formConcepto || !formMonto) return;

    const fechaObj = new Date(formFecha);
    const mesesNombres = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
    const mesNombre = mesesNombres[fechaObj.getMonth()];

    const newEntry = {
      id: Date.now().toString(),
      fecha: formFecha,
      concepto: formConcepto.toUpperCase(),
      tipo: formTipo,
      monto: parseFloat(formMonto),
      semana: Math.ceil(fechaObj.getDate() / 7),
      mes: mesNombre
    };

    setData([newEntry, ...data]);
    setShowModal(false);
    setFormFecha('');
    setFormConcepto('');
    setFormMonto('');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-md w-full shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 bg-blue-600/20 text-blue-400 rounded-2xl mb-3">
              <Wallet size={36} />
            </div>
            <h1 className="text-2xl font-bold text-white">IPAP Finanzas Cloud</h1>
            <p className="text-slate-400 text-sm mt-1">Sistema de Control Semanal y Presupuesto Mensual</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {errorMsg && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs">
                {errorMsg}
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Correo Electrónico</label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="tu-correo@ejemplo.com"
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Contraseña</label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition shadow-lg shadow-blue-600/30 text-sm mt-2"
            >
              Iniciar Sesión
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-700/60 text-xs text-slate-400">
            <p className="font-semibold text-slate-300 mb-2">Accesos Rápidos de Prueba:</p>
            <div className="space-y-1 bg-slate-900/50 p-3 rounded-xl">
              <p><span className="text-blue-400">Admin:</span> erik7917@gmail.com / IPAP2026!Admin</p>
              <p><span className="text-emerald-400">Visitante:</span> visitante.ipap@gmail.com / IPAP2026#Visita</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const filteredData = data.filter(item => item.mes === selectedMes);
  const totalIngresosMes = filteredData.filter(i => i.tipo === 'INGRESO').reduce((a, b) => a + b.monto, 0);
  const totalEgresosMes = filteredData.filter(i => i.tipo === 'EGRESO').reduce((a, b) => a + b.monto, 0);
  const balanceMes = totalIngresosMes - totalEgresosMes;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 sticky top-0 z-10 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600/20 text-blue-400 rounded-xl">
            <Wallet size={24} />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">IPAP Finanzas</h1>
            <p className="text-xs text-slate-400">Panel de Administración Cloud</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
            user.role === 'admin' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
          }`}>
            {user.role === 'admin' ? 'Administrador' : 'Visitante'}
          </span>
          <button
            onClick={() => setUser(null)}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition"
            title="Cerrar Sesión"
          >
            <LogOut size={18} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
        {/* Filter bar & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <div className="flex items-center gap-3">
            <Filter size={18} className="text-slate-400" />
            <span className="text-sm font-medium text-slate-300">Seleccionar Mes:</span>
            <select
              value={selectedMes}
              onChange={(e) => setSelectedMes(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            >
              {['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'].map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {user.role === 'admin' && (
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition shadow-lg shadow-blue-600/20"
            >
              <PlusCircle size={18} />
              <span>Registrar Movimiento Semanal</span>
            </button>
          )}
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Ingresos de {selectedMes}</p>
            <h3 className="text-2xl font-bold text-emerald-400">${totalIngresosMes.toLocaleString('es-MX')} MXN</h3>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Egresos de {selectedMes}</p>
            <h3 className="text-2xl font-bold text-rose-400">${totalEgresosMes.toLocaleString('es-MX')} MXN</h3>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Balance Neto</p>
            <h3 className={`text-2xl font-bold ${balanceMes >= 0 ? 'text-blue-400' : 'text-rose-500'}`}>
              ${balanceMes.toLocaleString('es-MX')} MXN
            </h3>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center">
            <h2 className="font-semibold text-slate-200 text-sm">Movimientos Capturados ({selectedMes})</h2>
            <span className="text-xs text-slate-400">{filteredData.length} registros encontrados</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-xs font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-4">Fecha</th>
                  <th className="p-4">Semana</th>
                  <th className="p-4">Concepto</th>
                  <th className="p-4">Tipo</th>
                  <th className="p-4 text-right">Monto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-slate-500">
                      No hay registros guardados para el mes de {selectedMes}.
                    </td>
                  </tr>
                ) : (
                  filteredData.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-800/40 transition">
                      <td className="p-4 font-mono text-slate-400 text-xs">{row.fecha}</td>
                      <td className="p-4">Semana {row.semana}</td>
                      <td className="p-4 font-medium text-white">{row.concepto}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                          row.tipo === 'INGRESO' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}>
                          {row.tipo}
                        </span>
                      </td>
                      <td className="p-4 text-right font-semibold text-white font-mono">
                        ${row.monto.toLocaleString('es-MX')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal Captura */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Capturar Entradas / Egresos</h3>

            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Fecha de Movimiento</label>
                <input
                  type="date"
                  value={formFecha}
                  onChange={(e) => setFormFecha(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Concepto</label>
                <input
                  type="text"
                  value={formConcepto}
                  onChange={(e) => setFormConcepto(e.target.value)}
                  placeholder="Ej. DIEZMO, OFRENDA, BAÑOS Y COCINA"
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Tipo</label>
                  <select
                    value={formTipo}
                    onChange={(e) => setFormTipo(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="INGRESO">INGRESO</option>
                    <option value="EGRESO">EGRESO</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Monto ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formMonto}
                    onChange={(e) => setFormMonto(e.target.value)}
                    placeholder="0.00"
                    required
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2.5 rounded-xl text-sm font-medium transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-xl text-sm font-medium transition shadow-lg shadow-blue-600/30"
                >
                  Guardar Registro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}