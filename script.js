let currentStep = 0;
let isBanPhase = false;
let activePrebanSlot = null;
let draftOrder = [];

window.onload = function() {
    setupNewDraft();

    // Setup clics Pre-ban
    document.getElementById('preban-1').onclick = () => activePrebanSlot = 'preban-1';
    document.getElementById('preban-2').onclick = () => activePrebanSlot = 'preban-2';
};

function setupNewDraft() {
    currentStep = 0;
    isBanPhase = false;

    // Aléatoire : qui commence ?
    const startingTeam = Math.random() < 0.5 ? "red" : "blue";
    const secondTeam = (startingTeam === "red") ? "blue" : "red";

    // Ordre de Draft : 1 - 2 - 2 - 2 - 2 - 1
    draftOrder = [
        `${startingTeam}-1`, 
        `${secondTeam}-1`, `${secondTeam}-2`,
        `${startingTeam}-2`, `${startingTeam}-3`,
        `${secondTeam}-3`, `${secondTeam}-4`,
        `${startingTeam}-4`, `${startingTeam}-5`,
        `${secondTeam}-5`
    ];

    updateStatus();
    highlightNextSlot();
}

function selectHero(heroName) {
    if (isBanPhase) return;

    const imgPath = `images/${heroName}.png`;
    const heroHTML = `<img src="${imgPath}">`;

    if (activePrebanSlot) {
        document.getElementById(activePrebanSlot).innerHTML = heroHTML;
        activePrebanSlot = null;
        return;
    }

    if (currentStep < draftOrder.length) {
        const targetId = draftOrder[currentStep];
        const slot = document.getElementById(targetId);
        
        slot.innerHTML = heroHTML;
        slot.classList.remove('glow-red', 'glow-blue'); // Retire la lueur car rempli

        // Setup clic pour ban final
        slot.onclick = function() {
            if (isBanPhase) slot.classList.toggle('banned');
        };

        currentStep++;
        updateStatus();
        highlightNextSlot();
    }
}

function highlightNextSlot() {
    // On nettoie tout
    document.querySelectorAll('.slot').forEach(s => s.classList.remove('glow-red', 'glow-blue'));

    // On illumine le prochain
    if (currentStep < draftOrder.length) {
        const nextId = draftOrder[currentStep];
        const nextSlot = document.getElementById(nextId);
        if (nextSlot) {
            const isRed = nextId.includes('red');
            nextSlot.classList.add(isRed ? 'glow-red' : 'glow-blue');
        }
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
    location.reload();
}
