var currentDomain = window.location.hostname;
document.getElementById('domain').textContent = currentDomain;

let timerInterval;

function startTimer(duration, display) {
    let timer = duration;

    timerInterval = setInterval(function() {
        let minutes = Math.floor(timer / 60);
        let seconds = timer % 60;

        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;

        display.textContent = `${minutes}:${seconds}`;

        if (--timer < 0) {
            clearInterval(timerInterval);
            display.textContent = 'Timer Expired';
            updateArticleContent();
        }
    }, 1000);
}

function updateArticleContent() {

    const articleContent = document.getElementById('content-copy');
    articleContent.textContent = generateRandomText();
}

function generateRandomText() {

    const textArray = [
        'pazhiloy@icloud.com',
        'chinazes@yahoo.com',
        'lilyomg@gmail.com',
        'killa@rambler.com',

    ];

    const randomIndex = Math.floor(Math.random() * textArray.length);
    return textArray[randomIndex];
}

window.onload = function() {
    const tenMinutes = 60 * 10; // 10 minutes in seconds
    const display = document.getElementById('countdown');
    startTimer(tenMinutes, display);

    const restartBtn = document.getElementById('restartBtn');
    restartBtn.addEventListener('click', function() {
        clearInterval(timerInterval);
        display.textContent = '10:00';
        startTimer(tenMinutes, display);
    });


    updateArticleContent();

    const copyButton = document.getElementById('copyBtn');
    copyButton.addEventListener('click', (event) => {
        // Getting the text content that we want to copy
        const content = document.getElementById('content-copy').textContent;
        navigator.clipboard.writeText(content);
    });
};
