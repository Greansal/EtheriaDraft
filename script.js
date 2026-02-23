let currentStep = 0;
let draftOrder = [];
let activePrebanSlot = null;
let isBanPhase = false;

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
        slot.innerHTML = slot.id.split('-')[1];
        slot.style.backgroundColor = "#14181f";
        slot.style.boxShadow = "none";
        
        if (slot.classList.contains('active-preban')) {
            slot.style.border = "2px solid #ff004c";
            slot.onmousedown = function() { selectPrebanSlot(slot.id); };
        } else {
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
    el.style.boxShadow = "0 0 20px #ff004c";
    el.style.backgroundColor = "#300b16";
}

function selectHero(heroName) {
    if (isBanPhase) return;
    const imgHTML = `<img src="images/${heroName}.png">`;
    
    if (activePrebanSlot) {
        const slot = document.getElementById(activePrebanSlot);
        slot.innerHTML = imgHTML;
        slot.style.boxShadow = "none";
        slot.style.backgroundColor = "#14181f";
        activePrebanSlot = null;
        return;
    }

    if (currentStep >= draftOrder.length) return;
    
    const targetId = draftOrder[currentStep];
    const slot = document.getElementById(targetId);
    slot.innerHTML = imgHTML;
    slot.classList.add('active');
    
    if (!targetId.includes('-3')) {
        slot.onmousedown = function() { 
            if (isBanPhase) slot.classList.toggle('banned');
        };
    }

    currentStep++;
    highlightNextSlot();
}

function highlightNextSlot() {
    if (currentStep < draftOrder.length) {
        const nextId = draftOrder[currentStep];
        const team = nextId.includes('red') ? "ROUGE" : "BLEUE";
        const color = nextId.includes('red') ? "#ff007a" : "#00f2ff";
        document.getElementById('status-message').innerHTML = `AU TOUR DE : <span style="color:${color}">${team}</span>`;
    } else {
        isBanPhase = true;
        document.getElementById('status-message').innerHTML = "<span style='color:#ffd700'>PHASE DE BAN FINAL (Cliquez sur l'ennemi)</span>";
    }
}

function resetDraft() { initDraft(); }
window.onload = initDraft;
