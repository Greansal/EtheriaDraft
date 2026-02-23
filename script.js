let currentStep = 0;
let draftOrder = [];
let activePrebanSlot = null;
let isBanPhase = false;

// ORDRE OFFICIEL : 1 - 2 - 2 - 2 - 1
const redFirst = ["red-1", "blue-1", "blue-2", "red-2", "red-3", "blue-3", "blue-4", "red-4", "red-5", "blue-5"];
const blueFirst = ["blue-1", "red-1", "red-2", "blue-2", "blue-3", "red-3", "red-4", "blue-4", "blue-5", "red-5"];

function initDraft() {
    currentStep = 0;
    activePrebanSlot = null;
    isBanPhase = false;
    
    // Détermination de qui commence
    const random = Math.random();
    draftOrder = (random < 0.5) ? redFirst : blueFirst;
    const startColor = (random < 0.5) ? "#ff007a" : "#00f2ff";
    const startTeam = (random < 0.5) ? "ROUGE" : "BLEUE";
    
    document.getElementById('status-message').innerHTML = `PHASE : PRE-BAN | <span style='color:${startColor}'>${startTeam} COMMENCE</span>`;

    document.querySelectorAll('.slot').forEach(slot => {
        slot.classList.remove('active', 'banned');
        slot.innerHTML = `<span class="slot-num">${slot.id.split('-')[1]}</span>`;
        slot.style.border = slot.id.includes('-3') ? "2px solid #ffd700" : "1px dashed #444";
        
        if (slot.classList.contains('active-preban')) {
            slot.style.border = "2px solid #ff004c";
            slot.onmousedown = function() { selectPrebanSlot(slot.id); };
        } else {
            slot.onmousedown = null;
        }
    });
}

function selectHero(heroName) {
    if (isBanPhase) return;
    
    // On crée l'image avec une classe de contrôle
    const imgHTML = `<div class="hero-crop"><img src="images/${heroName}.png"></div>`;
    
    if (activePrebanSlot) {
        document.getElementById(activePrebanSlot).innerHTML = imgHTML;
        activePrebanSlot = null;
        return;
    }

    if (currentStep < draftOrder.length) {
        const targetId = draftOrder[currentStep];
        const slot = document.getElementById(targetId);
        slot.innerHTML = imgHTML;
        slot.classList.add('active');
        
        // Configuration du clic de ban final (interdit sur slot 3)
        if (!targetId.includes('-3')) {
            slot.onmousedown = function() { if (isBanPhase) slot.classList.toggle('banned'); };
        }

        currentStep++;
        updateDisplay();
    }
}

function updateDisplay() {
    if (currentStep < draftOrder.length) {
        const nextId = draftOrder[currentStep];
        const isRed = nextId.includes('red');
        document.getElementById('status-message').innerHTML = `TOUR : <span style="color:${isRed ? '#ff007a' : '#00f2ff'}">${isRed ? 'ROUGE' : 'BLEUE'}</span>`;
        
        // Highlight visuel du prochain slot
        document.querySelectorAll('.slot').forEach(s => {
            if (!s.id.includes('-3') && !s.classList.contains('active-preban')) s.style.borderColor = "#444";
        });
        document.getElementById(nextId).style.borderColor = "white";
    } else {
        isBanPhase = true;
        document.getElementById('status-message').innerHTML = "<span style='color:#ffd700'>BAN FINAL : CLIQUEZ SUR L'ENNEMI</span>";
    }
}
