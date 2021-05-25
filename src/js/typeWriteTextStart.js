import Typewriter from 'typewriter-effect/dist/core';
const typeWriteTextStart = () => {   
  let t1writer = new Typewriter(document.getElementById('t1'), {
    loop: false,
    delay: 75,
  });
  t1writer
    .pauseFor(1000)
    .typeString('<span class="start-text">Unpredictable,<br>immersive audio & visuals.<br>Every week.</span><br><br>')
    .pauseFor(1000)
    .typeString('<span class="start-text">No scroll.<br>No search.<br>No algorithm.</span><br><br>')    
    .pauseFor(1000)
    .typeString('<span class="start-text">Time to listen.<br>To what speaks to you.</span><br><br>')    
    .pauseFor(1000)
    .typeString('<span class="start-text">Use it,<br>however you wish.</span>')       
    .start();
   
  // let typewriter = new Typewriter(document.getElementById('testTypeWriter'), {
  //   loop: true,
  //   delay: 75,
  // });  
  // typewriter
  //   .pauseFor(2500)
  //   .typeString('With this nice plugin we can or not can')
  //   .pauseFor(300)
  //   .deleteChars(10)
  //   .typeString('<strong> SHOW</strong> a cool typewriter effect and ')
  //   .typeString('<strong>tuning <span style="color: #27ae60;">him</span> as you wish!</strong>')
  //   .pauseFor(1000)
  //   .start();  
}

export default typeWriteTextStart;