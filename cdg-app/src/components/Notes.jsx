import React, { useState } from 'react';
import { FileText, BookOpen, Calculator, CheckCircle2 } from 'lucide-react';

export default function Notes() {
  const [activeTab, setActiveTab] = useState('theory'); // 'theory', 'recipes', 'pdfs'

  const pdfs = [
    { name: 'Teoria CDG Gatti 1P Nacif.pdf', title: 'Teoría Gatti', description: '40 preguntas clave para el parcial.' },
    { name: 'Control de Gestion 1°P.pdf', title: 'Apunte Control de Gestión', description: 'Material teórico y práctico base de la materia.' },
    { name: 'Resumen 1er Parcial.pdf', title: 'Resumen 1er Parcial', description: 'Resumen completo de todos los temas.' }
  ];

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="text-center mb-4">
        <h2 className="title" style={{ fontSize: '2.5rem' }}>Central de Estudio</h2>
        <p className="subtitle">Todo lo que necesitas saber, en un solo lugar.</p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
        <button 
          className={`btn ${activeTab === 'theory' ? 'btn-accent' : 'btn-outline'}`}
          onClick={() => setActiveTab('theory')}
        >
          <BookOpen size={18} /> Teoría Resumida
        </button>
        <button 
          className={`btn ${activeTab === 'recipes' ? 'btn-accent' : 'btn-outline'}`}
          onClick={() => setActiveTab('recipes')}
        >
          <Calculator size={18} /> Recetarios Prácticos
        </button>
        <button 
          className={`btn ${activeTab === 'pdfs' ? 'btn-accent' : 'btn-outline'}`}
          onClick={() => setActiveTab('pdfs')}
        >
          <FileText size={18} /> Bibliografía (PDFs)
        </button>
      </div>

      {activeTab === 'theory' && (
        <div className="glass-panel animate-fade-in" style={{ textAlign: 'left' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Conceptos Clave de Control de Gestión</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ background: 'rgba(15, 23, 42, 0.4)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--surface-border)' }}>
              <h4 style={{ fontSize: '1.2rem', color: '#60a5fa', marginBottom: '0.5rem' }}>Económico vs Financiero</h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                El presupuesto <strong>Económico</strong> se arma por lo <em>devengado</em> (Estado de Resultados), mostrando la rentabilidad (ganancias y pérdidas). El presupuesto <strong>Financiero</strong> se arma por lo <em>percibido</em> (Flujo de Caja), mostrando la liquidez (ingresos y egresos reales de dinero).
              </p>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.4)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--surface-border)' }}>
              <h4 style={{ fontSize: '1.2rem', color: '#c084fc', marginBottom: '0.5rem' }}>Leasing y Factoring</h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                <strong>Leasing Financiero:</strong> Tiene opción de compra al final. El bien se contabiliza como activo.<br/>
                <strong>Leasing Operativo:</strong> Sin opción de compra. Útil para bienes con rápida obsolescencia.<br/>
                <strong>Factoring:</strong> Cesión de derechos de cobro para liquidez inmediata. "Sin recurso" significa que el riesgo de impago lo asume el banco.
              </p>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.4)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--surface-border)' }}>
              <h4 style={{ fontSize: '1.2rem', color: '#10b981', marginBottom: '0.5rem' }}>Impuestos y Teorías</h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                <strong>Teoría de la Fuente:</strong> Aplica a Personas Físicas (Periodicidad, Permanencia, Habilitación).<br/>
                <strong>Teoría del Balance:</strong> Aplica a Sociedades. Considera ganancia a todo enriquecimiento, cumpla o no la teoría de la fuente.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'recipes' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Receta 1: Presupuesto */}
          <div className="glass-panel" style={{ textAlign: 'left', borderColor: '#3b82f6' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calculator size={24} /> Receta: Presupuesto Integral
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', gap: '1rem' }}>
                <CheckCircle2 color="#3b82f6" style={{ flexShrink: 0, marginTop: '4px' }} />
                <div>
                  <strong style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>1. Presupuesto de Ventas</strong>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Es el puntapié inicial. Se calcula multiplicando el precio estimado por la cantidad que se espera vender ($p \times q$).</p>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '1rem' }}>
                <CheckCircle2 color="#3b82f6" style={{ flexShrink: 0, marginTop: '4px' }} />
                <div>
                  <strong style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>2. Presupuesto de Producción</strong>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Fórmula clave: <code>Ventas + Inventario Final Deseado - Inventario Inicial</code>. Esto te da la Producción Requerida.</p>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '1rem' }}>
                <CheckCircle2 color="#3b82f6" style={{ flexShrink: 0, marginTop: '4px' }} />
                <div>
                  <strong style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>3. Compras de Materia Prima y MOD</strong>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Para compras: MP requerida + Inv. Final de MP - Inv. Inicial de MP. Para MOD: Multiplicar las horas necesarias por el costo de la hora hombre.</p>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '1rem' }}>
                <CheckCircle2 color="#3b82f6" style={{ flexShrink: 0, marginTop: '4px' }} />
                <div>
                  <strong style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>4. Cuota CIF (Gastos Indirectos)</strong>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Distribuir los gastos comunes. Si es por m², divide el gasto total por los m² totales y multiplica por los m² de cada departamento.</p>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '1rem', background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '8px' }}>
                <CheckCircle2 color="#f59e0b" style={{ flexShrink: 0, marginTop: '4px' }} />
                <div>
                  <strong style={{ fontSize: '1.1rem', color: '#f59e0b' }}>TIP CLAVE: Estados Financieros Proyectados</strong>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Al armar el Estado de Flujo de Efectivo, <strong>NUNCA</strong> incluyas las amortizaciones o depreciaciones, porque NO son salidas reales de dinero.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Receta 2: AxI */}
          <div className="glass-panel" style={{ textAlign: 'left', borderColor: '#8b5cf6' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#8b5cf6', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calculator size={24} /> Receta: Ajuste por Inflación
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', gap: '1rem' }}>
                <CheckCircle2 color="#8b5cf6" style={{ flexShrink: 0, marginTop: '4px' }} />
                <div>
                  <strong style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>1. Clasificación de Partidas</strong>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                    <strong>Monetarias</strong> (Caja, Créditos en pesos): Sufren la inflación. Generan REI/RECPAM.<br/>
                    <strong>No Monetarias</strong> (Bienes de uso, Mercadería): Mantienen su valor. Se reexpresan.
                  </p>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '1rem' }}>
                <CheckCircle2 color="#8b5cf6" style={{ flexShrink: 0, marginTop: '4px' }} />
                <div>
                  <strong style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>2. Reexpresión (Caso Testigo)</strong>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Multiplica el Valor Original (VO) por el coeficiente de inflación para obtener el Valor Reexpresado. Ej: <code>10.000 x 1,08 = 10.800</code>.</p>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '1rem' }}>
                <CheckCircle2 color="#8b5cf6" style={{ flexShrink: 0, marginTop: '4px' }} />
                <div>
                  <strong style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>3. Resultado por Tenencia</strong>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Es la diferencia entre el Valor de Reposición (Corriente) y el Valor Reexpresado. Si la reposición es 11.000 y el reexpresado 10.800, ganaste 200 reales.</p>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '1rem', background: 'rgba(139, 92, 246, 0.1)', padding: '1rem', borderRadius: '8px' }}>
                <CheckCircle2 color="#f59e0b" style={{ flexShrink: 0, marginTop: '4px' }} />
                <div>
                  <strong style={{ fontSize: '1.1rem', color: '#f59e0b' }}>TIP CLAVE: Ajuste del Capital</strong>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>¡No te olvides de ajustar el Capital! El activo monetario que quedó inmovilizado (Caja) genera un Resultado por Inflación negativo: <code>Caja Inmovilizada * % Inflación</code>.</p>
                </div>
              </li>
            </ul>
          </div>

        </div>
      )}

      {activeTab === 'pdfs' && (
        <div className="pdf-grid">
          {pdfs.map((pdf, index) => (
            <div key={index} className="glass-panel pdf-card" style={{ padding: '1.5rem', alignItems: 'flex-start', textAlign: 'left' }}>
              <div className="flex gap-4 align-center w-100" style={{ marginBottom: '1rem', width: '100%' }}>
                <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '12px' }}>
                  <FileText size={32} color="#ef4444" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>{pdf.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0 0' }}>PDF Document</p>
                </div>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', flexGrow: 1 }}>
                {pdf.description}
              </p>
              <div className="flex gap-2" style={{ width: '100%' }}>
                <a href={`/apuntes/${encodeURIComponent(pdf.name)}`} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
                  Ver Online
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
