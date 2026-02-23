let currentStep = 0;
let draftOrder = [];
let activePrebanSlot = null;
let isBanPhase = false;

// Logique officielle : 1-2-2-2-2-1
const redFirst = ["red-1", "blue-1", "blue-2", "red-2", "red-3", "blue-3", "blue-4", "red-4", "red-5", "blue-5"];
const blueFirst = ["blue-1", "red-1", "red-2", "blue-2", "blue-3", "red-3", "red-4", "blue-4", "blue-5", "red-5"];

function initDraft() {
    currentStep = 0;
    isBanPhase = false;
    const isRedStart = Math.random() < 0.5;
    draftOrder = isRedStart ? redFirst : blueFirst;
    
    updateStatusLabel(isRedStart ? "ROUGE" : "BLEU", isRedStart ? "#ff007a" : "#00f2ff");

    document.querySelectorAll('.slot').forEach(slot => {
        slot.innerHTML = `<span style="color:#333">${slot.id.split('-')[1]}</span>`;
        slot.classList.remove('active', 'banned');
        slot.style.borderColor = slot.id.includes('-3') ? "#ffd700" : "#444";
    });
}

function selectHero(heroName) {
    if (isBanPhase || currentStep >= draftOrder.length) return;

    // On injecte le conteneur "hero-container" pour le crop
    const imgHTML = `<div class="hero-container"><img src="images/${heroName}.png"></div>`;
    
    // Gestion des Pre-bans d'abord si un slot est sélectionné
    if (activePrebanSlot) {
        document.getElementById(activePrebanSlot).innerHTML = imgHTML;
        activePrebanSlot = null;
        return;
    }

    // Gestion du Draft classique
    const targetId = draftOrder[currentStep];
    const slot = document.getElementById(targetId);
    slot.innerHTML = imgHTML;
    slot.classList.add('active');

    currentStep++;
    
    if (currentStep < draftOrder.length) {
        const nextId = draftOrder[currentStep];
        const isNextRed = nextId.includes('red');
        updateStatusLabel(isNextRed ? "ROUGE" : "BLEU", isNextRed ? "#ff007a" : "#00f2ff");
        
        // Highlight visuel du prochain slot
        document.querySelectorAll('.slot').forEach(s => {
            if(!s.id.includes('-3')) s.style.borderColor = "#444";
        });
        document.getElementById(nextId).style.borderColor = "white";
    } else {
        isBanPhase = true;
        document.getElementById('status-message').innerHTML = "<span style='color:#ffd700'>BAN FINAL : CLIQUEZ SUR LES ENNEMIS</span>";
    }
}

function updateStatusLabel(team, color) {
    document.getElementById('status-message').innerHTML = `AU TOUR DE : <span style="color:${color}">${team}</span>`;
}

window.onload = initDraft;
