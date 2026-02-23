let currentStep = 0;
let isBanPhase = false;
let activePrebanSlot = null;

const draftOrder = ["red-1", "blue-1", "blue-2", "red-2", "red-3", "blue-3", "blue-4", "red-4", "red-5", "blue-5"];

// Initialisation des clics Pre-ban
window.onload = function() {
    const pb1 = document.getElementById('preban-1');
    const pb2 = document.getElementById('preban-2');
    if(pb1) pb1.onclick = () => activePrebanSlot = 'preban-1';
    if(pb2) pb2.onclick = () => activePrebanSlot = 'preban-2';
};

function selectHero(heroName) {
    if (isBanPhase) return;

    // Création de la balise image simple (Taille réelle)
    const imgPath = `images/${heroName}.png`;
    const heroHTML = `<img src="${imgPath}" alt="${heroName}">`;

    // 1. Gestion Pre-bans
    if (activePrebanSlot) {
        document.getElementById(activePrebanSlot).innerHTML = heroHTML;
        activePrebanSlot = null;
        return;
    }

    // 2. Gestion Draft
    if (currentStep < draftOrder.length) {
        const targetId = draftOrder[currentStep];
        const slot = document.getElementById(targetId);
        
        slot.innerHTML = heroHTML;
        
        // Setup du ban final (cliquable après la draft)
        if (!targetId.includes('-3')) {
            slot.onclick = function() {
                if (isBanPhase) slot.classList.toggle('banned');
            };
        }

        currentStep++;
        updateStatusDisplay();
    }
}

function updateStatusDisplay() {
    const msg = document.getElementById('status-message');
    if (currentStep < draftOrder.length) {
        const nextId = draftOrder[currentStep];
        const isRed = nextId.includes('red');
        msg.innerHTML = `TOUR : <span style="color:${isRed ? '#ff007a' : '#00f2ff'}">${isRed ? 'ROUGE' : 'BLEU'}</span>`;
    } else {
        isBanPhase = true;
        msg.innerHTML = "<span style='color:#ffd700'>BAN FINAL : CLIQUEZ SUR LES ENNEMIS</span>";
    }
}

function resetDraft() {
    location.reload();
}
