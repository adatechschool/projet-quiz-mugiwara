// Import des questions
import { quiz_one_piece } from './questions.js'; // Import des questions

// Variables pour suivre le quiz
let currentQuestionIndex = 0; // On commence par la première question
let score = 0; // Variables pour suivre le score qui commence de 0

// Sélection des éléments HTML
const questionText = document.getElementById("question-text");
const optionContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-button");
const replayButton = document.getElementById("replay-button");
const resultElement = document.getElementById("result");
const progressBar = document.getElementById("progress-bar");

// Fonction pour afficher une question
function loadQuestion() {
    // On vide le conteneur des options
    optionContainer.textContent = "";

    // Récupère la question actuelle
    const currentQuestion = quiz_one_piece.questions[currentQuestionIndex];

    // Insère la question dans le HTML
    questionText.textContent = currentQuestion.text;

    // Insère les options dans le HTML
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = `${index + 1}. ${option}`;
        button.setAttribute("data-option-text", option);
        button.classList.add("option-button");
        button.addEventListener("click", () => checkAnswer(button, option));
        optionContainer.appendChild(button);
    });

    // Réinitialise le message de résultat
    resultElement.textContent = "";
    nextButton.disabled = true;

    // Mise à jour de la barre de progression
    updateProgressBar();
}

// Fonction pour mettre à jour la barre de progression avec un dégradé rouge à vert
function updateProgressBar() {
    const progressBarPercentage = ((currentQuestionIndex + 1) / quiz_one_piece.questions.length) * 100;
    progressBar.style.width = `${progressBarPercentage}%`;

    // Positionner le bateau à la fin de la barre
    const boat = document.getElementById("boat");
    if (boat) boat.style.left = `${progressBarPercentage}%`;

    // Dégradé de couleur de rouge à vert pour la barre
    const redValue = Math.max(255 - Math.floor((progressBarPercentage / 100) * 255), 0);
    const greenValue = Math.min(Math.floor((progressBarPercentage / 100) * 255), 255);
    progressBar.style.background = `rgb(${redValue}, ${greenValue}, 0)`;

    // Si c'est la dernière question, ajuster la classe de la barre
    if (currentQuestionIndex + 1 === quiz_one_piece.questions.length) {
        progressBar.classList.remove("progress-red");
        progressBar.classList.add("progress-green");
    } else {
        progressBar.classList.add("progress-red");
    }
}

// Fonction pour vérifier la réponse
function checkAnswer(button, selectedOption) {
    const currentQuestion = quiz_one_piece.questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.correct_answer;

    // Désactiver tous les boutons après le choix
    const allButtons = document.querySelectorAll(".option-button");
    allButtons.forEach(btn => {
        btn.disabled = true; // Désactive tous les boutons après sélection
    });

    // Vérifie si la réponse est correcte ou non
    if (selectedOption.trim() === correctAnswer.trim()) {
        button.classList.add("correct-answer");
        score++;
    } else {
        button.classList.add("wrong-answer");

        // Affiche aussi la bonne réponse
        allButtons.forEach(btn => {
            if (btn.getAttribute("data-option-text").trim() === correctAnswer.trim()) {
                btn.classList.add("correct-answer"); // Affiche une bordure pour la bonne réponse
            }
        });
    }

    // Affiche le bouton "Suivant" après avoir cliqué sur une réponse
    nextButton.disabled = false;
}

// Ajout d'un écouteur d'événement pour le bouton "Suivant"
nextButton.addEventListener("click", () => {
    // Incrémenter l'index de la question
    currentQuestionIndex++;

    // Vérifier s'il reste des questions
    if (currentQuestionIndex < quiz_one_piece.questions.length) {
        // Affiche la question suivante
        loadQuestion();
    } else {
        showFinalResult();
    }
});

// Fonction affichant un message de fin lors du résultat
function showFinalResult() {
    questionText.textContent = `Tu as obtenu ${score}/${quiz_one_piece.questions.length}`;
    updateProgressBar();
    let message = "";

    // Message personnalisé en fonction du score
    if (score === quiz_one_piece.questions.length) {
        message = "Excellent ! Mais tu es encore loin du One Pieces ! 💀";
    } else if (score >= quiz_one_piece.questions.length / 2) {
        message = "Bien joué ! Mais tu vaux mieux que ça 👍";
    } else {
        message = "Mange un fruit du Dragon et revient me voir, tu n'as pas le niveau.";
    }

    // Afficher le message final
    optionContainer.textContent = ""; // Vide le conteneur d'options
    resultElement.textContent = message; // Affiche le message personnalisé

    // Cache le bouton "Suivant" et affiche le bouton "Recommencer"
    nextButton.style.display = "none";
    replayButton.style.display = "inline-block";
}

// Fonction pour réinitialiser le quiz
replayButton.addEventListener("click", () => {
    // Réinitialise l'index et le score
    currentQuestionIndex = 0;
    score = 0;

    // Cache le bouton "Recommencer" et affiche le bouton "Suivant"
    replayButton.style.display = "none";
    nextButton.style.display = "inline-block";

    // Recharge la première question
    loadQuestion();
});

// Charge la première question au chargement de la page
loadQuestion();


// ------ JavaScript pour le menu déroulant ------

// Sélectionner l'élément du bouton pour ouvrir/fermer le menu
const menuToggle = document.getElementById('menu-toggle');
const sideMenu = document.getElementById('side-menu');

// Ajouter un écouteur d'événement pour basculer la classe "open" sur le menu
menuToggle.addEventListener('click', function () {
    sideMenu.classList.toggle('open');
});
