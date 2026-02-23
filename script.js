let currentStep = 0;
let isBanPhase = false;
let activePrebanSlot = null;

// Ordre de sélection : 1-2-2-2-1
const draftOrder = ["red-1", "blue-1", "blue-2", "red-2", "red-3", "blue-3", "blue-4", "red-4", "red-5", "blue-5"];

// 1. AU CHARGEMENT : On transforme la grille pour utiliser le zoom CSS
window.onload = function() {
    const cards = document.querySelectorAll('.hero-card');
    cards.forEach(card => {
        // On récupère le nom du héros dans le onclick
        const heroName = card.getAttribute('onclick').match(/'([^']+)'/)[1];
        const imgPath = `images/${heroName}.png`;
        // On remplace le contenu (img + texte) par la div hero-view zoomée
        card.innerHTML = `<div class="hero-view" style="background-image: url('${imgPath}')"></div>`;
    });

    // On prépare les slots de Pre-ban pour qu'ils soient cliquables
    document.getElementById('preban-1').onclick = () => activePrebanSlot = 'preban-1';
    document.getElementById('preban-2').onclick = () => activePrebanSlot = 'preban-2';
};

// 2. SELECTION DU HEROS
function selectHero(heroName) {
    if (isBanPhase) return;

    const imgPath = `images/${heroName}.png`;
    const heroHTML = `<div class="hero-view" style="background-image: url('${imgPath}')"></div>`;

    // Cas 1 : On remplit un slot de Pre-ban (si un slot en haut a été cliqué)
    if (activePrebanSlot) {
        document.getElementById(activePrebanSlot).innerHTML = heroHTML;
        activePrebanSlot = null;
        return;
    }

    // Cas 2 : On remplit la draft classique
    if (currentStep < draftOrder.length) {
        const targetId = draftOrder[currentStep];
        const slot = document.getElementById(targetId);
        
        slot.innerHTML = heroHTML;
        
        // Permet de barrer le perso (Ban) en fin de draft (sauf slot 3 doré)
        if (!targetId.includes('-3')) {
            slot.onclick = function() {
                if (isBanPhase) slot.classList.toggle('banned');
            };
        }

        currentStep++;
        updateStatusDisplay();
    }
}

// 3. MISE A JOUR DU MESSAGE DE STATUT
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

// 4. RESET
function resetDraft() {
    location.reload();
}
