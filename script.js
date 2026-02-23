let currentStep = 0;
let draftOrder = [];
let activePrebanSlot = null;
let isBanPhase = false;

// L'ordre correct : 1-2-2-2-2-1
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
        
        if (slot.classList.contains('active-preban')) {
            slot.style.border = "2px solid #ff004c";
            slot.onmousedown = function(e) { e.preventDefault(); selectPrebanSlot(slot.id); };
        } else {
            // Slot 3 toujours en doré dès le début
            if (slot.id.includes('-3')) {
                slot.style.border = "2px solid #ffd700";
            } else {
                slot.style.border = "1px dashed #444";
            }
            slot.onmousedown = null;
        }
    });
}

function selectHero(heroName) {
    if (isBanPhase) return;
    
    // On met l'image dans un div "crop" pour contrôler ce qu'on cache
    const imgHTML = `<div class="crop-container"><img src="images/${heroName}.png"></div>`;
    
    if (activePrebanSlot) {
        document.getElementById(activePrebanSlot).innerHTML = imgHTML;
        activePrebanSlot = null;
        return;
    }

    if (currentStep >= draftOrder.length) return;
    
    const targetId = draftOrder[currentStep];
    const slot = document.getElementById(targetId);
    slot.innerHTML = imgHTML;
    slot.classList.add('active');
    
    // Clic pour bannir à la fin (sauf slot 3)
    if (!targetId.includes('-3')) {
        slot.onmousedown = function() { 
            if (isBanPhase) slot.classList.toggle('banned');
        };
    }

    currentStep++;
    updateStatus();
}

function updateStatus() {
    if (currentStep < draftOrder.length) {
        const nextId = draftOrder[currentStep];
        const team = nextId.includes('red') ? "ROUGE" : "BLEUE";
        const color = nextId.includes('red') ? "#ff007a" : "#00f2ff";
        document.getElementById('status-message').innerHTML = `TOUR : <span style="color:${color}">${team}</span>`;
        
        // Bordure blanche sur le slot en cours
        document.querySelectorAll('.slot').forEach(s => {
            if(!s.id.includes('-3')) s.style.borderColor = s.classList.contains('active-preban') ? "#ff004c" : "#444";
        });
        document.getElementById(nextId).style.borderColor = "white";
    } else {
        isBanPhase = true;
        document.getElementById('status-message').innerHTML = "<span style='color:#ffd700'>BAN FINAL : CLIQUEZ SUR L'ENNEMI</span>";
    }
}
