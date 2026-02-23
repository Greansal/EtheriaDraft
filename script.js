let currentStep = 0;
let draftOrder = [];
let activePrebanSlot = null;

const redFirst = ["red-1", "blue-1", "blue-2", "red-2", "red-3", "blue-3", "blue-4", "red-4", "red-5", "blue-5"];
const blueFirst = ["blue-1", "red-1", "red-2", "blue-2", "blue-3", "red-3", "red-4", "blue-4", "blue-5", "red-5"];

function initDraft() {
    currentStep = 0;
    activePrebanSlot = null;
    const random = Math.random();
    
    // Détermination de l'ordre au hasard
    if (random < 0.5) {
        draftOrder = redFirst;
        document.getElementById('status-message').innerHTML = "PHASE : PRE-BAN | <span style='color:#ff007a'>ROUGE COMMENCERA</span>";
    } else {
        draftOrder = blueFirst;
        document.getElementById('status-message').innerHTML = "PHASE : PRE-BAN | <span style='color:#00f2ff'>BLEU COMMENCERA</span>";
    }

    // Initialisation de tous les slots
    document.querySelectorAll('.slot').forEach(slot => {
        slot.classList.remove('active');
        slot.style.boxShadow = "none";
        slot.innerHTML = slot.id.split('-')[1]; // Affiche le numéro par défaut

        if (slot.classList.contains('active-preban')) {
            slot.style.border = "2px solid #ff004c";
            // On force l'activation du clic pour le preban
            slot.onclick = function(e) { 
                e.stopPropagation();
                selectPrebanSlot(slot.id); 
            };
        } else {
            slot.style.border = "2px dashed #333";
            slot.onclick = null; 
        }
    });
}

function selectPrebanSlot(slotId) {
    // Désélectionne l'autre slot de preban s'il y en avait un
    document.querySelectorAll('.active-preban').forEach(s => s.style.boxShadow = "none");
    
    activePrebanSlot = slotId;
    document.getElementById(slotId).style.boxShadow = "0 0 20px #ff004c";
    document.getElementById('status-message').innerText = "CLIQUE SUR UN HÉROS POUR LE BAN";
}

function selectHero(heroName) {
    // CAS 1 : On remplit un Pre-ban
    if (activePrebanSlot) {
        const slot = document.getElementById(activePrebanSlot);
        slot.innerHTML = `<img src="images/${heroName}.png" style="width:100%; height:100%; object-fit:cover;">`;
        slot.style.boxShadow = "none";
        activePrebanSlot = null; // On libère le slot après sélection
        document.getElementById('status-message').innerText = "CLIQUE SUR LE 2ÈME BAN OU COMM
