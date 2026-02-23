/* Le conteneur qui va "couper" le bas de l'image */
.crop-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: flex-start; /* Aligne l'image en haut du cadre */
}

.crop-container img {
    width: 100%;
    height: 145%; /* L'image dépasse de 45% vers le bas (là où sont les textes) */
    object-fit: cover;
    object-position: top; /* Garde le haut du perso visible */
}

.slot {
    width: 60px;
    height: 60px;
    background: #14181f;
    border-radius: 4px;
    position: relative;
    overflow: hidden; /* Important : cache le surplus de l'image */
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Ban final */
.slot.banned .crop-container {
    filter: grayscale(100%) brightness(30%);
}

.slot.banned::after {
    content: "✕";
    position: absolute;
    color: #ff004c;
    font-size: 40px;
    font-weight: bold;
    z-index: 10;
}

/* Slot 3 protection */
[id$="-3"] {
    border: 2px solid #ffd700 !important;
}

.hero-card {
    width: 65px;
    height: 65px;
    overflow: hidden;
    cursor: pointer;
    border-radius: 4px;
}
/* Applique le même crop aux cartes de la liste */
.hero-card img {
    width: 100%;
    height: 145%;
    object-fit: cover;
    object-position: top;
}
