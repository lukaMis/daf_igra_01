

daf_igra_01.SoundControl = () => {

  'use strict';
  const instance = {};

  let filesLoaded = 0;
  let filesToLoad = 0;

  const loadAudio = (configObj) => {
    createjs.Sound.on('fileload', onSoundLoaded);

    filesToLoad = Object.keys(configObj).length;
    console.log('filesToLoad', filesToLoad);

    // for (let i = 0; i < filesToLoad; i++) {
    //   console.log(configObj[i]);
    //   // filesToLoad++;
    //   // register sound
    // }
    for (const key of Object.keys(configObj)) {
      // console.log(key, configObj[key]);
      // console.log('*** KEY:', key);
      // console.log('*** VALUE:', configObj[key]);
      createjs.Sound.registerSound(`assets/audio/${configObj[key]}.mp3`, key);
    }
  };

  const onSoundLoaded = (e) => {
    filesLoaded++;
    if(filesLoaded === filesToLoad) {
      filesLoaded = null;
      filesToLoad = null;
      console.log('all audio completed');
      $(instance).trigger('onAudioLoadComplete');
    }
  };

  const playAudio = (id) => {
    const player = createjs.Sound.play(id);
    player.on('complete', onAudioCompleted);
  };

  const onAudioCompleted = (e) => {
    e.target.off('complete', onAudioCompleted);
    $(instance).trigger('onAudioCompleted');
  };


  /* API */
  instance.init = (configObj) => {
    loadAudio(configObj);
  };
  instance.play = (id) => {
    playAudio(id);
  };
  

  console.log('SoundControl ready');
  return instance;
};