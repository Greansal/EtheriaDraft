let currentStep = 0;
let draftOrder = [];
let activePrebanSlot = null;
let isBanPhase = false;

// ORDRE OFFICIEL : 1-2-2-2-2-1
const redFirst = ["red-1", "blue-1", "blue-2", "red-2", "red-3", "blue-3", "blue-4", "red-4", "red-5", "blue-5"];
const blueFirst = ["blue-1", "red-1", "red-2", "blue-2", "blue-3", "red-3", "red-4", "blue-4", "blue-5", "red-5"];

function initDraft() {
    currentStep = 0;
    activePrebanSlot = null;
    isBanPhase = false;
    
    const random = Math.random();
    if (random < 0.5) {
        draftOrder = redFirst;
        document.getElementById('status-message').innerHTML = "PHASE : PRE-BAN | <span style='color:#ff007a'>ROUGE COMMENCE</span>";
    } else {
        draftOrder = blueFirst;
        document.getElementById('status-message').innerHTML = "PHASE : PRE-BAN | <span style='color:#00f2ff'>BLEU COMMENCE</span>";
    }

    document.querySelectorAll('.slot').forEach(slot => {
        slot.classList.remove('active', 'banned');
        slot.innerHTML = `<span class="slot-number">${slot.id.split('-')[1]}</span>`;
        slot.style.backgroundColor = "#14181f";
        slot.style.boxShadow = "none";
        
        if (slot.classList.contains('active-preban')) {
            slot.style.border = "2px solid #ff004c";
            slot.onmousedown = function(e) { e.preventDefault(); selectPrebanSlot(slot.id); };
        } else {
            // Slot 3 toujours protégé (bordure dorée)
            if (slot.id.includes('-3')) {
                slot.style.border = "2px solid #ffd700";
            } else {
                slot.style.border = "1px dashed #444";
            }
            slot.onmousedown = null;
        }
    });
}

function selectPrebanSlot(slotId) {
    if (isBanPhase) return;
    document.querySelectorAll('.active-preban').forEach(s => {
        s.style.boxShadow = "none";
        s.style.backgroundColor = "#14181f";
    });
    activePrebanSlot = slotId;
    const el = document.getElementById(slotId);
    el.style.boxShadow = "0 0 15px #ff004c";
    el.style.backgroundColor = "#300b16";
}

function selectHero(heroName) {
    if (isBanPhase) return;
    
    // Structure avec wrapper pour le zoom
    const imgHTML = `<div class="img-container"><img src="images/${heroName}.png" class="hero-img"></div>`;
    
    if (activePrebanSlot) {
        const slot = document.getElementById(activePrebanSlot);
        slot.innerHTML = imgHTML;
        slot.style.boxShadow = "none";
        activePrebanSlot = null;
        return;
    }
