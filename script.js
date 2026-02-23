let currentStep = 0;
let draftOrder = [];
let activePrebanSlot = null;
let isBanPhase = false; // Nouvelle variable pour la phase de ban final

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
        slot.style.boxShadow = "none";
        slot.style.backgroundColor = "#14181f";
        slot.innerHTML = slot.id.split('-')[1];
        slot.onclick = null; // Reset des clics

        if (slot.classList.contains('active-preban')) {
            slot.style.border = "2px solid #ff004c";
            slot.onmousedown = function() { selectPrebanSlot(slot.id); };
        } else {
            // Style spécial pour le Slot 3 (Protect)
            if (slot.id.includes('-3')) {
                slot.style.border = "2px solid #ffd700";
                slot.classList.add('protect-slot');
            } else {
                slot.style.border = "2px dashed #333";
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
    if (isBanPhase) return; // Empêche d'ajouter des persos pendant le ban final

    const imgHTML = `<img src="images/${heroName}.png" style="width:100%; height:100%; object-fit:cover; object-position: top;">`;
    
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
    
    // Une fois l'image insérée, on rend le slot cliquable pour le futur ban (sauf le 3)
    if (!targetId.includes('-3')) {
        slot.onclick = function() { toggleBan(targetId); };
    }

    currentStep++;
    highlightNextSlot();
}

function toggleBan(slotId) {
    if (!isBanPhase) return; // Le ban final n'est possible qu'à la fin
    const slot = document.getElementById(slotId);
    slot.classList.toggle('banned');
}

function highlightNextSlot() {
    document.querySelectorAll('.slot').forEach(s => {
        if (!s.classList.contains('active-preban') && !s.id.includes('-3')) {
            s.style.border = "2px dashed #333";
        }
    });
    
    if (currentStep < draftOrder.length) {
        const nextId = draftOrder[currentStep];
        const nextSlot = document.getElementById(nextId);
        nextSlot.style.border = "2px solid white";
        
        const team = nextId.includes('red') ? "ROUGE" : "BLEUE";
        const color = nextId.includes('red') ? "#ff007a" : "#00f2ff";
        document.getElementById('status-message').innerHTML = `AU TOUR DE : <span style="color:${color}">${team}</span>`;
    } else {
        // FIN DE LA DRAFT -> PASSAGE EN PHASE DE BAN
        isBanPhase = true;
        document.getElementById('status-message').innerHTML = "<span style='color:#ffd700'>PHASE DE BAN FINAL (Cliquez sur les ennemis)</span>";
    }
}

function resetDraft() { initDraft(); }
window.onload = initDraft;
