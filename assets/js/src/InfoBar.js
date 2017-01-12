

daf_igra_01.InfoBar = (dataObject) => {

  'use strict';
  const instance = {};
  instance.data = dataObject.data;

  let timerCounter = 0;
  
  let timerInterval;
  
  const MAX_TIME = dataObject.maxTime;

  const createView = () => {
    const template = 
      `
      <div id="infoBar">
        <p id="time">
          <span id="m">00</span>:<span id="s">00</span>
        </p>
        <p id="question">QUESTION</p>
        <p id="score"><span id="pointsInt">0</span> <span>${instance.data.points}</span></p>
      </div>
      `;
    $('#contentWrapper').append(template);
  };

  const setQuestion = (question) => {
    document.getElementById('question').innerHTML = question;
  };

  const setScore = (score) => {
    document.querySelector('#score #pointsInt').innerHTML = score;
  };

  const incrementScore = () => {
    let currentScore = parseInt(document.querySelector('#score #pointsInt').innerHTML);
    currentScore = currentScore + daf_igra_01.CORRECT_ANSWER_POINTS;
    setScore(currentScore);
  };

  const decrementScore = () => {
    let currentScore = parseInt(document.querySelector('#score #pointsInt').innerHTML);
    currentScore = currentScore - daf_igra_01.WRONG_ANSWER_POINTS;
    setScore(currentScore);
  };

  const getScore = () => {
    return parseInt(document.querySelector('#score #pointsInt').innerHTML);
  };

  const createTimer = () => {
    timerInterval = setInterval( () => {
      timerIntervalTick();
    }, 1000);
    timerIntervalTick();
  };

  const timerIntervalTick = () => {
    // timerCounter++;
    // console.log('timer tick, tick', timerCounter);
    // if(timerCounter === MAX_TIME + 1) {
    //   stopTheTimer();
    //   // console.log('onGameEnd');
    //   $(instance).trigger('onEndOfTime');
    // } else {
    //   updateTimer(timerCounter);
    // }
    // timerCounter++;

    if(timerCounter < MAX_TIME + 1) {
      updateTimer(timerCounter);
      timerCounter++;
    } else {
      stopTheTimer();
      // console.log('onGameEnd');
      $(instance).trigger('onEndOfTime');
    }
  };

  const stopTheTimer = () => {
    clearInterval(timerInterval);
    console.log('timer stopped');
    timerCounter = 0;
  };

  const updateTimer = (counter) => {

    let secLeft = (MAX_TIME - counter) % 60;
    let minLeft = Math.floor((MAX_TIME - counter) / 60);

    secLeft = '0' + secLeft;
    const sec = secLeft.slice(-2);

    minLeft = '0' + minLeft;
    const min = minLeft.slice(-2);

    const timerString = `<span id="m">${min}</span>:<span id="s">${sec}</span>`;
    document.getElementById('time').innerHTML = timerString;
  };

  const reset = () => {
    timerCounter = 0;
    setScore(timerCounter);
    $('#contentWrapper #infoBar').remove();
  };


  /* API */
  instance.init = () => {
    createView();
    createTimer();
  };

  // instance.setTime = () => {};
  instance.setQuestion = (question) => {
    setQuestion(question);
  };
  // instance.setScore = (score = 0) => {
  //   setScore(score);
  // };
  instance.incrementScore = () => {
    incrementScore();
  };

  instance.decrementScore = () => {
    decrementScore();
  };

  instance.getScore = () => {
    return getScore();
  }

  instance.reset = () => {
    reset();
  }
  

  console.log('InfoBar ready');
  return instance;
};

/*
<div id="infoBar">
  <p id="time">00:00:00</p>
  <p id="question">QUESTION</p>
  <p id="points">40 points</p>
</div>
*/