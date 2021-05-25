/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */

import videoVimeo from './videoVimeo';
import contactInfo from './contactInfo';
import typeWriteText from './typeWriteText';


document.addEventListener('DOMContentLoaded', () => {
  typeWriteText();
  videoVimeo();
  contactInfo(); 
});


if (module.hot) {
  module.hot.accept();
}
