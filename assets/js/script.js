let subContainerGame = document.getElementById('sub-container-game');
let divStartGame = document.getElementById('div-start-game');

function startGame(){
    subContainerGame.classList.remove('element-hidden');
    divStartGame.classList.add('element-hidden');
    playSound();
    guessInput.focus();
}

let guessInput = document.getElementById('guessInput');
let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
const maxAttempts = 6;
let guessedNumbers = [];
let lastMessage;
let elementWasInserted = false;
const parentElement = document.querySelector('.game-container');
let pElemLastMessage;
let resultMessage = document.getElementById('resultMessage');
let attemptsMessage = document.getElementById('attemptsMessage');
let guessedNumbersMessage = document.getElementById('guessedNumbersMessage');
let guessButton = document.getElementById('guessButton');

var audio = document.getElementById("myAudio");
let index = 0;
let soundStartGame = "assets/sounds/playing.mp3";
let soundVictory = "victory.mp3";
let soundGameOver = "game-over.mp3";

function playSound() {
    audio.play();
}

function gameOver() {
    audio.pause();
    audio.currentTime = 0;
    audio.src = "assets/sounds/" + soundGameOver;
    audio.play();
}

function victory() {
    audio.pause();
    audio.currentTime = 0;
    audio.src = "assets/sounds/" + soundVictory;
    audio.play();
}

audio.addEventListener("ended", function () {
    if (index == 0)
    playSound();
});

function checkGuess() {
    let userGuess = Number(guessInput.value);

    console.log(userGuess)
    if (!userGuess) {
        resultMessage.textContent = 'Você deve digitar um número!';
        resultMessage.style.color = 'orange';

        if (pElemLastMessage) {
            parentElement.removeChild(pElemLastMessage);
            elementWasInserted = false;
        }
    } else {
        if (guessButton.textContent === 'Jogar de Novo') {
            resetGame();
            return;
        }

        if (guessedNumbers.includes(userGuess)) {
            pElemLastMessage = document.createElement('p');
            pElemLastMessage.textContent = lastMessage;
            pElemLastMessage.style.color = 'red';//orange

            if (!elementWasInserted) {
                parentElement.insertBefore(pElemLastMessage, resultMessage);
                elementWasInserted = true;
            }

            resultMessage.textContent = 'Você já tentou este número. Tente um número diferente.';
            resultMessage.style.color = 'orange';
        } else {
            if (attempts < maxAttempts) {
                guessedNumbers.push(userGuess);
                attempts++;
                if (userGuess == randomNumber) {
                    victory();
                    index = 1;
                    resultMessage.textContent = 'Parabéns! Você acertou!';
                    resultMessage.style.color = 'green';
                    endGame();
                } else if (userGuess > randomNumber) {
                    lastMessage = 'É menor! Tente Novamente.'
                    resultMessage.textContent = lastMessage;
                    resultMessage.style.color = 'red';

                    if (elementWasInserted) {
                        parentElement.removeChild(pElemLastMessage);
                        elementWasInserted = false;
                    }
                } else {
                    lastMessage = 'É maior! Tente Novamente.';
                    resultMessage.textContent = lastMessage;
                    resultMessage.style.color = 'red';

                    if (elementWasInserted) {
                        parentElement.removeChild(pElemLastMessage);
                        elementWasInserted = false
                    }
                }
                attemptsMessage.textContent = `Tentativas: ${attempts} / ${maxAttempts}`;
            }

            if (attempts >= maxAttempts && userGuess != randomNumber) {
                gameOver();
                index = 2;
                resultMessage.textContent = `Fim de Jogo! O número era ${randomNumber}.`;
                resultMessage.style.color = 'red';
                endGame();
            }

            guessedNumbersMessage.textContent = `Números tentados: ${guessedNumbers.join(', ')}`;
        }
    }


}

function endGame() {
    guessInput.disabled = true;
    document.getElementById('guessButton').textContent = 'Jogar de Novo';
}

function resetGame() {
    elementWasInserted = false;
    audio.src = soundStartGame;
    audio.play();
    index = 0;
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    guessedNumbers = [];
    guessInput.disabled = false;
    guessInput.value = '';
    document.getElementById('guessButton').textContent = 'Adivinhar';
    document.getElementById('resultMessage').textContent = '';
    document.getElementById('attemptsMessage').textContent = '';
    document.getElementById('guessedNumbersMessage').textContent = '';
}

guessInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        checkGuess();
    }
});

console.log(audio.src)
audio.addEventListener('ended', () => {
    if (index == 0)
    audio.play();
})

