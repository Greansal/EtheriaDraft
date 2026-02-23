let currentStep = 0;
let isBanPhase = false;
let activePrebanSlot = null;

const draftOrder = ["red-1", "blue-1", "blue-2", "red-2", "red-3", "blue-3", "blue-4", "red-4", "red-5", "blue-5"];

window.onload = function() {
    document.getElementById('preban-1').onclick = () => activePrebanSlot = 'preban-1';
    document.getElementById('preban-2').onclick = () => activePrebanSlot = 'preban-2';
};

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

        // On active le clic pour bannir plus tard (sauf sur le slot 3 gold)
        if (!slot.classList.contains('gold')) {
            slot.onclick = function() {
                if (isBanPhase) slot.classList.toggle('banned');
            };
        }

        currentStep++;
        updateStatus();
    }
}

function updateStatus() {
    const msg = document.getElementById('status-message');
    if (currentStep < draftOrder.length) {
        const nextId = draftOrder[currentStep];
        const team = nextId.includes('red') ? 'ROUGE' : 'BLEUE';
        msg.innerText = `TOUR : ÉQUIPE ${team}`;
    } else {
        isBanPhase = true;
        msg.innerHTML = "<span style='color:#ffd700'>BAN FINAL : CLIQUEZ SUR LES ENNEMIS</span>";
    }
}

function resetDraft() { location.reload(); }
