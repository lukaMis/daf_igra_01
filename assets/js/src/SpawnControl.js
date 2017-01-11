

daf_igra_01.SpawnControl = (dataObject) => {

  'use strict';
  const instance = {};

  const GAME_DATA = dataObject.data;

  let arrayOfCorrectAnswers = [];
  let arrayOfWrongAnswers = [];

  let counter = 0;

  let spawnInterval;


  const getQuestion = () => {

    resetArrays();
    // console.log(GAME_DATA);

    // getQuestion

    // console.log('********************************* getQuestion', counter);

    daf_igra_01.CURRENT_ID = daf_igra_01.getRandomIntInRange(0, GAME_DATA.length-1);
    // GAME_DATA[daf_igra_01.CURRENT_ID].question;

    // for (var i = 0; i < 100; i++) {
    //   // console.log( GAME_DATA[daf_igra_01.getRandomIntInRange(0, GAME_DATA.length-1)].question );
    // }

    // console.log('daf_igra_01.CURRENT_ID',  GAME_DATA[daf_igra_01.CURRENT_ID].question );

    populateArrays();

    counter++;
    return GAME_DATA[daf_igra_01.CURRENT_ID].question;
  };

  const resetArrays = () => {
    arrayOfCorrectAnswers.length = 0;
    arrayOfWrongAnswers.length = 0;
  };

  const populateArrays = () => {
    for (let i = 0; i < GAME_DATA[daf_igra_01.CURRENT_ID].answers.length; i++) {
      arrayOfCorrectAnswers.push(GAME_DATA[daf_igra_01.CURRENT_ID].answers[i]);
    }

    // console.log('*****************', daf_igra_01.CURRENT_ID);
    for (let i = 0; i < GAME_DATA.length; i++) {
      if(i === daf_igra_01.CURRENT_ID) {
        continue;
      }
      // console.log(i);
      for (let j = 0; j < GAME_DATA[i].answers.length; j++) {
        arrayOfWrongAnswers.push(GAME_DATA[i].answers[j]);
      }
    }
  };


  const getObject = () => {


    return;
  };


  const startSpawn = () => {
    spawnInterval = setInterval(() => {
      spawn();
    }, daf_igra_01.SPAWN_TIME_IN_SECONDS * 1000 );
    spawn();
  };


  const spawn = () => {
    // let randomNumberToSpawnFrom = 0;
    let spawnText = '';
    let idToAssign = 0;
    if(daf_igra_01.getPercentChance( daf_igra_01.CORRECT_SPAWN_PERCENT )) {
      // randomNumberToSpawnFrom = daf_igra_01.getRandomIntInRange(0, arrayOfCorrectAnswers.length - 1);
      // console.log('use correct');
      spawnText = arrayOfCorrectAnswers[daf_igra_01.getRandomIntInRange(0, arrayOfCorrectAnswers.length - 1)];
      idToAssign = daf_igra_01.CURRENT_ID;
    } else {
      // randomNumberToSpawnFrom = daf_igra_01.getRandomIntInRange(0, arrayOfWrongAnswers.length - 1);
      // console.log('use WRONG');
      spawnText = arrayOfWrongAnswers[daf_igra_01.getRandomIntInRange(0, arrayOfWrongAnswers.length - 1)];
      idToAssign = daf_igra_01.CURRENT_ID + 1;
    }
    $(instance).trigger('onSpawn', {
      spawn: spawnText
    });

    // $('#gameView .answer').remove();
    // $('#gameView').append()
    const answer = 
    `
    <div class="answer" data-id="${idToAssign}">
      <div class="textWrapper">
        <p>${spawnText}</p>
      </div>
    </div>
    `;
    $('#gameView').append(answer);

    setAnswerPosition();
  };

  const setAnswerPosition = () => {
    const answerLength = $('#gameView .answer').length;
    const answer = $($('#gameView .answer')[answerLength - 1]);
    const answerWidth = answer.outerWidth();
    const leftAndRightMargin = 20;
    let maxX = 1024 - answerWidth - leftAndRightMargin;
    let randomX;

    let _getX = 0;
    let _getY = 1000;
    let _getR = daf_igra_01.getRandomIntInRange(-daf_igra_01.MAX_ROTATION, daf_igra_01.MAX_ROTATION);
    let randomTop = daf_igra_01.getRandomIntInRange(-daf_igra_01.MAX_ROTATION, daf_igra_01.MAX_ROTATION);
    randomTop = 20;

    if(maxX < 0 ) {
      maxX = 0;
      randomX = 0;
    } else {
      randomX = daf_igra_01.getRandomIntInRange(leftAndRightMargin, maxX);
    }
    // console.log( randomX );
    answer.css({
      
      left : randomX,
      top: randomTop,

      '-webkit-transform': 'translate(' + _getX + 'px, ' + _getY + 'px)' + ' rotate(' + _getR + 'deg)',
      '-moz-transform': 'translate(' + _getX + 'px, ' + _getY + 'px)' + ' rotate(' + _getR + 'deg)',
      '-o-transform': 'translate(' + _getX + 'px, ' + _getY + 'px)' + ' rotate(' + _getR + 'deg)',
      '-ms-transform': 'translate(' + _getX + 'px, ' + _getY + 'px)' + ' rotate(' + _getR + 'deg)',
      transform : 'translate(' + _getX + 'px, ' + _getY + 'px)' + ' rotate(' + _getR + 'deg)',

      '-webkit-transition-duration' : daf_igra_01.ANSWER_FALL_TIME + 's',
      'transition-duration':  daf_igra_01.ANSWER_FALL_TIME + 's',

      '-webkit-transition-timing-function' : daf_igra_01.EASING_FUNCTION_TO_USE,
      '-moz-transition-timing-function' : daf_igra_01.EASING_FUNCTION_TO_USE,
      '-o-transition-timing-function' : daf_igra_01.EASING_FUNCTION_TO_USE,
      'transition-timing-function' : daf_igra_01.EASING_FUNCTION_TO_USE
    });

    answer.one('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', onTransitionEndHandler);
  };

  const onTransitionEndHandler = (e) => {
    $(e.target).remove();
  };


  /* API */
  instance.init = () => {
    
  };

  instance.startSpawn = () => {
    startSpawn();
  };

  instance.getQuestion = () => {
    return getQuestion();
  };

  instance.getObject = () => {
    return getObject();
  };
  
  console.log('SpawnControl ready');
  return instance;
};

/*

<div class="answer" data-id="0">
  <div class="textWrapper">
    <p>Luka</p>
  </div>
</div>

*/