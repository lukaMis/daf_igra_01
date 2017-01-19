

daf_igra_01.ThemeControler = (themeToApply) => {

  'use strict';
  const instance = {};



  const applyTheme = (() => {
    console.log('themeToApply', themeToApply);
    $('#wrapper').attr({
      'data-theme': themeToApply
    });
  })();
  

  /* API */
  instance.init = () => {};

  
  console.log('ThemeControler ready');
  return instance;
};