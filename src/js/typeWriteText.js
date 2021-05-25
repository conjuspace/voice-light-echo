import Typewriter from 'typewriter-effect/dist/core';
const typeWriteText = () => {
  var app = document.getElementById('testTypeWriter');
 
  var typewriter = new Typewriter(app, {
    loop: true,
    delay: 75,
  });
  
  typewriter
    .pauseFor(2500)
    .typeString('With this nice plugin we can or not can')
    .pauseFor(300)
    .deleteChars(10)
    .typeString('<strong> SHOW</strong> a cool typewriter effect and ')
    .typeString('<strong>tuning <span style="color: #27ae60;">him</span> as you wish!</strong>')
    .pauseFor(1000)
    .start();  
}

export default typeWriteText;