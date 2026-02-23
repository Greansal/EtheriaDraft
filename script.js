// Configuration de la draft
let currentStep = 0;
let isBanPhase = false;
let activePrebanSlot = null;
let startingTeam = ""; // Sera "red" ou "blue"
let draftOrder = [];

// Initialisation au chargement
window.onload = function() {
    setupNewDraft();

    // Setup clics Pre-ban
    document.getElementById('preban-1').onclick = () => activePrebanSlot = 'preban-1';
    document.getElementById('preban-2').onclick = () => activePrebanSlot = 'preban-2';
};

function setupNewDraft() {
    currentStep = 0;
    isBanPhase = false;

    // 1. Aléatoire pour savoir qui commence
    startingTeam = Math.random() < 0.5 ? "red" : "blue";
    const secondTeam = (startingTeam === "red") ? "blue" : "red";

    // 2. Définition de l'ordre alterné (1 perso, puis 2, puis 2, puis 2, puis 2, puis 1)
    // Cet ordre assure que chaque équipe finit avec 5 personnages
    draftOrder = [
        `${startingTeam}-1`, 
        `${secondTeam}-1`, `${secondTeam}-2`,
        `${startingTeam}-2`, `${startingTeam}-3`,
        `${secondTeam}-3`, `${secondTeam}-4`,
        `${startingTeam}-4`, `${startingTeam}-5`,
        `${secondTeam}-5`
    ];

    updateStatus();
}

function selectHero(heroName) {
    if (isBanPhase) return;

    const imgPath = `images/${heroName}.png`;
    const heroHTML = `<img src="${imgPath}">`;

    // Gestion du Pre-ban (hors tour de draft)
    if (activePrebanSlot) {
        document.getElementById(activePrebanSlot).innerHTML = heroHTML;
        activePrebanSlot = null;
        return;
    }

    // Gestion de la Draft
    if (currentStep < draftOrder.length) {
        const targetId = draftOrder[currentStep];
        const slot = document.getElementById(targetId);
        
        slot.innerHTML = heroHTML;

        // Setup du clic de ban final (sauf sur les slots dorés/index 3 si tu veux les protéger)
        slot.onclick = function() {
            if (isBanPhase) slot.classList.toggle('banned');
        };

        currentStep++;
        updateStatus();
    }
}

function updateStatus() {
    const msg = document.getElementById('status-message');
    
    if (currentStep < draftOrder.length) {
        const nextId = draftOrder[currentStep];
        const isRed = nextId.includes('red');
        const color = isRed ? '#ff007a' : '#00f2ff';
        const teamName = isRed ? 'ROUGE' : 'BLEUE';
        
        msg.innerHTML = `TOUR : <span style="color:${color}">ÉQUIPE ${teamName}</span>`;
    } else {
        isBanPhase = true;
        msg.innerHTML = "<span style='color:#ffd700'>BAN FINAL : CLIQUEZ SUR LES ENNEMIS</span>";
    }
}

function resetDraft() {
    // On recharge simplement la page pour tout remettre à zéro et relancer l'aléatoire
    location.reload();
}
