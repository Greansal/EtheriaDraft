let currentStep = 0;
let isBanPhase = false;
let activePrebanSlot = null;

const draftOrder = ["red-1", "blue-1", "blue-2", "red-2", "red-3", "blue-3", "blue-4", "red-4", "red-5", "blue-5"];

// Gestion des clics sur les slots de pre-ban
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('preban-1').onclick = () => activePrebanSlot = 'preban-1';
    document.getElementById('preban-2').onclick = () => activePrebanSlot = 'preban-2';
});

function selectHero(heroName) {
    if (isBanPhase) return;

    // On utilise une balise IMG pour voir l'image ENTIÈRE
    const imgPath = `images/${heroName}.png`;
    const heroHTML = `<img src="${imgPath}" alt="${heroName}">`;

    // 1. Pre-bans
    if (activePrebanSlot) {
        document.getElementById(activePrebanSlot).innerHTML = heroHTML;
        activePrebanSlot = null;
        return;
    }

    // 2. Draft
    if (currentStep < draftOrder.length) {
        const targetId = draftOrder[currentStep];
        const slot = document.getElementById(targetId);
        
        slot.innerHTML = heroHTML;
        
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
