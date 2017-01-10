

daf_igra_01.Bootstrap = () => {

  'use strict';
  const instance = {};


  const dataHandler = daf_igra_01.DataHandler();
  // console.log( dataHandler.getTitleData() );
  // console.log( dataHandler.getGameData() );
  // console.log( dataHandler.getFeedbackData() );


  const titleView = daf_igra_01.TitleView({
    data: dataHandler.getTitleData()
  });
  $(titleView).on('onTitleViewClicked', (e) => {
    console.log('Start teh game');
  });


  const feedbacView = daf_igra_01.FeedbackView({
    data: dataHandler.getFeedbackData()
  });
  $(feedbacView).on('onFeedbackViewClicked', (e) => {
    console.log('Restart teh game');
  });


  // feedbacView.init();
  // titleView.init();


  
  daf_igra_01.removePreloader();
  
  /* API */
  instance.init = () => {};
  
  console.log('Bootstrap ready');
  return instance;
};