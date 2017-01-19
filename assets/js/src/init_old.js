

(() => {
  
  'use strict';
  $(document).one('i18nComplete', oni18nComplete);

  let gameTime;
  let questionTime;
  let spawnTime;
  let fallTime;
  let maxRotation;
  let spawnPercent;
  let pointsUp;
  let pointsDown;
  let fallMethod;

  let settingsConsoleString = 
  `
  <div id="devView">
          <form action="" method="get">
            Game time  <input type="text" id="gameTime" name="" value="50"> (sec)
            <br><br>
            New question time  <input type="text" id="questionTime" name="" value="10"> (sec)
            <br><br>
            Answer spawn time  <input type="text" id="spawnTime" name="" value="1"> (sec)
            <br><br>
            Answer fall time  <input type="text" id="fallTime" name="" value="20"> (sec)
            <br><br>
            Answer max rotation  <input type="text" id="maxRotation" name="" value="20"> (deg)
            <br><br>
            Answer correct spawn %  <input type="text" id="spawnPercent" name="" value="50"> (%)
            <br><br>

            Points up for correct  <input type="text" id="pointsUp" name="" value="10">
            <br><br>
            Points down for wrong  <input type="text" id="pointsDown" name="" value="10">
            <br><br>
            Answer fall method <select id="fallMethod" name="fallMethod">
                <option value="linear">linear</option>
                <option value="ease">ease</option>
                <option value="ease-out">ease-out</option>
                <option value="ease-in">ease-in</option>
              </select>
              <br><br>
            <p id="submit">Potrdi</p>
          </form>
        </div>
        `;

  function oni18nComplete(e) {
    FastClick.attach(document.body);
    // checkForCookies();
    FallingWords.Bootstrap({
      theme: 0
    });
    // $(document).on('keypress', showDevConsole);
  };

  function showDevConsole(e) {
    console.log(e.keyCode);
    if(e.keyCode === 115) {
      $(document).off('keypress', showDevConsole);
      initDevConsole();
      console.log('init DONE');
    }
  };

  function initDevConsole() {
    $('#wrapper').prepend(settingsConsoleString);
    gameTime = $('#devView #gameTime');
    questionTime = $('#devView #questionTime');
    spawnTime = $('#devView #spawnTime');
    fallTime = $('#devView #fallTime');
    maxRotation = $('#devView #maxRotation');
    spawnPercent = $('#devView #spawnPercent');
    pointsUp = $('#devView #pointsUp');
    pointsDown = $('#devView #pointsDown');
    fallMethod = $('#devView #fallMethod');
    DEV_SHIET();
  };

  function DEV_SHIET() {
    checkForCookiesForForm();
    $('#devView form #submit').one('click', onFormClick);
    $('body').removeClass('loading');
  }

  function onFormClick(e) {
    $('#devView form #submit').off('click', onFormClick);
    console.log('form clicked');
    updateGameObject();
    $('#devView').remove();
    // FallingWords.Bootstrap();
    $(document).on('keypress', showDevConsole);
    console.log(FallingWords);
  }


  function updateGameObject() {
    FallingWords.GAME_TIME_IN_SECONDS = parseFloat(gameTime[0].value);
    FallingWords.NEW_QUESTION_TIMER_IN_SECONDS = parseFloat(questionTime[0].value);

    FallingWords.SPAWN_TIME_IN_SECONDS = parseFloat(spawnTime[0].value);
    FallingWords.ANSWER_FALL_TIME = parseFloat(fallTime[0].value);
    FallingWords.MAX_ROTATION = parseFloat(maxRotation[0].value);

    FallingWords.CORRECT_ANSWER_POINTS = parseFloat(pointsUp[0].value);
    FallingWords.WRONG_ANSWER_POINTS = parseFloat(pointsDown[0].value);

    FallingWords.EASING_FUNCTION_TO_USE = fallMethod[0].value;

    let spawnPercentForCorrect = parseFloat(spawnPercent[0].value);
    spawnPercentForCorrect = (spawnPercentForCorrect > 100) ? 100:spawnPercentForCorrect;
    spawnPercentForCorrect = (spawnPercentForCorrect <= 0) ? -1:spawnPercentForCorrect;
    FallingWords.CORRECT_SPAWN_PERCENT = spawnPercentForCorrect;

    setCookies();
  };


  function setCookies() {
    Cookies.set('gameTime', FallingWords.GAME_TIME_IN_SECONDS);
    Cookies.set('questionTime', FallingWords.NEW_QUESTION_TIMER_IN_SECONDS);

    Cookies.set('spawnTime', FallingWords.SPAWN_TIME_IN_SECONDS);
    Cookies.set('fallTime', FallingWords.ANSWER_FALL_TIME);
    Cookies.set('maxRotation', FallingWords.MAX_ROTATION);

    Cookies.set('pointsUp', FallingWords.CORRECT_ANSWER_POINTS);
    Cookies.set('pointsDown', FallingWords.WRONG_ANSWER_POINTS);

    Cookies.set('fallMethod', FallingWords.EASING_FUNCTION_TO_USE);

    Cookies.set('spawnPercent', FallingWords.CORRECT_SPAWN_PERCENT);
  };

  function checkForCookiesForForm() {
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
      fillTheGameData();
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

  function fillTheGameData() {

    FallingWords.GAME_TIME_IN_SECONDS = parseInt(Cookies.get('gameTime'));
    FallingWords.NEW_QUESTION_TIMER_IN_SECONDS = parseInt(Cookies.get('questionTime'));

    FallingWords.SPAWN_TIME_IN_SECONDS = parseFloat(Cookies.get('spawnTime'));
    FallingWords.ANSWER_FALL_TIME = parseInt(Cookies.get('fallTime'));
    FallingWords.MAX_ROTATION = parseInt(Cookies.get('maxRotation'));

    FallingWords.CORRECT_ANSWER_POINTS = parseInt(Cookies.get('pointsUp'));
    FallingWords.WRONG_ANSWER_POINTS = parseInt(Cookies.get('pointsDown'));

    FallingWords.EASING_FUNCTION_TO_USE = Cookies.get('fallMethod');

    FallingWords.CORRECT_SPAWN_PERCENT = parseInt(Cookies.get('spawnPercent'));

    console.log('fillTheGameData DONE');
  };

  
})();