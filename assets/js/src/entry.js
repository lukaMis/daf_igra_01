
const daf_igra_01 = {};

daf_igra_01.CURRENT_ID = 0;


daf_igra_01.GAME_TIME_IN_SECONDS = 35;

daf_igra_01.SPAWN_TIME_IN_SECONDS = 0.5;
daf_igra_01.NEW_QUESTION_TIMER_IN_SECONDS = 10;

daf_igra_01.ANSWER_FALL_TIME = 20;
daf_igra_01.MAX_ROTATION = 20;
daf_igra_01.EASING_FUNCTION_TO_USE = 'linear';
daf_igra_01.CORRECT_SPAWN_PERCENT = 50;

daf_igra_01.CORRECT_ANSWER_POINTS = 10;
daf_igra_01.WRONG_ANSWER_POINTS = 5;




daf_igra_01.getPercentChance = (maxPercent) => {
  return (Math.floor(Math.random() * 100) > maxPercent) ? false:true;
};

daf_igra_01.getRandomIntInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


daf_igra_01.removePreloader = () => {
  $('body').removeClass('loading');
};