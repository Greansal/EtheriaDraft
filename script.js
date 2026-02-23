let currentStep = 0;
let draftOrder = [];

const redFirst = ["red-1", "blue-1", "blue-2", "red-2", "red-3", "blue-3", "blue-4", "red-4", "red-5", "blue-5"];
const blueFirst = ["blue-1", "red-1", "red-2", "blue-2", "blue-3", "red-3", "red-4", "blue-4", "blue-5", "red-5"];

function initDraft() {
    currentStep = 0;
    // Tirage au sort du premier joueur
    const random = Math.random();
    if (random < 0.5) {
        draftOrder = redFirst;
        document.getElementById('status-message').innerHTML = "PHASE : DRAFT - <span style='color:#ff007a'>ROUGE COMMENCE</span>";
    } else {
        draftOrder = blueFirst;
        document.getElementById('status-message').innerHTML = "PHASE : DRAFT - <span style='color:#00f2ff'>BLEU COMMENCE</span>";
    }
    
    // Nettoyage des slots
    document.querySelectorAll('.slot').forEach(slot => {
        // On ne nettoie pas les prebans (on garde la liberté manuelle)
        if (!slot.classList.contains('active-preban')) {
            slot.innerHTML = slot.id.split('-')[1]; // Remet le numéro (1, 2, 3...)
            slot.classList.remove('active');
        }
    });
    highlightNextSlot();
}

function selectHero(heroName) {
    if (currentStep >= draftOrder.length) return;

    const targetId = draftOrder[currentStep];
    const slot = document.getElementById(targetId);
    
    slot.innerHTML = `<img src="images/${heroName}.png">`;
    slot.classList.add('active');

    currentStep++;
    highlightNextSlot();
}

function highlightNextSlot() {
    document.querySelectorAll('.slot').forEach(s => s.style.border = "2px dashed #333");
    
    if (currentStep < draftOrder.length) {
        const nextId = draftOrder[currentStep];
        const nextSlot = document.getElementById(nextId);
        // Fait briller la case en blanc pour montrer où le perso va atterrir
        nextSlot.style.border = "2px solid white";
    } else {
        document.getElementById('status-message').innerText = "DRAFT TERMINÉE !";
    }
}

function resetDraft() {
    // Recharge la page pour tout remettre à zéro proprement
    location.reload();
}

// Assure-toi que ta fonction selectHero utilise bien les IDs red-1, blue-1 etc.
function selectHero(heroName) {
    // ... ta logique de draft ici ...
    console.log("Héros sélectionné : " + heroName);
}

// Lancement au premier chargement
window.onload = initDraft;

