let currentStep = 0;
let isBanPhase = false;
let activePrebanSlot = null;
let draftOrder = [];

// Ordre : 1 rouge, 1 bleu, 1 bleu, 1 rouge, 1 rouge... (Adapté selon tes besoins)
const redFirst = ["red-1", "blue-1", "blue-2", "red-2", "red-3", "blue-3", "blue-4", "red-4", "red-5", "blue-5"];
const blueFirst = ["blue-1", "red-1", "red-2", "blue-2", "blue-3", "red-3", "red-4", "blue-4", "blue-5", "red-5"];

function initDraft() {
    currentStep = 0;
    isBanPhase = false;
    activePrebanSlot = null;
    
    // Détermination aléatoire du premier qui commence
    const startsRed = Math.random() < 0.5;
    draftOrder = startsRed ? redFirst : blueFirst;
    
    document.getElementById('status-message').innerHTML = `PHASE : PRE-BAN | <span style="color:${startsRed ? '#ff007a' : '#00f2ff'}">${startsRed ? 'ROUGE' : 'BLEUE'} COMMENCE</span>`;

    // Reset visuel des slots
    document.querySelectorAll('.slot').forEach(slot => {
        slot.innerHTML = ""; // Vide le texte (1, 2, 3...)
        slot.classList.remove('active', 'banned');
    });
}

// CETTE FONCTION EST CELLE APPELÉE PAR LE CLIC SUR LES IMAGES DU MILIEU
function selectHero(heroName) {
    if (isBanPhase) return;

    // Création de l'image (ON NE MET QUE L'IMAGE, PAS DE TEXTE)
    const imgHTML = `<img src="images/${heroName}.png" alt="${heroName}">`;

    // 1. Si on a cliqué sur un slot de Pre-ban en haut d'abord
    if (activePrebanSlot) {
        document.getElementById(activePrebanSlot).innerHTML = imgHTML;
        activePrebanSlot = null;
        return;
    }

    // 2. Sinon, on suit l'ordre de la Draft
    if (currentStep < draftOrder.length) {
        const targetId = draftOrder[currentStep];
        const slot = document.getElementById(targetId);
        
        slot.innerHTML = imgHTML;
        slot.classList.add('active');

        // Permettre le ban au clic (sauf sur le slot 3 qui est protégé)
        if (!targetId.includes('-3')) {
            slot.onclick = function() {
                if (isBanPhase) slot.classList.toggle('banned');
            };
        }

        currentStep++;
        updateStatus();
    }
}

function updateStatus() {
    if (currentStep < draftOrder.length) {
        const nextId = draftOrder[currentStep];
        const isRed = nextId.includes('red');
        document.getElementById('status-message').innerHTML = `AU TOUR DE : <span style="color:${isRed ? '#ff007a' : '#00f2ff'}">${isRed ? 'L\'ÉQUIPE ROUGE' : 'L\'ÉQUIPE BLEUE'}</span>`;
    } else {
        isBanPhase = true;
        document.getElementById('status-message').innerHTML = "<span style='color:#ffd700'>BAN FINAL : CLIQUEZ SUR LES ENNEMIS POUR BANNIR</span>";
    }
}

// Fonction pour les 2 carrés de Pre-ban en haut
function selectPrebanSlot(id) {
    activePrebanSlot = id;
    // Petit effet visuel pour savoir quel slot de pre-ban on remplit
    document.querySelectorAll('.active-preban').forEach(s => s.style.borderColor = "#ff004c");
    document.getElementById(id).style.borderColor = "white";
}

window.onload = initDraft;
