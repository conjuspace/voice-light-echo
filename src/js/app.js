/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
// import hmbBtn from './hmbBtn';
import videoVimeo from './videoVimeo';

document.addEventListener('DOMContentLoaded', () => { 
  // hmbBtn;  
  console.log("DOMContentLoaded"); 
  videoVimeo;
  
});


if (module.hot) {
  module.hot.accept();
}
