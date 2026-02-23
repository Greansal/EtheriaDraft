// Remplace ta fonction selectHero par celle-ci
function selectHero(heroName) {
    if (isBanPhase) return;
    
    // Structure avec wrapper pour un contrôle total du zoom/cadrage
    const imgHTML = `<div class="img-container"><img src="images/${heroName}.png" class="hero-img"></div>`;
    
    if (activePrebanSlot) {
        const slot = document.getElementById(activePrebanSlot);
        slot.innerHTML = imgHTML;
        slot.style.boxShadow = "none";
        slot.style.backgroundColor = "#14181f";
        activePrebanSlot = null;
        return;
    }

    if (currentStep >= draftOrder.length) return;
    
    const targetId = draftOrder[currentStep];
    const slot = document.getElementById(targetId);
    slot.innerHTML = imgHTML;
    slot.classList.add('active');
    
    if (!targetId.includes('-3')) {
        slot.onmousedown = function() { 
            if (isBanPhase) slot.classList.toggle('banned');
        };
    }

    currentStep++;
    highlightNextSlot();
}
