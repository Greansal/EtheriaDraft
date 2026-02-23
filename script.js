// Ordre alterné strict : 1 - 2 - 2 - 2 - 2 - 1
const redFirst = ["red-1", "blue-1", "blue-2", "red-2", "red-3", "blue-3", "blue-4", "red-4", "red-5", "blue-5"];
const blueFirst = ["blue-1", "red-1", "red-2", "blue-2", "blue-3", "red-3", "red-4", "blue-4", "blue-5", "red-5"];

function selectHero(heroName) {
    if (isBanPhase) return;

    // Création de l'élément image avec la classe de verrouillage
    const imgHTML = `<img src="images/${heroName}.png" class="hero-img-fix">`;

    // 1. Gestion des Pre-bans (si un slot est sélectionné)
    if (activePrebanSlot) {
        const slot = document.getElementById(activePrebanSlot);
        slot.innerHTML = imgHTML;
        activePrebanSlot = null;
        return;
    }

    // 2. Gestion du Draft (1-2-2-2-1)
    if (currentStep < draftOrder.length) {
        const targetId = draftOrder[currentStep];
        const slot = document.getElementById(targetId);
        
        slot.innerHTML = imgHTML;
        slot.classList.add('active');

        // Préparation du Ban final (sauf slot 3)
        if (!targetId.includes('-3')) {
            slot.onclick = function() {
                if (isBanPhase) slot.classList.toggle('banned');
            };
        }

        currentStep++;
        updateStatusMessage();
    }
}

function updateStatusMessage() {
    if (currentStep < draftOrder.length) {
        const nextId = draftOrder[currentStep];
        const team = nextId.includes('red') ? "ROUGE" : "BLEUE";
        const color = nextId.includes('red') ? "#ff007a" : "#00f2ff";
        document.getElementById('status-message').innerHTML = `TOUR : <span style="color:${color}">${team}</span>`;
    } else {
        isBanPhase = true;
        document.getElementById('status-message').innerHTML = "<span style='color:#ffd700'>PHASE DE BAN FINAL</span>";
    }
}
