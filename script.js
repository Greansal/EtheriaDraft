let currentStep = 0;
let draftOrder = [];
let activePrebanSlot = null; // Pour savoir quel ban on est en train de remplir

const redFirst = ["red-1", "blue-1", "blue-2", "red-2", "red-3", "blue-3", "blue-4", "red-4", "red-5", "blue-5"];
const blueFirst = ["blue-1", "red-1", "red-2", "blue-2", "blue-3", "red-3", "red-4", "blue-4", "blue-5", "red-5"];

function initDraft() {
    currentStep = 0;
    activePrebanSlot = null;
    const random = Math.random();
    
    if (random < 0.5) {
        draftOrder = redFirst;
        document.getElementById('status-message').innerHTML = "PHASE : PRE-BAN | <span style='color:#ff007a'>ROUGE COMMENCERA</span>";
    } else {
        draftOrder = blueFirst;
        document.getElementById('status-message').innerHTML = "PHASE : PRE-BAN | <span style='color:#00f2ff'>BLEU COMMENCERA</span>";
    }

    // Reset visuel des slots de draft
    document.querySelectorAll('.slot').forEach(slot => {
        if (!slot.classList.contains('active-preban')) {
            slot.innerHTML = slot.id.split('-')[1];
            slot.classList.remove('active');
            slot.style.border = "2px dashed #333";
        } else {
            // Reset des prebans
            slot.innerHTML = slot.id.split('-')[1];
            slot.style.border = "2px solid #ff004c";
            // On rend les slots de preban cliquables
            slot.onclick = () => selectPrebanSlot(slot.id);
        }
    });
}

// Fonction pour choisir quel slot de Pre-ban remplir
function selectPrebanSlot(slotId) {
    document.querySelectorAll('.active-preban').forEach(s => s.style.boxShadow = "none");
    activePrebanSlot = slotId;
    document.getElementById(slotId).style.boxShadow = "0 0 15px #ff004c";
}

function selectHero(heroName) {
    // SI on est en train de remplir un Pre-ban
    if (activePrebanSlot) {
        const slot = document.getElementById(activePrebanSlot);
        slot.innerHTML = `<img src="images/${heroName}.png">`;
        slot.style.boxShadow = "none";
        activePrebanSlot = null; // On désactive après le choix
        document.getElementById('status-message').innerText = "PHASE : DRAFT AUTOMATIQUE";
        highlightNextSlot();
        return;
    }

    // SINON : Logique de Draft automatique
    if (currentStep >= draftOrder.length) return;
    
    const targetId = draftOrder[currentStep];
    const slot = document.getElementById(targetId);
    slot.innerHTML = `<img src="images/${heroName}.png">`;
    slot.classList.add('active');
    
    currentStep++;
    highlightNextSlot();
}

function highlightNextSlot() {
    document.querySelectorAll('.slot').forEach(s => {
        if (!s.classList.contains('active-preban')) s.style.border = "2px dashed #333";
    });
    
    if (currentStep < draftOrder.length) {
        const nextId = draftOrder[currentStep];
        document.getElementById(nextId).style.border = "2px solid white";
    } else {
        document.getElementById('status-message').innerText = "DRAFT TERMINÉE !";
    }
}

function resetDraft() { initDraft(); }
window.onload = initDraft;
