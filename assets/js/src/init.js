

(() => {
  
  'use strict';
  $(document).one('i18nComplete', oni18nComplete);

  let gameTime = $('#devView #gameTime');
  let questionTime = $('#devView #questionTime');
  let spawnTime = $('#devView #spawnTime');
  let fallTime = $('#devView #fallTime');
  let maxRotation = $('#devView #maxRotation');
  let spawnPercent = $('#devView #spawnPercent');
  let pointsUp = $('#devView #pointsUp');
  let pointsDown = $('#devView #pointsDown');
  let fallMethod = $('#devView #fallMethod');

  function oni18nComplete(e) {
    FastClick.attach(document.body);
    // daf_igra_01.Bootstrap();
    DEV_SHIET();
  };

  function DEV_SHIET() {

    checkForCookies();

    $('#devView form #submit').one('click', onFormClick);
    $('body').removeClass('loading');
  }

  function onFormClick(e) {
    $('#devView form #submit').off('click', onFormClick);
    console.log('form clicked');
    updateGameObject();
    $('#devView').remove();
    daf_igra_01.Bootstrap();
  }


  function updateGameObject() {
    daf_igra_01.GAME_TIME_IN_SECONDS = parseFloat(gameTime[0].value);
    daf_igra_01.NEW_QUESTION_TIMER_IN_SECONDS = parseFloat(questionTime[0].value);

    daf_igra_01.SPAWN_TIME_IN_SECONDS = parseFloat(spawnTime[0].value);
    daf_igra_01.ANSWER_FALL_TIME = parseFloat(fallTime[0].value);
    daf_igra_01.MAX_ROTATION = parseFloat(maxRotation[0].value);

    daf_igra_01.CORRECT_ANSWER_POINTS = parseFloat(pointsUp[0].value);
    daf_igra_01.WRONG_ANSWER_POINTS = parseFloat(pointsDown[0].value);

    daf_igra_01.EASING_FUNCTION_TO_USE = fallMethod[0].value;

    let spawnPercentForCorrect = parseFloat(spawnPercent[0].value);
    spawnPercentForCorrect = (spawnPercentForCorrect > 100) ? 100:spawnPercentForCorrect;
    spawnPercentForCorrect = (spawnPercentForCorrect <= 0) ? -1:spawnPercentForCorrect;
    daf_igra_01.CORRECT_SPAWN_PERCENT = spawnPercentForCorrect;

    setCookies();
  };


  function setCookies() {
    Cookies.set('gameTime', daf_igra_01.GAME_TIME_IN_SECONDS);
    Cookies.set('questionTime', daf_igra_01.NEW_QUESTION_TIMER_IN_SECONDS);

    Cookies.set('spawnTime', daf_igra_01.SPAWN_TIME_IN_SECONDS);
    Cookies.set('fallTime', daf_igra_01.ANSWER_FALL_TIME);
    Cookies.set('maxRotation', daf_igra_01.MAX_ROTATION);

    Cookies.set('pointsUp', daf_igra_01.CORRECT_ANSWER_POINTS);
    Cookies.set('pointsDown', daf_igra_01.WRONG_ANSWER_POINTS);

    Cookies.set('fallMethod', daf_igra_01.EASING_FUNCTION_TO_USE);

    Cookies.set('spawnPercent', daf_igra_01.CORRECT_SPAWN_PERCENT);
  };

  function checkForCookies() {
    // console.log('checkFor our Cookies', Cookies.get('gameTime') );
    // Cookies.remove('gameTime');
    // Cookies.remove('questionTime');
    // Cookies.remove('spawnTime');
    // Cookies.remove('fallTime');
    // Cookies.remove('maxRotation');
    // Cookies.remove('pointsUp');
    // Cookies.remove('pointsDown');
    // Cookies.remove('fallMethod');
    // Cookies.remove('spawnPercent');

    if(Cookies.get('gameTime') === undefined) {
      console.log('no cookie bitch');
    } else {
      fillTheForm();
    }
  };

  function fillTheForm() {
    gameTime[0].value = Cookies.get('gameTime');
    questionTime[0].value = Cookies.get('questionTime');
    spawnTime[0].value = Cookies.get('spawnTime');
    fallTime[0].value = Cookies.get('fallTime');
    maxRotation[0].value = Cookies.get('maxRotation');
    spawnPercent[0].value = Cookies.get('spawnPercent');
    pointsUp[0].value = Cookies.get('pointsUp');
    pointsDown[0].value = Cookies.get('pointsDown');
    fallMethod[0].value = Cookies.get('fallMethod');
  };

  
})();