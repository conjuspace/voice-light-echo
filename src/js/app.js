/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */

import videoVimeo from './videoVimeo';
import contactInfo from './contactInfo';
import typeWriteTextStart from './typeWriteTextStart';



document.addEventListener('DOMContentLoaded', () => {
  typeWriteTextStart();
  videoVimeo();
  contactInfo(); 
});


if (module.hot) {
  module.hot.accept();
}
