let currentStep = 0;
const statusText = document.getElementById('status-message');

const sequence = [
    { team: 'a', type: 'ban', label: 'Ban 1 Équipe A' },
    { team: 'a', type: 'ban', label: 'Ban 2 Équipe A' },
    { team: 'b', type: 'ban', label: 'Ban 1 Équipe B' },
    { team: 'b', type: 'ban', label: 'Ban 2 Équipe B' },
    { team: 'a', type: 'pick', label: 'Pick 1 Équipe A' },
    { team: 'b', type: 'pick', label: 'Pick 1 Équipe B' }
];

function selectHero(heroName) {
    console.log("Tentative de sélection pour :", heroName);
    if (currentStep >= sequence.length) return;

    const step = sequence[currentStep];
    const containerId = `${step.type}s-${step.team}`;
    const slots = document.querySelectorAll(`#${containerId} .slot`);
    
    for (let slot of slots) {
        if (!slot.querySelector('img')) {
            slot.innerHTML = ''; 
            const img = document.createElement('img');
            
            // On force le nom en minuscule pour correspondre au fichier image
            const fileName = heroName.toLowerCase();
            img.src = `images/${fileName}.png`;
            
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            
            slot.appendChild(img);
            slot.style.borderStyle = "solid";
            
            console.log("Héros placé dans :", containerId);
            currentStep++;
            updateStatus();
            return; // On sort de la fonction dès qu'on a placé l'image
        }
    }
}

function updateStatus() {
    if (currentStep < sequence.length) {
        statusText.innerText = "Phase de : " + sequence[currentStep].label;
    } else {
        statusText.innerText = "DRAFT TERMINÉ";
    }
}
