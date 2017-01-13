

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
    daf_igra_01.Bootstrap();
    $(document).on('keypress', showDevConsole);
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
    checkForCookies();
    $('#devView form #submit').one('click', onFormClick);
    $('body').removeClass('loading');
  }

  function onFormClick(e) {
    $('#devView form #submit').off('click', onFormClick);
    console.log('form clicked');
    updateGameObject();
    $('#devView').remove();
    // daf_igra_01.Bootstrap();
    $(document).on('keypress', showDevConsole);
    console.log(daf_igra_01);
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