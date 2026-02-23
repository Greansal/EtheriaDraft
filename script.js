let currentStep = 0;
let draftOrder = [];
let activePrebanSlot = null;
let isBanPhase = false;

// Ordre strict : 1 - 2 - 2 - 2 - 2 - 1
const redFirst = ["red-1", "blue-1", "blue-2", "red-2", "red-3", "blue-3", "blue-4", "red-4", "red-5", "blue-5"];
const blueFirst = ["blue-1", "red-1", "red-2", "blue-2", "blue-3", "red-3", "red-4", "blue-4", "blue-5", "red-5"];

function initDraft() {
    currentStep = 0;
    activePrebanSlot = null;
    isBanPhase = false;
    
    const random = Math.random();
    draftOrder = (random < 0.5) ? redFirst : blueFirst;
    const color = (random < 0.5) ? "#ff007a" : "#00f2ff";
    const team = (random < 0.5) ? "ROUGE" : "BLEUE";
    
    document.getElementById('status-message').innerHTML = `PHASE : PRE-BAN | <span style='color:${color}'>${team} COMMENCE</span>`;

    document.querySelectorAll('.slot').forEach(slot => {
        slot.classList.remove('active', 'banned');
        slot.innerHTML = `<span class="slot-num">${slot.id.split('-')[1]}</span>`;
        
        if (slot.classList.contains('active-preban')) {
            slot.onmousedown = function() { selectPrebanSlot(slot.id); };
        } else {
            slot.onmousedown = null;
        }
    });
}

function selectHero(heroName) {
    if (isBanPhase) return;
    
    // Le secret : un div "mask" qui contient l'image
    const imgHTML = `<div class="mask"><img src="images/${heroName}.png"></div>`;
    
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
        
        if (!targetId.includes('-3')) {
            slot.onmousedown = function() { if (isBanPhase) slot.classList.toggle('banned'); };
        }

        currentStep++;
        updateStatus();
    }
}

function updateStatus() {
    if (currentStep < draftOrder.length) {
        const nextId = draftOrder[currentStep];
        const isRed = nextId.includes('red');
        document.getElementById('status-message').innerHTML = `TOUR : <span style="color:${isRed ? '#ff007a' : '#00f2ff'}">${isRed ? 'ROUGE' : 'BLEUE'}</span>`;
        
        document.querySelectorAll('.slot').forEach(s => s.style.borderColor = s.id.includes('-3') ? "#ffd700" : "#444");
        document.getElementById(nextId).style.borderColor = "white";
    } else {
        isBanPhase = true;
        document.getElementById('status-message').innerHTML = "<span style='color:#ffd700'>BAN FINAL : CLIQUEZ SUR L'ENNEMI</span>";
    }
}

function selectPrebanSlot(slotId) {
    activePrebanSlot = slotId;
    document.querySelectorAll('.active-preban').forEach(s => s.style.boxShadow = "none");
    document.getElementById(slotId).style.boxShadow = "0 0 10px #ff004c";
}

window.onload = initDraft;
