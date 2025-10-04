const display = document.getElementById('result');
let currentInput = '0';
let isScientificMode = false;
let isDarkMode = false;
let isVoiceMode = false;

function updateDisplay() {
    display.value = currentInput;
}

function appendToDisplay(value) {
    if (currentInput === '0') {
        currentInput = value;
    } else {
        currentInput += value;
    }
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1) || '0';
    updateDisplay();
}

function calculate() {
    try {
        currentInput = eval(currentInput).toString();
    } catch (e) {
        currentInput = 'Error';
    }
    updateDisplay();
}

function toggleScientificMode() {
    isScientificMode = !isScientificMode;
    document.body.classList.toggle('scientific-mode', isScientificMode);
    document.getElementById('mode-toggle').textContent = isScientificMode
        ? 'Switch to Standard'
        : 'Switch to Scientific';
}

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.getElementById('theme-toggle').textContent = isDarkMode ? '☀️' : '🌙';
}

function toggleVoiceMode() {
    isVoiceMode = !isVoiceMode;
    document.getElementById('voice-toggle').textContent = isVoiceMode ? '🔇' : '🎙️';
    if (isVoiceMode) {
        startVoiceRecognition();
    } else {
        stopVoiceRecognition();
    }
}

function startVoiceRecognition() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-IN';
    recognition.start();

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        appendToDisplay(transcript);
    };
}

function stopVoiceRecognition() {
    // Implement logic to stop voice recognition if needed
}

document.querySelectorAll('.btn-number').forEach(button => {
    button.addEventListener('click', () => appendToDisplay(button.textContent));
});

document.querySelector('.btn-clear').addEventListener('click', clearDisplay);
document.querySelector('.btn-delete').addEventListener('click', deleteLast);
document.querySelector('.btn-equals').addEventListener('click', calculate);

document.querySelectorAll('.btn-operator').forEach(button => {
    button.addEventListener('click', () => appendToDisplay(` ${button.textContent} `));
});

document.querySelectorAll('.btn-scientific').forEach(button => {
    button.addEventListener('click', () => {
        const fn = button.dataset.fn;
        currentInput = `${fn}(${currentInput})`;
        updateDisplay();
    });
});

document.getElementById('mode-toggle').addEventListener('click', toggleScientificMode);
document.getElementById('theme-toggle').addEventListener('click', toggleDarkMode);
document.getElementById('voice-toggle').addEventListener('click', toggleVoiceMode);
