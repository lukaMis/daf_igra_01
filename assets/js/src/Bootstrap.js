

daf_igra_01.Bootstrap = (configObject) => {

  'use strict';
  const instance = {};



  const themeControler = daf_igra_01.ThemeControler(configObject.theme);


  const dataHandler = daf_igra_01.DataHandler();

  const soundControl = daf_igra_01.SoundControl();
  $(soundControl).on('onAudioLoadComplete', (e) => {
    console.log('from bootstrap onAudioLoadComplete');
    titleView.init();
    daf_igra_01.removePreloader();
  });

  const feedbacView = daf_igra_01.FeedbackView({
    data: dataHandler.getFeedbackData()
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
    particles: particles,
    soundControl: soundControl
  });

  const titleView = daf_igra_01.TitleView({
    data: dataHandler.getTitleData()
  });
  $(titleView).on('onTitleViewClicked', (e) => {
    console.log('Start teh game');
    gameControl.init();
  });

  soundControl.init( dataHandler.getAudioData() );

  
  
  /* API */
  instance.init = () => {};
  
  console.log('Bootstrap ready');
  return instance;
};