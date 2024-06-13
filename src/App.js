import './App.css';
import React, { useEffect, useState } from 'react';
import Mail from './Mail.json';
import Lottie from "lottie-react";
import copyImage from '../src/copy-7571066_960_720.webp';
import titlePhoto from '../src/1492692368-7email_83536.png';

function App() {
  const [email, setEmail] = useState('');
  const [emailList, setEmailList] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  // let timerInterval;



  const getEmail = () => {
    try {
      const response = fetch('/api/routers/email').then(res => {
        return res.json()
      }).then((res) => {
        setEmail(res.email)
      })
    } catch (error) {
      console.error('Error fetching email:', error.message);
    }
  };

  const getEmailList = async () => {
    try {
      const response = await fetch('http://backend/getEmailList', {
        method: 'GET'
      });
      if (!response.ok) {
        throw new Error('Failed to fetch email list');
      }
      const data = await response.json();
      setEmailList(data.map(email => ({
        id: email.id,
        dateReceived: email.dateReceived,
        emailSubject: email.emailSubject,
      })));
    } catch (error) {
      console.error('Error fetching email list:', error.message);
    }
  };

  const getMessage = async (emailId) => {
    try {
      const response = await fetch(`http://backend/getMessage?id=${emailId}`, {
        method: 'GET'
      });
      if (!response.ok) {
        throw new Error('Failed to fetch message');
      }

      const data = await response.json();
      return { messageBody: data.messageBody };
    } catch (error) {
      console.error('Error fetching message:', error.message);
      return { messageBody: '' };
    }
  };

  const handleEmailClick = async (emailId) => {
    const message = await getMessage(emailId);
    setSelectedEmail({ ...emailList.find(email => email.id === emailId), ...message });
  };

  useEffect(() => {
    getEmail();
    getEmailList();

    // const tenMinutes = 60 * 10;
    // const display = document.getElementById('countdown');

    // function startTimer(duration) {
    //   let timer = duration;
    //   timerInterval = setInterval(function () {
    //
    //     let minutes = Math.floor(timer / 60);
    //
    //     let seconds = timer % 60;
    //
    //
    //     minutes = minutes < 10 ? `0${minutes}` : minutes;
    //     seconds = seconds < 10 ? `0${seconds}` : seconds;
    //
    //     display.textContent = `${minutes}:${seconds}`;
    //
    //     if (--timer < 0) {
    //       clearInterval(timerInterval);
    //       display.textContent = 'Timer Expired';
    //       updateArticleContent();
    //     }
    //   }, 1000);
    //
    // }

    const copyButton = document.getElementById('copyImg');
    if (copyButton) {
      copyButton.addEventListener('click', (event) => {
        const content = document.getElementById('content-copy').textContent;
        navigator.clipboard.writeText(content);
      });
    }


    function updateArticleContent() {
      const articleContent = document.getElementById('content-copy');
      articleContent.textContent = getEmail();
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

    // startTimer(tenMinutes);
    //updateArticleContent();


    return () => {
      //   clearInterval(timerInterval);
      //
    };
  }, []);

  return (
    <div>
      <div className="top-container">
        <img id="titleImg" src={titlePhoto} alt="Title" className="title-image" />
        <h1>JailBreak My Mail</h1>
      </div>

      <div className="mail-section">
        <h2>Your Temporary Mail Address</h2>
        <div className="content-container">

          <article id="content-copy" className="rounded-content">{setEmail}</article>
          <img id="copyImg" src={copyImage} alt="Copy Image" className="rounded-image" />
        </div>
        {/*<p id="countdown"></p>*/}
      </div>

      <div className="mailbox-text">
        <p>Forget about spam, advertising mailings, hacking and attacking robots. Keep your real mailbox clean and secure. JailBreak My Mail provides temporary, secure, anonymous, free, disposable email address.</p>
      </div>
      <main>
        <div className="window-container">
          <div className="content-main">
            <h1>Sender</h1>
            <h1>Subject</h1>
            <h1>View</h1>
          </div>
          <div className="content-divider"></div>
          <div className="lower-content">
            <br />
            <br />
            <div className="inbox-empty-msg">
              <Lottie className="mailfloating" animationData={Mail} />
              <div className="emptyInboxTitle">
                <p>Your inbox is empty</p>
                <p>Waiting for incoming emails</p>
              </div>
              {/*<h1>Email: {email}</h1>*/}
              {/*<h2>Email List:</h2>*/}
              <ul>
                {emailList.map(email => (
                  <li key={email.id} onClick={() => handleEmailClick(email.id)}>
                    <p>ID: {email.id}</p>
                    <p>Date Received: {email.dateReceived}</p>
                    <p>Email Subject: {email.emailSubject}</p>
                  </li>
                ))}
              </ul>
              {/*{selectedEmail && (*/}
              {/*    <div>*/}
              {/*      <h2>Selected Email:</h2>*/}
              {/*      <p>ID: {selectedEmail.id}</p>*/}
              {/*      <p>Date Received: {selectedEmail.dateReceived}</p>*/}
              {/*      <p>Email Subject: {selectedEmail.emailSubject}</p>*/}
              {/*      <p>Message Body: {selectedEmail.messageBody}</p>*/}
              {/*    </div>*/}
              {/*)} */}
            </div>
          </div>
        </div>
      </main>
    </div>


  );

}

export default App;
