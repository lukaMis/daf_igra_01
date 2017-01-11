

daf_igra_01.GameControl = (dataObject) => {

  'use strict';
  const instance = {};

  const infoBar = dataObject.infoBar;
  const spawnControl = dataObject.spawnControl;
  const feedbacView = dataObject.feedbacView;

  let newQuestionInterval;
  

  const init = () => {

    $('#contentWrapper').prepend('<div id="gameView" class="view"></div>');
    
    newQuestionInterval = setInterval(() => {
      // spawnControl.getQuestion();
      infoBar.setQuestion( spawnControl.getQuestion() );
    }, daf_igra_01.NEW_QUESTION_TIMER_IN_SECONDS * 1000);
    
    infoBar.setQuestion( spawnControl.getQuestion() );
    // spawnControl.getQuestion();
    spawnControl.startSpawn();

    addEventListner();
  };


  const addEventListner = () => {
    $('#gameView').on('click', onGameViewClicked);
  };

  const onGameViewClicked = (e) => {
    // console.log(  );
    const $target = $(e.target);
    if($target.hasClass('view')) {
      console.log('view clicked');
      return;
    }
    const id = parseInt($target.attr('data-id'));
    // console.log('check passed', id);
    checkForMatch({
      answer: $target,
      id : id
    });
  };

  const checkForMatch = (dataObject) => {
    console.log('dataObject.id', dataObject.id);
    console.log('daf_igra_01.CURRENT_ID', daf_igra_01.CURRENT_ID);
    if (dataObject.id === daf_igra_01.CURRENT_ID) {
      console.log('clicked CORRECT');
    } else {
      console.log('clicked wrong');
    }
  };


  /* API */
  instance.init = () => {
    init();
  };
  
  console.log('GameControl ready');
  return instance;
};