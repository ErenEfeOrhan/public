const container = document.getElementById("puzzle-container");
const imageSelection = document.getElementById("image-selection");
const resetBtn = document.getElementById("reset-btn");
const totalPieces = 30;
let positions = [];
let selectedImage = '';
let timeLeft = 300;
let timer;

function startTimer() {
    document.getElementById("timer").textContent = `Süre: 00:00`;
    timer = setInterval(() => {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        let formattedTime =
            (minutes < 10 ? "0" : "") + minutes + ":" +
            (seconds < 10 ? "0" : "") + seconds;

        document.getElementById("timer").textContent = `Süre: ${formattedTime}`;

        if (correctCount==totalPieces){
            return;
        }

        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Başaramadık abeeee.");
            playSound("lose-sound");
            resetGame();
        }
        timeLeft--;
    }, 1000);
}

function setImage(imageName) {
    selectedImage = `images/${imageName}`;
    imageSelection.style.display = 'none';
    container.style.display = 'grid';
    resetBtn.style.display = 'inline-block';
    createPuzzle();
    timeLeft = 300;
    startTimer();
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createPuzzle() {
    container.innerHTML = '';
    for (let i = 0; i < totalPieces; i++) {
        positions.push(i);
    }
    shuffle(positions);

    for (let i = 0; i < totalPieces; i++) {
        const piece = document.createElement("div");
        piece.classList.add("puzzle-piece");
        piece.draggable = true;
        piece.dataset.index = i;
        piece.style.backgroundImage = `url('${selectedImage}')`;
        piece.style.backgroundPosition = `${-(i % 6) * 100}px ${-Math.floor(i / 6) * 80}px`;
        piece.style.order = positions[i];
        piece.addEventListener("dragstart", handleDragStart);
        piece.addEventListener("dragover", handleDragOver);
        piece.addEventListener("drop", handleDrop);
        container.appendChild(piece);
    }
}

let dragged;

function handleDragStart(e) {
    dragged = e.target;
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    if (dragged === e.target) return;

    let from = dragged.style.order;
    let to = e.target.style.order;

    dragged.style.order = to;
    e.target.style.order = from;

    dragged.style.transform = "scale(1.1)";
    e.target.style.transform = "scale(1.1)";

    setTimeout(() => {
        dragged.style.transform = "scale(1)";
        e.target.style.transform = "scale(1)";
        playSound("move-sound");
        checkWin();
    }, 300);
}

let correctCount = 0;

function checkWin() {
    correctCount = 0;
    const pieces = document.querySelectorAll(".puzzle-piece");

    pieces.forEach((piece, index) => {
        if (parseInt(piece.style.order) === index) {
            correctCount++;
        }
    });
    console.log(correctCount)

    if (correctCount === totalPieces) {
        document.getElementById("message").style.display = "block";
        playSound("win-sound");
        startConfetti();
    }
}

function playSound(soundId) {
    document.getElementById(soundId).play();
}

function resetGame() {
    createPuzzle();
}
