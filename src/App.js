import './App.css';
import React, { useEffect } from 'react';
import {clear} from "@testing-library/user-event/dist/clear";

function App() {

  let timerInterval;

  useEffect(() => {
    const tenMinutes = 60 * 10;
    const display = document.getElementById('countdown');

    function startTimer(duration) {
      let timer = duration;

      timerInterval = setInterval(function () {
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

    // window.onload = function() {
    //   const tenMinutes = 60 * 10; // 10 minutes in seconds
    //   const display = document.getElementById('countdown');
    //   startTimer(tenMinutes, display);

    startTimer(tenMinutes);

    const restartBtn = document.getElementById('restartBtn');
    restartBtn.addEventListener('click', function () {
      clearInterval(timerInterval);
      display.textContent = '10:00';
      startTimer(tenMinutes);
    });


    updateArticleContent();

    const copyButton = document.getElementById('copyBtn');
    copyButton.addEventListener('click', (event) => {
      // Getting the text content that we want to copy
      const content = document.getElementById('content-copy').textContent;
      navigator.clipboard.writeText(content);
    });
    return () => {
      clearInterval(timerInterval);
    };
  },[]);

  return (
      <div className="app-container">
        <h1>JailBreak My Mail</h1>
        <hr />
        <h2>Your 10 Minute Mail address</h2>
        <div className="head-container">
          <article id="content-copy">template@icloud.com</article>
          <p id="countdown"></p>
          <button id="restartBtn">Restart Timer</button>
          <button id="copyBtn">Copy Email</button>
        </div>
        <main>
          <div className="window-container">
            <div className="content-main">
              {/* Additional content can be added here */}
            </div>
          </div>
        </main>
      </div>
  );

}

export default App;
