

daf_igra_01.FeedbackView = (dataObject) => {

  'use strict';
  const instance = {};
  instance.data = dataObject.data;


  const createView = (pointsAchived) => {

    // update text with points achived
    instance.data.text = instance.data.text.replace('***', `<span>${pointsAchived}</span>`);

    const viewString = 
    `
    <div id="feedbackView" class="view">
      <div class="viewContent">
        <p class="annotation">${instance.data.text}</p>
        <div class="button">
          <p>${instance.data.button}</p>
        </div>
      </div>
    </div>
    `;

    $('#contentWrapper').append(viewString);
    $('#contentWrapper #feedbackView .button').one('click', onButtonClick);
  };


  const onButtonClick = (e) => {
    $(instance).trigger('onFeedbackViewClicked');
    $('#contentWrapper #feedbackView').remove();
  };



  /* API */
  instance.init = (pointsAchived = 0) => {
    createView(pointsAchived);
  };
  
  console.log('FeedbackView ready');
  return instance;
};

/*
<!-- <div id="feedbackView" class="view">
          <div class="viewContent">
            <p class="annotation" data-i18n="[html]feedbackView.text"></p>
            <div class="button">
              <p data-i18n="[html]feedbackView.button"></p>
            </div>
          </div>
        </div> -->
*/