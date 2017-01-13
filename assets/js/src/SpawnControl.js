

daf_igra_01.SpawnControl = (dataObject) => {

  'use strict';
  const instance = {};

  const GAME_DATA = dataObject.data;

  let arrayOfCorrectAnswers = [];
  let arrayOfWrongAnswers = [];

  let spawnInterval;
  let spawnTimeout;


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
    // spawnInterval = setInterval(() => {
    //   spawn();
    // }, daf_igra_01.SPAWN_TIME_IN_SECONDS * 1000 );
    spawn();
  };

  const stopSpawn = () => {
    // clearInterval(spawnInterval);
    clearTimeout(spawnTimeout);
    removeSpawnedObjects();
  };

  const removeSpawnedObjects = () => {
    $('#gameView .answer').each((index, answer) => {
      removeAnswer( $(answer) );
    });
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
    const answerString = 
    `
    <div class="answer" data-id="${idToAssign}">
      <div class="textWrapper">
        <p>${spawnText}</p>
      </div>
    </div>
    `;
    $('#gameView').append(answerString);

    
    setTimeout(() => {
      setAnswerPosition();
    }, 35);

    setTimeout(() => {
      setAnswerTransition();
    }, 75);

    spawnTimeout = setTimeout(() => {
      spawn();
    }, daf_igra_01.SPAWN_TIME_IN_SECONDS * 1000 );
  };

  const setAnswerPosition = () => {
    var answerLength = $('#gameView .answer').length;
    var answer = $($('#gameView .answer')[answerLength - 1]);
    var answerWidth = answer.outerWidth();
    var leftAndRightMargin = 20;
    var maxX = 1024 - answerWidth - leftAndRightMargin;
    var randomX;

    var _getX = 0;
    var randomTop = daf_igra_01.getRandomIntInRange(-daf_igra_01.MAX_ROTATION, daf_igra_01.MAX_ROTATION);
    randomTop = 20;

    if(maxX < 0 ) {
      maxX = 0;
      randomX = 0;
    } else {
      randomX = daf_igra_01.getRandomIntInRange(leftAndRightMargin, maxX);
    }

    answer.css({
      left : randomX,
      top: randomTop
    });
  };

  const setAnswerTransition = () => {
    var answerLength = $('#gameView .answer').length;
    var answer = $($('#gameView .answer')[answerLength - 1]);
    var _getX = 0;
    var _getR = daf_igra_01.getRandomIntInRange(-daf_igra_01.MAX_ROTATION, daf_igra_01.MAX_ROTATION);

    answer.css({
      '-webkit-transform': 'translate(' + _getX + 'px, ' + daf_igra_01.MAX_Y_POSITION + 'px)' + ' rotate(' + _getR + 'deg)',
      '-moz-transform': 'translate('+_getX + 'px, ' + daf_igra_01.MAX_Y_POSITION + 'px)' + ' rotate(' + _getR + 'deg)',
      '-o-transform': 'translate('+_getX + 'px, ' + daf_igra_01.MAX_Y_POSITION + 'px)' + ' rotate(' + _getR + 'deg)',
      '-ms-transform': 'translate('+ _getX + 'px, ' + daf_igra_01.MAX_Y_POSITION + 'px)' + ' rotate(' + _getR + 'deg)',
      transform : 'translate(' + _getX + 'px, ' + daf_igra_01.MAX_Y_POSITION + 'px)' + ' rotate(' + _getR + 'deg)',

      '-webkit-transition-duration' : daf_igra_01.ANSWER_FALL_TIME + 's',
      'transition-duration':  daf_igra_01.ANSWER_FALL_TIME + 's',

      '-webkit-transition-timing-function' : daf_igra_01.EASING_FUNCTION_TO_USE,
      '-moz-transition-timing-function' : daf_igra_01.EASING_FUNCTION_TO_USE,
      '-o-transition-timing-function' : daf_igra_01.EASING_FUNCTION_TO_USE,
      'transition-timing-function' : daf_igra_01.EASING_FUNCTION_TO_USE
    });

    answer.one('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', onBottomOfPageReached);
  };

  const onBottomOfPageReached = (e) => {
    removeAnswer( $(e.target) );
  };

  const removeAnswer = (answer) => {
    answer.off('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', onBottomOfPageReached);
    answer.remove();
  };

  const shakeAnswer = (answer) => {
    answer.find('.textWrapper').addClass( 'shake' ).one('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', onShakeEnd);
  };

  const onShakeEnd = (e, data) => {
    $(e.currentTarget).off('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', onShakeEnd);
    $(e.currentTarget).removeClass('shake');
  };

  const scaleAnswer = (answer) => {
    answer.find('.textWrapper').addClass( 'scale-0 ' ).one('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', onScaleEnd);
  };

  const onScaleEnd = (e, data) => {
    $(e.currentTarget).off('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', onScaleEnd);
    // $(e.currentTarget).parent().remove();
    removeAnswer( $(e.currentTarget).parent() );
  };


  const reset = () => {
    resetArrays();
  };


  /* API */
  instance.init = () => {
    
  };

  instance.startSpawn = () => {
    startSpawn();
  };

  instance.stopSpawn = () => {
    stopSpawn();
  };

  instance.getQuestion = () => {
    return getQuestion();
  };

  instance.getObject = () => {
    return getObject();
  };

  instance.removeAnswer = (answer) => {
    removeAnswer(answer);
  };

  instance.scaleAnswer = (answer) => {
    scaleAnswer(answer);
  };

  instance.shakeAnswer = (answer) => {
    shakeAnswer(answer);
  };

  instance.reset = () => {
    reset();
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