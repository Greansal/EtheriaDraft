let currentStep = 0; // 0 & 1: Bans A, 2 & 3: Bans B, 4+: Picks
const statusText = document.getElementById('status-message');

const sequence = [
    { team: 'A', type: 'ban', label: 'Ban 1 Équipe A' },
    { team: 'A', type: 'ban', label: 'Ban 2 Équipe A' },
    { team: 'B', type: 'ban', label: 'Ban 1 Équipe B' },
    { team: 'B', type: 'ban', label: 'Ban 2 Équipe B' },
    { team: 'A', type: 'pick', label: 'Pick 1 Équipe A' },
    { team: 'B', type: 'pick', label: 'Pick 1 & 2 Équipe B' }, // Simplifié pour le test
    { team: 'A', type: 'pick', label: 'Pick 2 & 3 Équipe A' }
];

function selectHero(heroName) {
    if (currentStep >= sequence.length) {
        statusText.innerText = "Draft Terminé !";
        return;
    }

    const step = sequence[currentStep];
    const side = step.team === 'A' ? 'a' : 'b';
    const type = step.type;

    // Trouver le premier slot vide pour ce type et cette équipe
    const slots = document.querySelectorAll(`#${type}s-${side} .slot`);
    let filled = false;

    for (let slot of slots) {
        if (slot.innerText.includes('Ban') || slot.innerText.includes('Pick')) {
            slot.innerText = heroName;
            slot.style.borderStyle = "solid";
            slot.style.color = "white";
            filled = true;
            break;
        }
    }

    if (filled) {
        currentStep++;
        if (currentStep < sequence.length) {
            statusText.innerText = "Phase de " + sequence[currentStep].label;
        } else {
            statusText.innerText = "Draft Terminé !";
        }
    }
}
