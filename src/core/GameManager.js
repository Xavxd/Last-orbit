import { GameState } from './GameState.js';
import { ResourceManager } from '../systems/ResourceManager.js';
import { CrewManager } from '../systems/CrewManager.js';
import { EventManager } from '../systems/EventManager.js';
import { CardManager } from '../systems/CardManager.js';
import { CrewMember } from '../models/CrewMember.js';
import { crewData } from '../data/crewData.js';
import { minigamesData } from '../data/minigamesData.js';
import { VICTORY_RESEARCH } from '../utils/constants.js';

export class GameManager {
    constructor() { this.reset(); }

    reset() {
        this.state = new GameState();
        this.resources = new ResourceManager(this.state);
        this.crew = new CrewManager(this.state);
        this.events = new EventManager(this.state, this.resources);
        this.cards = new CardManager(this);
    }

    startGame(loadout) {
        if (this.state.status !== 'preparation') return false;
        if (!loadout?.ship || !loadout?.artifact || !Array.isArray(loadout.crew)
            || loadout.crew.length !== loadout.ship.crewCapacity) return false;
        if (loadout.ship.defaultCrew && !loadout.crew.some(member => member.id === loadout.ship.defaultCrew)) return false;
        this.state.ship = loadout.ship.id;
        this.state.artifact = loadout.artifact.id;
        this.state.selectedCrew = loadout.crew.map(member => member.id);
        crewData.forEach(c => this.crew.addCrewMember(new CrewMember(c.name, c.specialty)));
        this.cards.buildDeck();
        this.cards.startTurn();
        this.state.status = 'active';
        this.state.addHistory('La expedición ha comenzado.');
        return true;
    }

    // ── Efectos (cartas, recompensas) ──
    canAfford(effect = {}) {
        return Object.entries(effect.resources ?? {}).every(([k, v]) => v >= 0 || this.state.resources[k] + v >= 0);
    }
    applyEffect(effect = {}, target = 'all') {
        for (const [k, v] of Object.entries(effect.resources ?? {})) this.resources.modifyResource(k, v);
        for (const [k, v] of Object.entries(effect.discovery ?? {})) {
            this.state.discovery[k] = Math.max(0, Math.min(100, this.state.discovery[k] + v));
        }
        if (effect.crew) {
            const members = target === 'weakest' ? [this.crew.getWeakest()].filter(Boolean) : this.crew.getAlive();
            members.forEach(m => {
                if (effect.crew.health) m.modifyHealth(effect.crew.health);
                if (effect.crew.mentalHealth) m.modifyMentalHealth(effect.crew.mentalHealth);
            });
        }
    }
    applyMinigameReward(page, ratio) {
        const def = minigamesData[page];
        const scale = obj => Object.fromEntries(Object.entries(obj ?? {}).map(([k, v]) => [k, Math.round(v * ratio)]));
        const reward = { resources: scale(def.reward.resources), discovery: scale(def.reward.discovery), crew: scale(def.reward.crew) };
        this.applyEffect(reward);
        this.state.addHistory(`Minijuego ${page}: ${Math.round(ratio * 100)}%`);
        return `${def.title}: ${Math.round(ratio * 100)}%`;
    }

    // ── Turnos ──
    advanceTurn() {
        const s = this.state;
        if (s.status !== 'active') return { event: null, status: s.status };
        this.resources.consumeTurnResources();
        const event = this.events.applyEvent(this.events.generateEvent());
        if (this.resources.checkCriticalResources() || this.crew.isCrewDead()) s.status = 'defeat';
        else if (s.turn >= s.maxTurns) s.status = 'evaluation';
        else { s.turn++; this.cards.startTurn(); }
        return { event, status: s.status };
    }

    getEnding() {
        const { discovery, crew } = this.state;
        const survivors = this.crew.getAlive().length;
        const stats = { research: discovery.researchLevel, anomaly: discovery.anomalyLevel, survivors, crew: crew.length };
        if (this.state.status === 'defeat') {
            const why = this.crew.isCrewDead() ? 'Toda la tripulación ha perecido.' : `Se agotó: ${this.resources.getDepleted().join(', ')}.`;
            return { type: 'defeat', title: 'Misión fallida', text: `${why} Tu carrera termina aquí.`, stats };
        }
        if (stats.research >= VICTORY_RESEARCH) {
            return { type: 'victory', title: 'Descubrimiento histórico', text: `Regresas con datos inéditos de 3I/Nyx y ${survivors} tripulantes con vida.`, stats };
        }
        return { type: 'partial', title: 'Regreso con las manos vacías', text: 'Sobrevivieron, pero los datos no bastan para justificar la misión.', stats };
    }
    getState() { return this.state; }
}
