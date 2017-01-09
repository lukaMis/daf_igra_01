

daf_igra_01.TitleView = (dataObject) => {

  'use strict';
  const instance = {};
  instance.data = dataObject.data;

  const createView = () => {
    const viewString = 
    `
    <div id="titleView" class="view">
      <div class="viewContent">
        <p class="annotation">${instance.data.text}</p>
        <div class="button" onclick= "buttonClicked" >
          <p>${instance.data.button}</p>
        </div>
      </div>
    </div>
    `;

    $('#contentWrapper').append(viewString);
  };


  function buttonClicked(e) {
    console.log('CLICKED');
  }

  /* API */
  instance.init = () => {
    createView();
  };
  
  console.log('TitleView ready');
  return instance;
};

/*
<div id="titleView" class="view">
  <div class="viewContent">
    <p class="annotation" data-i18n="[html]titleView.text"></p>
    <div class="button">
      <p data-i18n="[html]titleView.button"></p>
    </div>
  </div>
</div>
*/