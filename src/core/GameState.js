// Datos de la partida (antes este nombre lo usaba el manejador de pantallas)
import { initialResources, initialDiscovery } from '../data/initialResources.js';
import { MAX_TURNS } from '../utils/constants.js';

export class GameState {
    constructor() {
        this.status = 'preparation'; // preparation | active | defeat | evaluation
        this.turn = 1;
        this.maxTurns = MAX_TURNS;
        this.resources = { ...initialResources };
        this.discovery = { ...initialDiscovery };
        this.ship = null;
        this.artifact = null;
        this.selectedCrew = [];
        this.crew = [];
        this.history = [];
    }
    addHistory(entry) { this.history.push(entry); }
}
