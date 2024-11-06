// Import des questions
import { quiz_one_piece } from './questions.js' // Import des questions

// Variables pour suivre le quiz
let currentQuestionIndex = 0 // On commence par la première question
let attemptsLeft = 3 // Nombre de tentatives
let score = 0 // Score qui commence à 0
let timer // Timer
let timeLeft = 60 // Temps du timer 

// Sélection des éléments HTML / On récupère les éléments HTML
const questionText = document.getElementById("question-text")
const optionContainer = document.getElementById("options-container")
const nextButton = document.getElementById("next-button")
const replayButton = document.getElementById("replay-button")
const resultElement = document.getElementById("result")
const progressBar = document.getElementById("progress-bar")
const startButton = document.getElementById("start-button")
const attemptsClear = document.getElementById("attempts-remaining")
const timerElement = document.getElementById("timer")
const quizContainer = document.getElementById("quiz-container")

// Fonction pour désactiver les éléments du quiz
function disabledQuizElements() {
    questionText.textContent = ""
    optionContainer.innerHTML = "" // Vider le conteneur d'options
    nextButton.disabled = true
    replayButton.style.display = "none" // Masquer le bouton de replay
    timerElement.style.display = "none" // Masquer le timer
    quizContainer.style.display = "none" // Masquer le conteneur du quiz
}

// Appel de la fonction pour désactiver les éléments du quiz avant démarrage
disabledQuizElements()

function startQuiz() {
    // Affiche le message d'alerte
    const alertMessage = document.getElementById('alert-message')
    alertMessage.style.display = 'block'

    // Écouteur d'événement pour le bouton de fermeture
    document.getElementById('close-alert').onclick = function() {
        alertMessage.style.display = 'none'

        // Masque le bouton de démarrage
        startButton.style.display = "none"

        // Affiche le chronomètre et le conteneur de quiz
        timerElement.style.display = "block"
        quizContainer.style.display = "block"

        // Charge la première question
        loadQuestion()

        // Démarrer le Timer
        startTimer()
    };
}

// Fonction pour afficher le bouton "commencer le quiz" lorsque la page est chargé
function showStartButton() {
    const startContainer = document.getElementById('start-container');
    startContainer.style.display = 'block' // Affiche le conteneur avec le bouton
}

// Appelez cette fonction lorsque la page se charge ou au bon moment
window.onload = function() {
    showStartButton() // Affiche le bouton au chargement de la page
}

// Fonction du Timer
function startTimer() {
    timer = setInterval(() => {
        // Décrémenter le temps restant
        timeLeft--

        // MAJ l'affichage du Timer
        timerElement.textContent = `Temps restant : ${timeLeft}s `

        // Vérifie si le temps est écoulé
        if (timeLeft <= 0) {
            clearInterval(timer) // Arrête le Timer
            endQuiz() // Termine le quiz
        }
    }, 1000)
}

function showGameOverImage() {
    document.getElementById('bomb').style.display = 'block'; // Affiche l'image
}


// Fonction pour afficher une question 
function loadQuestion() {
    // On vide le conteneur des options
    optionContainer.textContent = ""

    // Récupère la question actuelle
    const currentQuestion = quiz_one_piece.questionsModeExtreme[currentQuestionIndex]

    // Insert la question dans le HTML
    questionText.textContent = currentQuestion.text

    // Insert les options dans le HTML
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button")
        button.textContent = `${index + 1}. ${option}`
        button.setAttribute("data-option-text", option)
        button.classList.add("option-button")
        button.addEventListener("click", () => checkAnswer(button, option))
        optionContainer.appendChild(button)
    })
    resultElement.textContent = ""
    nextButton.disabled = true;

    // Mise à jour de la barre de progression 
    updateProgressBar()
}

// Fonction pour la barre de progression avec un dégradé rouge à vert 
function updateProgressBar() {
    const progressBarPercentage = ((currentQuestionIndex + 1) / quiz_one_piece.questionsModeExtreme.length) * 100
    progressBar.style.width = `${progressBarPercentage}%`

    // Positionner le bateau à la fin de la barre
    const boat = document.getElementById("boat")
    boat.style.left = `${progressBarPercentage}%`

    // Dégradé de couleur de rouge à vert pour la barre
    const redValue = Math.max(255 - Math.floor((progressBarPercentage / 100) * 255), 0)
    const greenValue = Math.min(Math.floor((progressBarPercentage / 100) * 255), 255)

    progressBar.style.background = `rgb(${redValue}, ${greenValue}, 0}`

    if (currentQuestionIndex + 1 === quiz_one_piece.questionsModeExtreme.length) {
        progressBar.classList.remove("progress-red")
        progressBar.classList.add("progress-green")
    } else {
        progressBar.classList.add("progress-red")
    }
}

// Fonction pour vérifier la réponse
function checkAnswer(button, selectedOption) {
    const currentQuestion = quiz_one_piece.questionsModeExtreme[currentQuestionIndex]
    const correctAnswer = currentQuestion.correct_answer

    // Désactiver tout les boutons après le choix
    const allButtons = document.querySelectorAll(".option-button")
    allButtons.forEach(btn => {
        btn.disabled = true; // Désactive tout les boutons après sélection
    });

    // Vérifier si la réponse est correcte ou non
    if (selectedOption.trim() === correctAnswer.trim()) {
        button.classList.add("correct-answer")
        score++
    } else {
        button.classList.add("wrong-answer")

        // Affiche aussi la bonne réponse
        allButtons.forEach(btn => {
            if (btn.getAttribute("data-option-text").trim() === correctAnswer.trim()) {
                btn.classList.add("correct-answer") // Affiche une bordure pour la bonne réponse
            }
        })

        // Si la réponse est incorrecte, décrémente le nombre de tentatives restantes
        attemptsLeft--
    }

    // Affiche le bouton "Suivant" après avoir cliqué sur une réponse
    nextButton.disabled = false;

    // Vérifier si le joueur a encore des tentatives restantes
    if (attemptsLeft <= 0) {
        clearInterval(timer) // arrêt du Timer
        showFinalResult()
    }
    // Mettre à jour le compteur de tentatives après avoir avancé à la question suivante
     document.getElementById("attempts-remaining").textContent = `Tentatives restantes : ${attemptsLeft}`
}

// Fonction pour terminer le quiz lorsque le Timer atteint zéro
function endQuiz() {
    questionText.textContent = `Temps écoulé ! Tu as obtenu ${score}/${quiz_one_piece.questionsModeExtreme.length}.`

    // Masque le bouton "Suivant" et affiche le bouton "Recommencer"
    nextButton.style.display = "none"
    replayButton.style.display = "inline-block"

    // Masque les options et le timer
    optionContainer.textContent = ""
    timerElement.style.display = "none"

    const explosionSound = new Audio("audio/sf_explosion_01.mp3")
    explosionSound.play()
}

// Ecouteur pour le bouton Commencer le quiz
startButton.addEventListener("click", startQuiz)

// Ajout d'un écouteur d'événement
nextButton.addEventListener("click", () => {
    // Incrémenter l'index de la question
    currentQuestionIndex++

    // Vérifier s'il reste des questions
    if (currentQuestionIndex < quiz_one_piece.questionsModeExtreme.length) {
        // Affiche la question suivante 
        loadQuestion()
    } else {
        showFinalResult()
    }

     // Mettre à jour le compteur de tentatives après avoir avancé à la question suivante
     document.getElementById("attempts-remaining").textContent = `Tentatives restantes : ${attemptsLeft}`
})

// Fonction affichant un message de fin lors du résultat
function showFinalResult() {
    questionText.textContent = `Tu as obtenu ${score}/${quiz_one_piece.questionsModeExtreme.length}. Tentatives restantes : ${attemptsLeft}`
    updateProgressBar()
    let message = ""

    // Message personnalisé en fonction du score
    if (score === quiz_one_piece.questionsModeExtreme.length) {
        message = "Excellent ! Mais tu es encore loin du One Piece ! 💀"
    } else if (score >= quiz_one_piece.questionsModeExtreme.length / 2) {
        message = "Bien joué ! Mais tu vaux mieux que ça 👍"
    } else {
        message = "Mange un fruit du Dragon et revient me voir, tu n'as pas le niveau."
    }

    // Afficher le message final 
    optionContainer.textContent = ""
    // Vider les options
    resultElement.textContent = message // Affiche le message personnalisé

    attemptsClear.style.display = "none"
    optionContainer.style.display = "none"
    nextButton.style.display = "none" // Cache le bouton "Suivant"
    replayButton.style.display = "inline-block" // Affiche le bouton "Veut-tu recommencer l'aventure ?"
}

// Fonction pour réinitialiser le quiz
replayButton.addEventListener("click", () => {
    // Réinitialise l'index, le score et les tentatives
    currentQuestionIndex = 0
    score = 0
    attemptsLeft = 3 // Réinitialise le nombre de tentatives à 3
    timeLeft = 60  // Réinitialise le Timer

    attemptsClear.style.display = "block"
    optionContainer.style.display = "grid"
    // Cache le bouton "Veut-tu recommencer l'aventure" et affiche le bouton "Suivant"
    replayButton.style.display = "none"
    nextButton.style.display = "inline-block"

    timerElement.style.display = "block"
    quizContainer.style.display = "block"

    // Recharge la première question
    loadQuestion()
    startTimer()

    // Mettre à jour le compteur de tentatives après avoir avancé à la question suivante
     document.getElementById("attempts-remaining").textContent = `Tentatives restantes : ${attemptsLeft}`
})

// Charge la première question au chargement de la page
loadQuestion()

const menuToggle = document.getElementById('menu-toggle')
const sideMenu = document.getElementById('side-menu')

// Ajouter un écouteur d'événement pour basculer la classe "open" sur le menu
menuToggle.addEventListener('click', function () {
    sideMenu.classList.toggle('open')
})