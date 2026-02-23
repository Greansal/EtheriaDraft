let currentStep = 0;
let draftOrder = [];
let activePrebanSlot = null;

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

    document.querySelectorAll('.slot').forEach(slot => {
        slot.classList.remove('active');
        slot.style.boxShadow = "none";
        slot.style.backgroundColor = "#14181f";
        slot.innerHTML = slot.id.split('-')[1];

        if (slot.classList.contains('active-preban')) {
            slot.style.border = "2px solid #ff004c";
            slot.onmousedown = function() { selectPrebanSlot(slot.id); };
        } else {
            slot.style.border = "2px dashed #333";
            slot.onmousedown = null;
        }
    });
}

function selectPrebanSlot(slotId) {
    document.querySelectorAll('.active-preban').forEach(s => {
        s.style.boxShadow = "none";
        s.style.backgroundColor = "#14181f";
    });
    
    activePrebanSlot = slotId;
    const el = document.getElementById(slotId);
    el.style.boxShadow = "0 0 20px #ff004c";
    el.style.backgroundColor = "#300b16";
    document.getElementById('status-message').innerText = "CLIQUE SUR UN HÉROS POUR LE BAN";
}

function selectHero(heroName) {
    if (activePrebanSlot) {
        const slot = document.getElementById(activePrebanSlot);
        slot.innerHTML = `<img src="images/${heroName}.png">`;
        slot.style.boxShadow = "none";
        slot.style.backgroundColor = "#14181f";
        activePrebanSlot = null;
        document.getElementById('status-message').innerText = "BAN EFFECTUÉ ! CONTINUE OU DRAFTE";
        highlightNextSlot();
        return;
    }

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
        const team = nextId.includes('red') ? "ROUGE" : "BLEUE";
        const color = nextId.includes('red') ? "#ff007a" : "#00f2ff";
        document.getElementById('status-message').innerHTML = `TOUR : <span style="color:${color}">${team}</span>`;
    } else {
        document.getElementById('status-message').innerText = "DRAFT TERMINÉE !";
    }
}

function resetDraft() {
