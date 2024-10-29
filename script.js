// Import des questions
import { quiz_one_piece } from './questions.js'; // Import des questions

// Variables pour suivre le quiz
let currentQuestionIndex = 0 // On commence par la première question

// Variables pour suivre le score qui commence de 0
let score = 0

// Sélection des éléments HTML
const questionText = document.getElementById("question-text")
const optionContainer = document.getElementById("option-container")
const nextButton = document.getElementById("next-button")
const replayButton = document.getElementById("replay-button")
const resultElement = document.getElementById("result")