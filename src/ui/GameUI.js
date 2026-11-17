import { MAX_TURNS, MISSION_HOURS, RESOURCE_MAX } from '../utils/constants.js';
import { loadoutData } from '../data/loadoutData.js';

const $ = id => document.getElementById(id);
const L = { oxygen: 'O₂', food: 'Food', energy: 'Energy', materials: 'Mat', researchLevel: 'Research', anomalyLevel: 'Anomaly' };
let gm, onPlay, onConfirmLoadout, toastTimer;
let selectedShip = null, selectedArtifact = null;
let selectedCrew = [], flippedCards = new Set(), currentLoadoutRound = 1;
const sign = v => (v > 0 ? '+' : '') + v;

const chips = (e = {}) => [
    ...Object.entries(e.resources ?? {}).map(([k, v]) => `${sign(v)} ${L[k]}`),
    ...Object.entries(e.discovery ?? {}).map(([k, v]) => `${sign(v)} ${L[k]}`),
    ...(e.crew?.health ? [`${sign(e.crew.health)} HP`] : []),
    ...(e.crew?.mentalHealth ? [`${sign(e.crew.mentalHealth)} Mind`] : [])
].map(c => `<span>${c}</span>`).join('');

export const GameUI = {
    init(gameManager, playHandler) { gm = gameManager; onPlay = playHandler; },

    initLoadout(confirmHandler) {
        onConfirmLoadout = confirmHandler;
        this.renderLoadout();
    },

    getLoadout() {
        return {
            ship: loadoutData.ships.find(item => item.id === selectedShip),
            artifact: loadoutData.artifacts.find(item => item.id === selectedArtifact),
            crew: selectedCrew.map(id => loadoutData.crew.find(item => item.id === id))
        };
    },

    confirmLoadout() {
        const loadout = this.getLoadout();
        if (!loadout.ship || !loadout.artifact || loadout.crew.length !== loadout.ship.crewCapacity) return;
        onConfirmLoadout();
    },

    resetLoadout() {
        selectedShip = null;
        selectedArtifact = null;
        selectedCrew = [];
        flippedCards.clear();
        currentLoadoutRound = 1;
        this.renderLoadout();
    },

    nextLoadoutRound() {
        if (!this.isCurrentRoundComplete()) return;
        currentLoadoutRound = Math.min(3, currentLoadoutRound + 1);
        this.renderLoadout();
    },

    previousLoadoutRound() {
        currentLoadoutRound = Math.max(1, currentLoadoutRound - 1);
        this.renderLoadout();
    },

    isCurrentRoundComplete() {
        if (currentLoadoutRound === 1) return Boolean(selectedShip);
        if (currentLoadoutRound === 2) return Boolean(selectedArtifact);
        const ship = loadoutData.ships.find(item => item.id === selectedShip);
        return Boolean(ship && selectedArtifact && selectedCrew.length === ship.crewCapacity);
    },

    renderLoadout() {
        const ship = loadoutData.ships.find(item => item.id === selectedShip);
        const capacity = ship?.crewCapacity ?? 0;
        const loadout = this.getLoadout();
        const renderCards = (containerId, items, category, selectedItems, onSelect) => {
            $(containerId).innerHTML = items.map(item => {
                const active = selectedItems.includes(item.id);
                const locked = category === 'crew' && ship?.defaultCrew === item.id;
                const flipped = flippedCards.has(`${category}:${item.id}`);
                const asset = category === 'crew'
                    ? `<span class="crew-emblem" aria-hidden="true">${item.emblem}</span>`
                    : item.imagePath
                        ? `<img class="asset-slot__image" src="${item.imagePath}" alt="${item.name}">`
                        : `<span class="asset-slot__placeholder"><span>IMAGE SLOT</span><strong>${item.name}</strong><small>PATH NOT ASSIGNED</small></span>`;
                return `<button class="flip-card${active ? ' is-selected' : ''}${flipped ? ' is-flipped' : ''}${locked ? ' is-locked' : ''}" type="button" data-loadout-category="${category}" data-loadout-id="${item.id}" aria-pressed="${active}" aria-label="${item.name}: flip and select">
                    <span class="flip-card__inner">
                        <span class="flip-card__face flip-card__front">
                            <span class="flip-card__code">${item.code}</span>
                            <span class="flip-card__visual${category === 'crew' ? ' flip-card__visual--crew' : ''}">${asset}</span>
                            <strong>${item.name}</strong><span class="flip-card__subtitle">${item.subtitle}</span>
                            ${locked ? '<span class="crew-lock-badge">DEFAULT // LOCKED</span>' : ''}
                        </span>
                        <span class="flip-card__face flip-card__back">
                            <span class="flip-card__code">${item.code} // BRIEF</span>
                            <strong>${item.name}</strong><span class="flip-card__subtitle">${item.subtitle}</span>
                            <span class="flip-card__description">${item.description}</span>
                            ${locked ? '<span class="crew-lock-badge">DEFAULT // LOCKED</span>' : ''}
                            ${active ? '<span class="selected-badge">SELECTED</span>' : ''}
                        </span>
                    </span>
                </button>`;
            }).join('');
            $(containerId).querySelectorAll('.flip-card').forEach(button => {
                button.addEventListener('click', () => {
                    const key = `${category}:${button.dataset.loadoutId}`;
                    if (flippedCards.has(key)) flippedCards.delete(key);
                    else flippedCards.add(key);
                    onSelect(button.dataset.loadoutId);
                });
            });
        };

        renderCards('loadout-ships', loadoutData.ships, 'ship', selectedShip ? [selectedShip] : [], id => {
            if (selectedShip !== id) {
                selectedShip = id;
                selectedCrew = [];
                const selected = loadoutData.ships.find(item => item.id === id);
                if (selected.defaultCrew) selectedCrew = [selected.defaultCrew];
            }
            this.renderLoadout();
        });
        renderCards('loadout-artifacts', loadoutData.artifacts, 'artifact', selectedArtifact ? [selectedArtifact] : [], id => {
            selectedArtifact = id;
            this.renderLoadout();
        });
        renderCards('loadout-crew', loadoutData.crew, 'crew', selectedCrew, id => {
            const locked = ship?.defaultCrew === id;
            if (!locked && selectedCrew.includes(id)) selectedCrew = selectedCrew.filter(memberId => memberId !== id);
            else if (!locked && selectedCrew.length < capacity) selectedCrew = [...selectedCrew, id];
            this.renderLoadout();
        });

        $('ship-count').textContent = `${selectedShip ? 1 : 0} / 1`;
        $('artifact-count').textContent = `${selectedArtifact ? 1 : 0} / 1`;
        $('crew-count').textContent = `${selectedCrew.length} / ${capacity}`;
        $('loadout-round-rule').textContent = ship
            ? ship.defaultCrew
                ? 'CREW RULE // DANKO DEFAULT + 1 ADDITIONAL SPECIALIST'
                : `CREW RULE // SELECT EXACTLY ${capacity} ${capacity === 1 ? 'SPECIALIST' : 'SPECIALISTS'}`
            : 'Select a spacecraft to view crew capacity.';

        for (let round = 1; round <= 3; round++) {
            const panel = $(`loadout-round-${round}`);
            panel.hidden = round !== currentLoadoutRound;
            panel.classList.toggle('is-active', round === currentLoadoutRound);
            const indicator = document.querySelector(`[data-round-indicator="${round}"]`);
            indicator.classList.toggle('is-active', round === currentLoadoutRound);
            indicator.classList.toggle('is-complete', round < currentLoadoutRound);
            if (round === currentLoadoutRound) indicator.setAttribute('aria-current', 'step');
            else indicator.removeAttribute('aria-current');
        }

        const values = [
            ['VESSEL', loadout.ship?.name ?? 'UNASSIGNED'],
            ['ARTIFACT', loadout.artifact?.name ?? 'UNASSIGNED'],
            ['SPECIALISTS', loadout.crew.map(member => member.name).join(' / ') || 'UNASSIGNED']
        ];
        $('loadout-summary').innerHTML = values.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join('');
        $('loadout-capacity').textContent = ship
            ? ship.defaultCrew
                ? 'CREW CAPACITY // DANKO DEFAULT + 1 SPECIALIST'
                : `CREW CAPACITY // ${capacity} ${capacity === 1 ? 'SPECIALIST' : 'SPECIALISTS'}`
            : 'CREW CAPACITY // SELECT A SPACECRAFT';
        $('btn-loadout-previous').disabled = currentLoadoutRound === 1;
        $('btn-loadout-next').hidden = currentLoadoutRound === 3;
        $('btn-loadout-next').disabled = !this.isCurrentRoundComplete();
        $('btn-confirm-loadout').hidden = currentLoadoutRound !== 3;
        $('btn-confirm-loadout').disabled = !this.isCurrentRoundComplete();
        const complete = Boolean(loadout.ship && loadout.artifact && loadout.crew.length === capacity);
        $('loadout-lock').textContent = complete ? 'CONFIGURATION VERIFIED // LAUNCH AUTHORIZED' : 'SELECT REQUIRED LOADOUT ITEMS TO CONTINUE';
        $('loadout-lock').classList.toggle('is-ready', complete);
    },

    renderAll() { this.renderHud(); this.renderHand(); },

    renderHud() {
        const s = gm.getState();
        $('hud-stats').innerHTML = Object.entries(s.resources).map(([key, value]) => {
            const capped = RESOURCE_MAX[key] !== Infinity;
            return `<div class="stat"><span>${L[key]} ${value}</span><div class="bar"><i class="${capped && value <= 25 ? 'low' : ''}" style="width:${capped ? value : 100}%"></i></div></div>`;
        }).join('');
        $('hud-crew').innerHTML = s.crew.map(member => `<span class="chip ${member.status}" title="HP ${member.health} · Mind ${member.mentalHealth}">${member.name}</span>`).join('');
        $('hud-meta').textContent = `T+${Math.round((s.turn - 1) * MISSION_HOURS / MAX_TURNS)}h / ${MISSION_HOURS}h · Research ${s.discovery.researchLevel}`;
    },

    renderHand() {
        const hand = $('card-hand');
        $('plays-left').textContent = `Plays: ${gm.cards.playsLeft}`;
        hand.innerHTML = '';
        gm.cards.hand.forEach(c => {
            const b = document.createElement('button');
            b.className = `card card--${c.type}`;
            b.disabled = !gm.cards.canPlay(c);
            b.innerHTML = `<strong>${c.title}</strong><small>${c.description}</small><em>${chips(c.effect)}</em>`;
            b.addEventListener('click', () => onPlay(c.uid));
            hand.append(b);
        });
    },

    showEvent(ev) {
        const el = $('event-banner');
        el.hidden = !ev;
        if (ev) { el.className = `event-banner event--${ev.type}`; el.innerHTML = `<strong>${ev.title}</strong> — ${ev.description}`; }
    },

    renderEnding(e) {
        $('ending-title').textContent = e.title;
        $('ending-text').textContent = e.text;
        $('ending-stats').innerHTML = `<li>Research: ${e.stats.research}</li><li>Anomaly: ${e.stats.anomaly}</li><li>Survivors: ${e.stats.survivors}/${e.stats.crew}</li>`;
        $('screen-ending').dataset.result = e.type;
    },

    setNextEnabled(on) { $('btn-next-page').disabled = !on; },
    setHint(t) { $('minigame-hint').textContent = t; },

    toast(msg) {
        const el = $('toast');
        el.textContent = msg; el.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
    }
};
