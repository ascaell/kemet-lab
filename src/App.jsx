import React from 'react';
import { usePharmaStore } from './store/usePharmaStore';
import Scene3D from './components/Scene3D';
import { ShieldCheck, Sparkles, Scale, AlertTriangle, FlaskConical, Leaf, Globe2 } from 'lucide-react';

export default function App() {
  const {
    plants,
    selectedPlant,
    selectPlant,
    viewMode,
    setViewMode,
    patientWeight,
    setPatientWeight,
    preparationMethod,
    setPreparationMethod
  } = usePharmaStore();

  // Calcul intelligent du dosage sécurisé
  const rawGrams = (patientWeight * selectedPlant.dosageConfig.baseGramPerKg).toFixed(1);
  const methodMultiplier = preparationMethod === 'decoction' ? 1.15 : preparationMethod === 'powder' ? 0.65 : 1;
  const finalGrams = (rawGrams * methodMultiplier).toFixed(1);
  const waterMl = Math.round(finalGrams * selectedPlant.dosageConfig.waterPerGramMl);

  return (
    <div style={styles.container}>
      {/* BARRE SUPÉRIEURE */}
      <header style={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ ...styles.logoBadge, borderColor: selectedPlant.color }}>
            <FlaskConical size={20} color={selectedPlant.color} />
          </div>
          <div>
            <h1 style={styles.title}>KEMET<span style={{ color: selectedPlant.color }}>LAB</span></h1>
            <p style={styles.subtitle}>Sanctuaire & Standardisation Scientifique de la Pharmacopée Africaine</p>
          </div>
        </div>

        {/* SWITCH ANCESTRAL <-> SCIENTIFIQUE */}
        <div style={styles.switchContainer}>
          <button
            onClick={() => setViewMode('ancestral')}
            style={{
              ...styles.switchBtn,
              background: viewMode === 'ancestral' ? selectedPlant.color : 'transparent',
              color: viewMode === 'ancestral' ? '#050709' : '#9ca3af'
            }}
          >
            <Leaf size={16} /> Savoir Ancestral
          </button>
          <button
            onClick={() => setViewMode('scientific')}
            style={{
              ...styles.switchBtn,
              background: viewMode === 'scientific' ? selectedPlant.color : 'transparent',
              color: viewMode === 'scientific' ? '#050709' : '#9ca3af'
            }}
          >
            <Sparkles size={16} /> Preuve Moléculaire 3D
          </button>
        </div>
      </header>

      {/* CORPS PRINCIPAL EN 3 COLONNES */}
      <main style={styles.mainGrid}>
        {/* COLONNE GAUCHE : SÉLECTEUR DE PLANTES & SAVOIR */}
        <section style={styles.sidePanel}>
          <div style={styles.sectionLabel}>HERBIER SOUVERAIN ({plants.length} PLANTES CERTIFIÉES)</div>
          <div style={styles.plantList}>
            {plants.map((plant) => {
              const active = plant.id === selectedPlant.id;
              return (
                <button
                  key={plant.id}
                  onClick={() => selectPlant(plant.id)}
                  style={{
                    ...styles.plantCard,
                    borderColor: active ? plant.color : 'rgba(255,255,255,0.08)',
                    background: active ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.015)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '700', color: '#fff', fontSize: '15px' }}>{plant.name}</span>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: plant.color }} />
                  </div>
                  <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px', textAlign: 'left' }}>
                    {plant.vernacular}
                  </div>
                </button>
              );
            })}
          </div>

          {/* CARTE IDENTITÉ & PREUVE */}
          <div style={styles.infoBox}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: selectedPlant.color }}>
              <Globe2 size={16} />
              <span style={{ fontSize: '12px', fontWeight: 600 }}>
                Zones : {selectedPlant.regions.join(' • ')}
              </span>
            </div>

            {viewMode === 'ancestral' ? (
              <>
                <h3 style={styles.cardHeading}>Tradition & Usage Communautaire</h3>
                <p style={styles.bodyText}><strong>Partie utilisée :</strong> {selectedPlant.partUsed}</p>
                <p style={styles.bodyText}><strong>Cible traditionnelle :</strong> {selectedPlant.ancestralKnowledge.indication}</p>
                <p style={styles.bodyText}><strong>Transmission :</strong> {selectedPlant.ancestralKnowledge.history}</p>
              </>
            ) : (
              <>
                <h3 style={styles.cardHeading}>Validation Biochimique & Clinique</h3>
                <div style={styles.formulaBadge}>{selectedPlant.scientificProof.molecularFormula}</div>
                <p style={styles.bodyText}><strong>Mécanisme d'action :</strong> {selectedPlant.scientificProof.mechanism}</p>
                <p style={styles.bodyText}><strong>Statut :</strong> {selectedPlant.scientificProof.clinicalValidation}</p>
              </>
            )}
          </div>
        </section>

        {/* COLONNE CENTRALE : SCÈNE 3D INTERACTIVE */}
        <section style={styles.centerViewport}>
          <Scene3D />
          <div style={styles.viewportOverlay}>
            Tourner : Clic gauche • Zoomer : Molette • Mode actuel :{' '}
            <strong style={{ color: selectedPlant.color }}>
              {viewMode === 'ancestral' ? 'Essence Botanique' : 'Architecture Moléculaire'}
            </strong>
          </div>
        </section>

        {/* COLONNE DROITE : CALCULATEUR DE DOSAGE & SÉCURITÉ */}
        <section style={styles.sidePanel}>
          <div style={styles.sectionLabel}>
            <Scale size={14} style={{ display: 'inline', marginRight: 6 }} />
            STANDARDISATION & CALCULATEUR DE DOSE
          </div>

          <div style={styles.infoBox}>
            <label style={styles.label}>
              Poids du patient : <strong style={{ color: '#fff' }}>{patientWeight} kg</strong>
            </label>
            <input
              type="range"
              min="15"
              max="120"
              value={patientWeight}
              onChange={(e) => setPatientWeight(e.target.value)}
              style={{ width: '100%', accentColor: selectedPlant.color, margin: '10px 0 18px 0' }}
            />

            <label style={styles.label}>Protocole d'extraction :</label>
            <div style={{ display: 'flex', gap: '6px', marginTop: '8px', marginBottom: '18px' }}>
              {[
                { id: 'infusion', label: 'Infusion' },
                { id: 'decoction', label: 'Décoction' },
                { id: 'powder', label: 'Poudre pure' }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setPreparationMethod(m.id)}
                  style={{
                    flex: 1,
                    padding: '8px 6px',
                    fontSize: '12px',
                    borderRadius: '8px',
                    border: `1px solid ${preparationMethod === m.id ? selectedPlant.color : 'rgba(255,255,255,0.1)'}`,
                    background: preparationMethod === m.id ? `${selectedPlant.color}22` : 'transparent',
                    color: '#fff',
                    cursor: 'pointer'
                  }}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* RÉSULTAT DU DOSAGE STANDARDISÉ */}
            <div style={{ ...styles.dosageResult, borderColor: selectedPlant.color }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#9ca3af' }}>
                Dosage journalier standardisé
              </div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: selectedPlant.color, margin: '4px 0' }}>
                {finalGrams} g <span style={{ fontSize: '14px', color: '#d1d5db', fontWeight: 400 }}>/ jour</span>
              </div>
              <div style={{ fontSize: '12px', color: '#d1d5db' }}>
                {preparationMethod === 'powder'
                  ? `À répartir en 2 prises avec un verre d'eau tiède.`
                  : `Dans ${waterMl} ml d'eau • Temps d'extraction : ${selectedPlant.dosageConfig.infusionMinutes} min.`}
              </div>
            </div>
          </div>

          {/* GARDE-FOU & CONTRE-INDICATIONS */}
          <div style={styles.warningBox}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b', fontWeight: 700, fontSize: '13px', marginBottom: '8px' }}>
              <AlertTriangle size={16} /> Sécurité & Contre-indications
            </div>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12.5px', color: '#d1d5db', lineHeight: '1.6' }}>
              {selectedPlant.dosageConfig.contraindications.map((item, idx) => (
                <li key={idx} style={{ marginBottom: '6px' }}>{item}</li>
              ))}
            </ul>
          </div>

          <div style={styles.priorArtBadge}>
            <ShieldCheck size={18} color="#10b981" />
            <span style={{ fontSize: '11.5px', color: '#9ca3af' }}>
              <strong>Protection Anti-Biopiraterie :</strong> Savoir communautaire horodaté (Prior Art) rattaché au patrimoine africain.
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    background: '#070a0e',
    color: '#f3f4f6',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  header: {
    height: '72px',
    padding: '0 24px',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'rgba(10, 14, 20, 0.9)'
  },
  logoBadge: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    border: '1px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255,255,255,0.03)'
  },
  title: { margin: 0, fontSize: '20px', fontWeight: '800', letterSpacing: '1.5px' },
  subtitle: { margin: 0, fontSize: '12px', color: '#9ca3af' },
  switchContainer: {
    display: 'flex',
    background: 'rgba(255,255,255,0.04)',
    padding: '4px',
    borderRadius: '10px',
    border: '1px solid rgba(255,255,255,0.08)'
  },
  switchBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    fontWeight: '600',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  mainGrid: {
    flex: 1,
    display: 'grid',
    gridTemplateColumns: '360px 1fr 360px',
    height: 'calc(100vh - 72px)'
  },
  sidePanel: {
    padding: '20px',
    borderRight: '1px solid rgba(255,255,255,0.06)',
    borderLeft: '1px solid rgba(255,255,255,0.06)',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    background: 'rgba(10, 14, 18, 0.75)'
  },
  sectionLabel: {
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '1.2px',
    color: '#9ca3af',
    textTransform: 'uppercase'
  },
  plantList: { display: 'flex', flexDirection: 'column', gap: '8px' },
  plantCard: {
    padding: '12px 14px',
    borderRadius: '10px',
    border: '1px solid',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  infoBox: {
    padding: '16px',
    borderRadius: '12px',
    background: 'rgba(255,255,255,0.025)',
    border: '1px solid rgba(255,255,255,0.07)'
  },
  cardHeading: { margin: '0 0 10px 0', fontSize: '15px', color: '#fff' },
  bodyText: { fontSize: '13px', color: '#d1d5db', lineHeight: '1.55', margin: '8px 0' },
  formulaBadge: {
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: '6px',
    background: 'rgba(16, 185, 129, 0.15)',
    color: '#34d399',
    fontSize: '12px',
    fontWeight: '700',
    marginBottom: '8px'
  },
  centerViewport: { position: 'relative', width: '100%', height: '100%' },
  viewportOverlay: {
    position: 'absolute',
    bottom: '18px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(7, 10, 14, 0.85)',
    padding: '8px 16px',
    borderRadius: '999px',
    border: '1px solid rgba(255,255,255,0.1)',
    fontSize: '12px',
    color: '#9ca3af',
    pointerEvents: 'none'
  },
  label: { fontSize: '13px', color: '#d1d5db', display: 'block' },
  dosageResult: {
    padding: '14px',
    borderRadius: '10px',
    background: 'rgba(0,0,0,0.35)',
    borderLeft: '4px solid'
  },
  warningBox: {
    padding: '14px',
    borderRadius: '12px',
    background: 'rgba(245, 158, 11, 0.08)',
    border: '1px solid rgba(245, 158, 11, 0.25)'
  },
  priorArtBadge: {
    marginTop: 'auto',
    padding: '12px',
    borderRadius: '10px',
    background: 'rgba(16, 185, 129, 0.06)',
    border: '1px solid rgba(16, 185, 129, 0.2)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  }
};