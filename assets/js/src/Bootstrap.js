

daf_igra_01.Bootstrap = () => {

  'use strict';
  const instance = {};


  const dataHandler = daf_igra_01.DataHandler();
  // console.log( dataHandler.getTitleData() );
  // console.log( dataHandler.getGameData() );
  // console.log( dataHandler.getFeedbackData() );





  const feedbacView = daf_igra_01.FeedbackView({
    data: dataHandler.getFeedbackData()
  });
  $(feedbacView).on('onFeedbackViewClicked', (e) => {
    console.log('Restart teh game');
  });


  const infoBar = daf_igra_01.InfoBar({
    data : dataHandler.getGameViewData(),
    maxTime : daf_igra_01.GAME_TIME_IN_SECONDS
  });
  infoBar.init();
  // infoBar.setScore(10);

  const spawnControl = daf_igra_01.SpawnControl({
    data: dataHandler.getGameData()
  });
  // spawnControl.init();


  const gameControl = daf_igra_01.GameControl({
    infoBar: infoBar,
    spawnControl: spawnControl,
    feedbacView: feedbacView
  });
  gameControl.init();



  // feedbacView.init();
  daf_igra_01.removePreloader();


  const titleView = daf_igra_01.TitleView({
    data: dataHandler.getTitleData()
  });
  $(titleView).on('onTitleViewClicked', (e) => {
    console.log('Start teh game');
    daf_igra_01.removePreloader();
  });
  // titleView.init();

  
  /* API */
  instance.init = () => {};
  
  console.log('Bootstrap ready');
  return instance;
};