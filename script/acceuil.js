    // Fonction pour l'animation de machine à écrire
    function typeWriter(element, text, delay) {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, delay);
            }
        }
        type();
    }

    // Animation de machine à écrire sur le paragraphe
    document.addEventListener('DOMContentLoaded', () => {
        const paragraph = document.querySelector('.acceuil-introduction p');
        const text = paragraph.innerHTML; // Stocke le texte original
        paragraph.innerHTML = ''; // Vide le contenu pour commencer l'animation
        typeWriter(paragraph, text, 50); // Lancer l'animation avec un délai de 50 ms entre les caractères
    });