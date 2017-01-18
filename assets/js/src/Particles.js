

daf_igra_01.Particles = (configObject) => {

  'use strict';
  const instance = {};

  let parent = configObject.parent || 'body';
  let numberOfParticles = configObject.numberOfParticles || 1;
  let duration = configObject.duration || 1;
  let type = configObject.type || 'sphere';

  let particleTemplateString = `<div class="particle"></div>`;

  const easeArray = [ 'linear', 'ease', 'ease-in', 'ease-out' ];



  const makeParticles = (dataObject) => {
    parent = dataObject.parent || parent;
    numberOfParticles = dataObject.numberOfParticles || numberOfParticles;
    duration = dataObject.duration || duration;
    type = dataObject.type || type;

    let particlesString = '';
    console.log(type);
    for (let i = 0; i < numberOfParticles; i++) {

      let pString = 
      `<div class="particle" data-type="${type}"></div>`;
      // console.log( pString );
      particlesString += pString;
    }
    
    parent.append(particlesString);
    
    setTimeout(() => {
      moveThemParticles(parent);
    }, 35);
  };

  const moveThemParticles = (parent) => {
    let _getDuration = daf_igra_01.getRandomInRange(0.35, 0.7);
    // let _getRandomEase = easeArray[daf_igra_01.getRandomIntInRange(0, easeArray.length-1)];
    let _getRandomEase = easeArray[1];

    parent.find('.particle').each((index, particle) => {

      let _getX = daf_igra_01.getRandomIntInRange(-daf_igra_01.PARTICLE_MAX_OFFSET, daf_igra_01.PARTICLE_MAX_OFFSET);
      let _getY = daf_igra_01.getRandomIntInRange(-daf_igra_01.PARTICLE_MAX_OFFSET, daf_igra_01.PARTICLE_MAX_OFFSET);
      let _getR = daf_igra_01.getRandomIntInRange(0, 720);
      let _getScale = daf_igra_01.getRandomInRange(0.1, 0.2);
      let _getRed = daf_igra_01.getRandomIntInRange(60, 255);
      let _getGreen = daf_igra_01.getRandomIntInRange(60, 255);
      let _getBlue = daf_igra_01.getRandomIntInRange(60, 255);

      $(particle).css({
        '-webkit-transform': 'translate(' + _getX + 'px, ' + _getY + 'px)' + ' rotate(' + _getR + 'deg)' + ' scale(' + _getScale + ')',
        '-moz-transform': 'translate('+_getX + 'px, ' + _getY + 'px)' + ' rotate(' + _getR + 'deg)' + ' scale(' + _getScale + ')',
        '-o-transform': 'translate('+_getX + 'px, ' + _getY + 'px)' + ' rotate(' + _getR + 'deg)' + ' scale(' + _getScale + ')',
        '-ms-transform': 'translate('+ _getX + 'px, ' + _getY + 'px)' + ' rotate(' + _getR + 'deg)' + ' scale(' + _getScale + ')',
        transform : 'translate(' + _getX + 'px, ' + _getY + 'px)' + ' rotate(' + _getR + 'deg)' + ' scale(' + _getScale + ')',

        '-webkit-transition-duration' : _getDuration + 's',
        'transition-duration':  _getDuration + 's',

        '-webkit-transition-timing-function' : _getRandomEase,
        '-moz-transition-timing-function' : _getRandomEase,
        '-o-transition-timing-function' : _getRandomEase,
        'transition-timing-function' : _getRandomEase,

        'background-color': 'rgb(' + _getRed + ',  ' + _getGreen + ', ' + _getBlue + ')'
      });
    });
  };

  const getScale = () => {
    // style="transform: translate(0px, 30px) rotate(1deg); transition-duration: 10s; transition-timing-function: linear;"
    return `scale( ${daf_igra_01.getRandomIntInRange(1, 10)} )`;
  };
  


  /* API */
  instance.init = () => {};

  instance.makeParticles = (dataObject) => {
    makeParticles(dataObject);
  };
  
  console.log('Particles ready');
  return instance;
};