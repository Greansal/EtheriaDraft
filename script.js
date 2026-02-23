let currentStep = 0;
let isBanPhase = false;
let activePrebanSlot = null;

const draftOrder = ["red-1", "blue-1", "blue-2", "red-2", "red-3", "blue-3", "blue-4", "red-4", "red-5", "blue-5"];

// Initialisation au chargement de la page
window.onload = function() {
    // 1. On transforme la grille pour utiliser les images en background (cadrage parfait)
    const cards = document.querySelectorAll('.hero-card');
    cards.forEach(card => {
        const heroName = card.getAttribute('onclick').match(/'([^']+)'/)[1];
        const imgPath = `images/${heroName}.png`;
        card.innerHTML = `<div class="hero-view" style="background-image: url('${imgPath}')"></div>`;
    });

    // 2. On rend les slots de pre-ban sélectionnables
    document.getElementById('preban-1').onclick = () => activePrebanSlot = 'preban-1';
    document.getElementById('preban-2').onclick = () => activePrebanSlot = 'preban-2';
};

function selectHero(heroName) {
    if (isBanPhase) return;

    const imgPath = `images/${heroName}.png`;
    const heroHTML = `<div class="hero-view" style="background-image: url('${imgPath}')"></div>`;

    if (activePrebanSlot) {
        document.getElementById(activePrebanSlot).innerHTML = heroHTML;
        activePrebanSlot = null;
        return;
    }

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

function resetDraft() { location.reload(); }
