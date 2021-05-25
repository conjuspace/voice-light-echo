/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
// import hmbBtn from './hmbBtn';
import videoVimeo from './videoVimeo';
import contactInfo from './contactInfo';

document.addEventListener('DOMContentLoaded', () => { 
  // hmbBtn;  
  console.log("DOMContentLoaded"); 
  videoVimeo();
  contactInfo();   
});


if (module.hot) {
  module.hot.accept();
}
