export const LOADOUT_IMAGE_PATHS = {
    ships: { pegaso: '', hercules: '', talos: '' },
    artifacts: { lynceus: '', phoebus: '', prometheus: '' }
};

export const loadoutData = {
    ships: [
        {
            id: 'pegaso', code: '01 // VESSEL', name: 'Pegaso-I', subtitle: 'High-Velocity Interceptor',
            description: 'Lightweight deep-space interceptor engineered for rapid orbital insertion. Consumes less Energy during transit maneuvers and allows a 2-specialist crew, but features lighter hull plating that requires careful damage control during debris or radiation hazards.',
            imagePath: LOADOUT_IMAGE_PATHS.ships.pegaso, crewCapacity: 2
        },
        {
            id: 'hercules', code: '02 // VESSEL', name: 'Hércules-IV', subtitle: 'Heavy Deep-Space Cruiser',
            description: 'Reinforced exploration cruiser built with dense radiation and micrometeoroid shielding to withstand extreme cometary environments. High mass increases Energy consumption during burns and restricts mission capacity to only 1 extra crew specialist.',
            imagePath: LOADOUT_IMAGE_PATHS.ships.hercules, crewCapacity: 1
        },
        {
            id: 'talos', code: '03 // VESSEL', name: 'Talos-IA', subtitle: 'Autonomous-Assisted Research Vessel',
            description: 'Next-generation vessel driven by an onboard tactical AI core that assists system diagnostics and stabilizes telemetry. Requires Eng. Danko assigned by default as systems liaison, leaving room for 1 additional crew specialist.',
            imagePath: LOADOUT_IMAGE_PATHS.ships.talos, crewCapacity: 2, defaultCrew: 'danko'
        }
    ],
    artifacts: [
        {
            id: 'lynceus', code: '01 // ARTIFACT', name: 'MIS-Lynceus', subtitle: 'Multispectral Imaging Spectrometer',
            description: 'High-resolution optical and infrared spectrometer designed to map the surface composition and coma of interstellar object 3I/Nyx from a safe standoff orbit with low power draw and steady scientific data yield.',
            imagePath: LOADOUT_IMAGE_PATHS.artifacts.lynceus
        },
        {
            id: 'phoebus', code: '02 // ARTIFACT', name: 'SAL-Phoebus', subtitle: 'Sublimation & Volatile Gas Analyzer',
            description: 'Active mass-spectrometry array that samples volatile gas jets erupting from 3I/Nyx as solar heating intensifies. Delivers high scientific yield, but requires close proximity to unstable outgassing plumes.',
            imagePath: LOADOUT_IMAGE_PATHS.artifacts.phoebus
        },
        {
            id: 'prometheus', code: '03 // ARTIFACT', name: 'D2C2-Prometheus', subtitle: 'Deep-Core Cryogenic Drill & Collector',
            description: "Heavy cryogenic harpoon and core sampler engineered to extract pristine subsurface interstellar ice directly from 3I/Nyx's nucleus. Provides maximum scientific discovery potential at the cost of heavy Energy demand during extraction.",
            imagePath: LOADOUT_IMAGE_PATHS.artifacts.prometheus
        }
    ],
    crew: [
        {
            id: 'danko', code: '01 // SPECIALIST', name: 'Eng. Danko', subtitle: 'Deep Space Telemetry & Propulsion', emblem: 'DSN',
            description: 'Veteran aerospace systems engineer specialized in high-gain Deep Space Network alignment and thruster calibration. Reduces propulsion energy waste and prevents critical communication blackouts. (Assigned by default on Talos-IA).',
        },
        {
            id: 'candy', code: '02 // SPECIALIST', name: 'Dr. Candy', subtitle: 'Space Medicine & Crew Psychology', emblem: 'MED',
            description: 'Flight surgeon and behavioral specialist trained for deep-space isolation crises. Stabilizes Life Support efficiency under radiation stress and mitigates crew fatigue during prolonged emergencies.',
        },
        {
            id: 'jan', code: '03 // SPECIALIST', name: 'Chem. Jan', subtitle: 'Astrochemistry & Toxicology', emblem: 'CHEM',
            description: 'Planetary chemist expert in cometary volatiles and closed-loop cabin atmosphere scrubbing. Neutralizes toxic gas leaks from 3I/Nyx and boosts sample processing efficiency.',
        },
        {
            id: 'najo', code: '04 // SPECIALIST', name: 'Spec. Najo', subtitle: 'Orbital Mechanics & EVA Operations', emblem: 'EVA',
            description: 'Astrodynamics navigator and extravehicular repair specialist. Sharpens orbital intercept precision and minimizes Hull Integrity losses during emergency hull breaches.',
        }
    ]
};