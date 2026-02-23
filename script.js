let currentStep = 0;
let draftOrder = [];
let activePrebanSlot = null;
let isBanPhase = false;

const redFirst = ["red-1", "blue-1", "blue-2", "red-2", "red-3", "blue-3", "blue-4", "red-4", "red-5", "blue-5"];
const blueFirst = ["blue-1", "red-1", "red-2", "blue-2", "blue-3", "red-3", "red-4", "blue-4", "blue-5", "red-5"];

function initDraft() {
    currentStep = 0;
    activePrebanSlot = null;
    isBanPhase = false;
    const random = Math.random();
    
    if (random < 0.5) {
        draftOrder = redFirst;
        document.getElementById('status-message').innerHTML = "PHASE : PRE-BAN | <span style='color:#ff007a'>ROUGE COMMENCE</span>";
    } else {
        draftOrder = blueFirst;
        document.getElementById('status-message').innerHTML = "PHASE : PRE-BAN | <span style='color:#00f2ff'>BLEU COMMENCE</span>";
    }

    document.querySelectorAll('.slot').forEach(slot => {
        slot.classList.remove('active', 'banned', 'protect-slot');
        slot.style.boxShadow = "none";
        slot.style.backgroundColor = "#14181f";
        slot.innerHTML = slot.id.split('-')[1];
        
        // Reset des bordures par défaut
        slot.style.border = "1px dashed #444";

        if (slot.classList.contains('active-preban')) {
            slot.style.border = "2px solid #ff004c";
            slot.onmousedown = function() { selectPrebanSlot(slot.id); };
        } else {
            // FORCE LA BORDURE DORÉE SUR LE SLOT 3 IMMÉDIATEMENT
            if (slot.id.includes('-3')) {
                slot.classList.add('protect-slot');
                slot.style.border = "2px solid #ffd700";
            }
            slot.onmousedown = null;
        }
