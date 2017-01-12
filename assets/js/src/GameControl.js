

daf_igra_01.GameControl = (dataObject) => {

  'use strict';
  const instance = {};

  const infoBar = dataObject.infoBar;
  const spawnControl = dataObject.spawnControl;
  const feedbacView = dataObject.feedbacView;

  let newQuestionInterval;
  

  const init = () => {

    addGameView();
    
    newQuestionInterval = setInterval(() => {
      // spawnControl.getQuestion();
      infoBar.setQuestion( spawnControl.getQuestion() );
    }, daf_igra_01.NEW_QUESTION_TIMER_IN_SECONDS * 1000);

    infoBar.init();
    
    infoBar.setQuestion( spawnControl.getQuestion() );
    spawnControl.startSpawn();

    addEventListnerForClicking();
    addEventListnerForGameEnd();
    addEventListnerForRestart();
  };

  const addEventListnerForClicking = () => {
    $('#gameView').on('click', onGameViewClicked);
  };

  const removeEventListnerForClicking = () => {
    $('#gameView').off('click', onGameViewClicked);
  };

  const addEventListnerForGameEnd = () => {
    $(infoBar).one('onEndOfTime', onEndOfTimeHandler);
  };

  const addEventListnerForRestart = () => {
    $(feedbacView).one('onFeedbackViewClicked', () => {
      init();
    });
  };

  const onEndOfTimeHandler = (e) => {
    spawnControl.stopSpawn();
    clearInterval(newQuestionInterval);
    feedbacView.init( infoBar.getScore() );
    resetViews();
  };

  const onGameViewClicked = (e) => {
    const $target = $(e.target);
    if($target.hasClass('view')) {
      console.log('view clicked');
      return;
    }
    const id = parseInt($target.attr('data-id'));
    checkForMatch({
      answer: $target,
      id : id
    });
  };

  const checkForMatch = (dataObject) => {
    if (dataObject.id === daf_igra_01.CURRENT_ID) {
      handleCorrect(dataObject);
    } else {
      handleWrong(dataObject);
    }
  };

  const handleCorrect = (dataObject) => {
    spawnControl.scaleAnswer( dataObject.answer );
    infoBar.incrementScore();
  };

  const handleWrong = (dataObject) => {
    spawnControl.shakeAnswer( dataObject.answer );
    infoBar.decrementScore();
  };

  const addGameView = () => {
    $('#contentWrapper').prepend('<div id="gameView" class="view"></div>');
  };

  const removeGameView = () => {
    removeEventListnerForClicking();
    $('#contentWrapper #gameView').remove();
    // $('#contentWrapper').empty();
  };

  const resetViews = () => {
    removeGameView();
    spawnControl.reset();
    infoBar.reset();
  };


  /* API */
  instance.init = () => {
    init();
  };
  
  console.log('GameControl ready');
  return instance;
};