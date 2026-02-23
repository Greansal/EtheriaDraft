let currentStep = 0;
let isBanPhase = false;
let activePrebanSlot = null;
let draftOrder = [];

window.onload = function() {
    setupNewDraft();
    
    // Initialisation des clics sur les pré-bans
    document.getElementById('preban-1').onclick = () => activePrebanSlot = 'preban-1';
    document.getElementById('preban-2').onclick = () => activePrebanSlot = 'preban-2';
};

function setupNewDraft() {
    currentStep = 0;
    isBanPhase = false;

    // Aléatoire : Pile ou face pour le premier joueur
    const startingTeam = Math.random() < 0.5 ? "red" : "blue";
    const secondTeam = (startingTeam === "red") ? "blue" : "red";

    // Ordre de Draft Serpent (1-2-2-2-2-1)
    draftOrder = [
        `${startingTeam}-1`, 
        `${secondTeam}-1`, `${secondTeam}-2`,
        `${startingTeam}-2`, `${startingTeam}-3`,
        `${secondTeam}-3`, `${secondTeam}-4`,
        `${startingTeam}-4`, `${startingTeam}-5`,
        `${secondTeam}-5`
    ];

    updateStatus();
    setTimeout(highlightNextSlot, 100);
}

function selectHero(heroName) {
    if (isBanPhase) return;

    const imgPath = `images/${heroName}.png`;
    const heroHTML = `<img src="${imgPath}">`;

    // 1. Remplissage des pré-bans
    if (activePrebanSlot) {
        document.getElementById(activePrebanSlot).innerHTML = heroHTML;
        activePrebanSlot = null;
        return;
    }

    // 2. Remplissage de la Draft
    if (currentStep < draftOrder.length) {
        const targetId = draftOrder[currentStep];
        const slot = document.getElementById(targetId);
        
        slot.innerHTML = heroHTML;
        slot.classList.remove('glow-red', 'glow-blue');

        // Permet de cliquer sur l'image pour bannir à la fin
        slot.onclick = function() {
            if (isBanPhase) {
                this.classList.toggle('banned');
            }
        };

        currentStep++;
        updateStatus();
        highlightNextSlot();
    }
}

function highlightNextSlot() {
    document.querySelectorAll('.slot').forEach(s => s.classList.remove('glow-red', 'glow-blue'));
    if (currentStep < draftOrder.length) {
        const nextId = draftOrder[currentStep];
        const nextSlot = document.getElementById(nextId);
        if (nextSlot) {
            nextSlot.classList.add(nextId.includes('red') ? 'glow-red' : 'glow-blue');
        }
    }
}

function updateStatus() {
    const msg = document.getElementById('status-message');
    if (currentStep < draftOrder.length) {
        const nextId = draftOrder[currentStep];
        const isRed = nextId.includes('red');
        msg.innerHTML = `TOUR : <span style="color:${isRed ? '#ff007a' : '#00f2ff'}">ÉQUIPE ${isRed ? 'ROUGE' : 'BLEUE'}</span>`;
    } else {
        isBanPhase = true;
        msg.innerHTML = "<span style='color:#ffd700'>BAN FINAL : CLIQUEZ SUR LES ENNEMIS</span>";
    }
}

// Fonction Reset qui fonctionne
function resetDraft() {
    location.reload();
}
