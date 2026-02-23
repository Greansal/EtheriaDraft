let currentStep = 0;
let draftOrder = [];
let activePrebanSlot = null;
let isBanPhase = false;

// ORDRE : 1-2-2-2-1
const redFirst = ["red-1", "blue-1", "blue-2", "red-2", "red-3", "blue-3", "blue-4", "red-4", "red-5", "blue-5"];
const blueFirst = ["blue-1", "red-1", "red-2", "blue-2", "blue-3", "red-3", "red-4", "blue-4", "blue-5", "red-5"];

function initDraft() {
    currentStep = 0;
    isBanPhase = false;
    const isRed = Math.random() < 0.5;
    draftOrder = isRed ? redFirst : blueFirst;
    
    document.getElementById('status-message').innerHTML = `TOUR : <span style="color:${isRed?'#ff007a':'#00f2ff'}">${isRed?'ROUGE':'BLEU'}</span>`;

    document.querySelectorAll('.slot').forEach(slot => {
        slot.innerHTML = `<span style="color:#333; font-size:10px">${slot.id.split('-')[1]}</span>`;
        slot.classList.remove('active', 'banned');
    });
}

function selectHero(heroName) {
    if (isBanPhase) return;

    // Création de l'image avec le masque protecteur
    const imgHTML = `<div class="hero-mask"><img src="images/${heroName}.png"></div>`;

    // Si on clique sur un pre-ban
    if (activePrebanSlot) {
        document.getElementById(activePrebanSlot).innerHTML = imgHTML;
        activePrebanSlot = null;
        return;
    }

    if (currentStep < draftOrder.length) {
        const slot = document.getElementById(draftOrder[currentStep]);
        slot.innerHTML = imgHTML;
        slot.classList.add('active');
        
        // Ajout du clic pour bannir plus tard
        if (!slot.id.includes('-3')) {
            slot.onmousedown = () => { if(isBanPhase) slot.classList.toggle('banned'); };
        }

        currentStep++;
        updateStatus();
    }
}

function updateStatus() {
    if (currentStep < draftOrder.length) {
        const nextId = draftOrder[currentStep];
        const isRed = nextId.includes('red');
        document.getElementById('status-message').innerHTML = `TOUR : <span style="color:${isRed?'#ff007a':'#00f2ff'}">${isRed?'ROUGE':'BLEU'}</span>`;
    } else {
        isBanPhase = true;
        document.getElementById('status-message').innerHTML = "<span style='color:#ffd700'>BAN FINAL (CLIQUEZ SUR L'ENNEMI)</span>";
    }
}

function selectPrebanSlot(id) {
    activePrebanSlot = id;
    document.querySelectorAll('.active-preban').forEach(s => s.style.boxShadow = "none");
    document.getElementById(id).style.boxShadow = "0 0 10px #ff004c";
}

window.onload = initDraft;
