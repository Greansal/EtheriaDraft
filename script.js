let currentStep = 0;
let isBanPhase = false;
let activePrebanSlot = null;
let draftOrder = [];

window.onload = function() {
    setupNewDraft();
    document.getElementById('preban-1').onclick = () => activePrebanSlot = 'preban-1';
    document.getElementById('preban-2').onclick = () => activePrebanSlot = 'preban-2';
};

function setupNewDraft() {
    currentStep = 0;
    isBanPhase = false;
    const startingTeam = Math.random() < 0.5 ? "red" : "blue";
    const secondTeam = (startingTeam === "red") ? "blue" : "red";

    draftOrder = [
        `${startingTeam}-1`, `${secondTeam}-1`, `${secondTeam}-2`,
        `${startingTeam}-2`, `${startingTeam}-3`, `${secondTeam}-3`,
        `${secondTeam}-4`, `${startingTeam}-4`, `${startingTeam}-5`, `${secondTeam}-5`
    ];

    updateStatus();
    setTimeout(highlightNextSlot, 100);
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
        slot.classList.remove('glow-red', 'glow-blue');
        
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

function resetDraft() { location.reload(); }
