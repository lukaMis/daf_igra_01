

(() => {
  
  'use strict';
  $(document).one('i18nComplete', oni18nComplete);

  function oni18nComplete(e) {
    FastClick.attach(document.body);
    daf_igra_01.Bootstrap();
  };
  
})();