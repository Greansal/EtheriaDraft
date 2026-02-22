let currentStep = 0;
const statusText = document.getElementById('status-message');

// Ordre : 2 Prebans, puis alternance Rouge/Bleu pour 5 persos chacun
const steps = [
    { id: 'preban-1', label: 'PREBAN 2' },
    { id: 'preban-2', label: 'PICK ROUGE 1' },
    { team: 'red', slotIndex: 0, label: 'PICK BLEU 1' },
    { team: 'blue', slotIndex: 0, label: 'PICK ROUGE 2' },
    { team: 'red', slotIndex: 1, label: 'PICK BLEU 2' },
    { team: 'blue', slotIndex: 1, label: 'PICK ROUGE 3' },
    { team: 'red', slotIndex: 2, label: 'PICK BLEU 3' },
    { team: 'blue', slotIndex: 2, label: 'PICK ROUGE 4' },
    { team: 'red', slotIndex: 3, label: 'PICK BLEU 4' },
    { team: 'blue', slotIndex: 3, label: 'PICK ROUGE 5' },
    { team: 'red', slotIndex: 4, label: 'PICK BLEU 5' },
    { team: 'blue', slotIndex: 4, label: 'DRAFT TERMINÉ' }
];

function selectHero(name) {
    if (currentStep >= steps.length) return;

    let targetSlot;
    const currentInfo = steps[currentStep];

    if (currentStep < 2) {
        // Phase Preban
        targetSlot = document.getElementById(currentInfo.id);
    } else {
        // Phase Pick Alterné
        const teamDiv = currentInfo.team === 'red' ? 'team-red' : 'team-blue';
        targetSlot = document.getElementById(teamDiv).children[currentInfo.slotIndex];
    }

    if (targetSlot) {
        targetSlot.innerHTML = `<img src="images/${name}.png">`;
        targetSlot.style.borderStyle = "solid";
        
        statusText.innerText = "PHASE : " + currentInfo.label;
        currentStep++;
    }
}
