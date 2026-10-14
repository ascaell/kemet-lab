import { create } from 'zustand';

export const PLANTS_DATA = [
    {
        id: 'artemisia',
        name: 'Artemisia Annua',
        vernacular: 'Armoise annuelle / « L’Herbe des Fièvres »',
        regions: ['Afrique de l’Ouest', 'Afrique de l’Est', 'Madagascar'],
        color: '#10b981', // Émeraude
        moleculeColor: '#34d399',
        partUsed: 'Feuilles et sommités fleuries séchées',
        ancestralKnowledge: {
            indication: 'Fièvres intermittentes sévères, crises de paludisme, fatigue parasitaire.',
            preparation: 'Infusion stricte (ne jamais faire bouillir longuement pour ne pas détruire le principe actif).',
            history: 'Utilisée en tisane communautaire dès les premiers frissons pour casser le cycle thermique du parasite.'
        },
        scientificProof: {
            mainMolecule: 'Artémisinine (C15H22O5)',
            molecularFormula: 'C₁₅H₂₂O₅ — Lactone sesquiterpénique avec pont peroxyde',
            mechanism: 'Le pont endoperoxyde de l’artémisinine réagit avec le fer (hème) concentré dans le parasite Plasmodium falciparum, générant des radicaux libres qui détruisent le parasite de l’intérieur.',
            clinicalValidation: 'Prix Nobel de Médecine (base des thérapies ACT de l’OMS). L’infusion poly-moléculaire contient aussi des flavonoïdes (artémétine, casticine) qui ralentissent la résistance parasitaire.',
            atomsCount: 18
        },
        dosageConfig: {
            baseGramPerKg: 0.08, // ~5g par jour pour un adulte de 62kg
            waterPerGramMl: 200,
            infusionMinutes: 15,
            contraindications: [
                'Premier trimestre de grossesse (précaution embryonnaire)',
                'Ne pas associer à de fortes doses de fer en prise simultanée (inactive la molécule dans l’estomac)'
            ]
        }
    },
    {
        id: 'kinkeliba',
        name: 'Combretum Micranthum',
        vernacular: 'Kinkéliba / « Tisane de Longue Vie » (Dioula / Wolof / Bambara)',
        regions: ['Côte d’Ivoire', 'Sénégal', 'Mali', 'Burkina Faso', 'Guinée'],
        color: '#d97706', // Or ambré
        moleculeColor: '#fbbf24',
        partUsed: 'Feuilles adultes séchées à l’ombre',
        ancestralKnowledge: {
            indication: 'Purification du foie, fièvres bilieuses, digestion lourde, hypertension légère, récupération pendant le jeûne.',
            preparation: 'Décoction frémissante pendant 10 à 15 minutes.',
            history: 'Pilier de la pharmacopée sahélienne et ouest-africaine, traditionnellement bu au réveil pour protéger les fonctions hépatiques et biliaires.'
        },
        scientificProof: {
            mainMolecule: 'Kinkélol & Pipéritine (Alcaloïdes pipéridiniques + Catéchines)',
            molecularFormula: 'C₂₁H₂₀O₁₁ — Complexe Polyphénolique & Flavonoïdes',
            mechanism: 'Action cholagogue et cholérétique prouvée : stimule la sécrétion biliaire par les hépatocytes et inhibe la néoglucogenèse hépatique (effet antidiabétique et antihypertenseur mesuré).',
            clinicalValidation: 'Inscrit à la Pharmacopée Ouest-Africaine (OOAS) et anciennement à la Pharmacopée Française.',
            atomsCount: 22
        },
        dosageConfig: {
            baseGramPerKg: 0.25, // ~15-20g par litre pour un adulte
            waterPerGramMl: 65,
            infusionMinutes: 15,
            contraindications: [
                'Obstruction sévère des voies biliaires (calculs biliaires aigus)',
                'Hypotension sévère (effet hypotenseur naturel)'
            ]
        }
    },
    {
        id: 'moringa',
        name: 'Moringa Oleifera',
        vernacular: 'Nébéday (« Celui qui ne meurt jamais ») / Yevu-ti',
        regions: ['Afrique de l’Ouest', 'Afrique Centrale', 'Afrique Australe'],
        color: '#84cc16', // Vert chlorophylle
        moleculeColor: '#a3e635',
        partUsed: 'Feuilles séchées réduites en poudre, graines',
        ancestralKnowledge: {
            indication: 'Carence nutritionnelle sévère, anémie, montée de lait maternel, purification de l’eau trouble (graines).',
            preparation: 'Macération à froid ou ajout de poudre à cru après cuisson des aliments.',
            history: 'Utilisé dans les villages pour revitaliser les enfants malnutris et les mères allaitantes, ainsi que pour floculer les impuretés de l’eau.'
        },
        scientificProof: {
            mainMolecule: 'Moringine (Isothiocyanate de benzyle) & Quercétine',
            molecularFormula: 'C₁₄H₁₉NO₉S₂ — Glucosinolates & Acides Aminés Essentiels',
            mechanism: 'Activation de la voie cellulaire Nrf2 (puissant anti-inflammatoire et antioxydant cellulaire) et régulation de l’insuline. Contient les 9 acides aminés essentiels et une haute biodisponibilité en fer.',
            clinicalValidation: 'Validé par l’OMS et la FAO contre la malnutrition aiguë et le stress oxydatif métabolique.',
            atomsCount: 16
        },
        dosageConfig: {
            baseGramPerKg: 0.12, // ~7-8g de poudre/jour
            waterPerGramMl: 40,
            infusionMinutes: 5,
            contraindications: [
                'Éviter la consommation des racines et de l’écorce (contiennent de la spirochine neurotoxique)',
                'Attention en cas de traitement hypoglycémiant fort (effet cumulatif sur la glycémie)'
            ]
        }
    },
    {
        id: 'cryptolepis',
        name: 'Cryptolepis Sanguinolenta',
        vernacular: 'Quinine du Ghana / Nibima (Akan / Twi)',
        regions: ['Côte d’Ivoire', 'Ghana', 'Guinée', 'Nigeria'],
        color: '#ef4444', // Rouge racine
        moleculeColor: '#f87171',
        partUsed: 'Racines séchées (teinture jaune d’or intense)',
        ancestralKnowledge: {
            indication: 'Paludisme résistant, infections urinaires et systémiques, fièvres typhoïdes.',
            preparation: 'Décoction de racines broyées à feu doux.',
            history: 'Gardé précieusement par les guérisseurs forestiers d’Afrique de l’Ouest pour traiter les fièvres qui résistent à toutes les autres feuilles.'
        },
        scientificProof: {
            mainMolecule: 'Cryptolépine (Alcaloïde indoloquinoléique)',
            molecularFormula: 'C₁₆H₁₂N₂ — Alcaloïde intercalant de l’ADN parasitaire',
            mechanism: 'S’intercale dans l’ADN des parasites (Plasmodium) et des bactéries pathogènes, bloquant la réplication cellulaire et inhibant la formation d’hémozoïne.',
            clinicalValidation: 'Étudié et standardisé par le Centre for Plant Medicine Research (CPMR, Mampong-Ghana) avec essais cliniques comparatifs.',
            atomsCount: 20
        },
        dosageConfig: {
            baseGramPerKg: 0.05, // Plante très concentrée
            waterPerGramMl: 150,
            infusionMinutes: 20,
            contraindications: [
                'Contre-indiqué chez la femme enceinte et l’enfant de moins de 6 ans',
                'Respecter strictement la durée de cure (max 7 jours consécutifs sans avis médical)'
            ]
        }
    }
];

export const usePharmaStore = create((set) => ({
    plants: PLANTS_DATA,
    selectedPlant: PLANTS_DATA[0],
    viewMode: 'ancestral', // 'ancestral' (Botanique) | 'scientific' (Moléculaire)
    patientWeight: 70,
    preparationMethod: 'infusion', // 'infusion' | 'decoction' | 'powder'

    selectPlant: (plantId) =>
        set((state) => ({
            selectedPlant: state.plants.find((p) => p.id === plantId) || state.selectedPlant
        })),

    setViewMode: (mode) => set({ viewMode: mode }),
    setPatientWeight: (weight) => set({ patientWeight: Number(weight) }),
    setPreparationMethod: (method) => set({ preparationMethod: method })
}));