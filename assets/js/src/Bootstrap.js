

daf_igra_01.Bootstrap = () => {

  'use strict';
  const instance = {};


  const dataHandler = daf_igra_01.DataHandler();


  const feedbacView = daf_igra_01.FeedbackView({
    data: dataHandler.getFeedbackData()
  });
  $(feedbacView).on('onFeedbackViewClicked', (e) => {
    console.log('Restart teh game');
  });


  const infoBar = daf_igra_01.InfoBar({
    data : dataHandler.getGameViewData()
  });


  const spawnControl = daf_igra_01.SpawnControl({
    data: dataHandler.getGameData()
  });


  const particles = daf_igra_01.Particles({
    parent : '#contentWrapper',
    numberOfParticles : 10,
    duration : 1,
    type : 'sphere'
  });


  const gameControl = daf_igra_01.GameControl({
    infoBar: infoBar,
    spawnControl: spawnControl,
    feedbacView: feedbacView,
    particles: particles
  });
  // gameControl.init();



  // feedbacView.init();
  // daf_igra_01.removePreloader();


  const titleView = daf_igra_01.TitleView({
    data: dataHandler.getTitleData()
  });
  $(titleView).on('onTitleViewClicked', (e) => {
    console.log('Start teh game');
    daf_igra_01.removePreloader();
    gameControl.init();
  });
  
  titleView.init();
  daf_igra_01.removePreloader();

  
  /* API */
  instance.init = () => {};
  
  console.log('Bootstrap ready');
  return instance;
};