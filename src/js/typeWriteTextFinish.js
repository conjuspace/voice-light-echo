import Typewriter from 'typewriter-effect/dist/core';
const typeWriteTextFinish = () => {  
  const endAnime = () => {
    document.querySelector('.finish-input').removeAttribute("disabled");
    document.querySelectorAll('#finish-screen button').forEach(e=>{      
      e.removeAttribute("disabled");      
    })
  } 
  let t1writer = new Typewriter(document.getElementById('t2'), {
    loop: false,
    delay: 75,
  });

  t1writer
    .pauseFor(1000)
    .typeString('<span class="finish-text">Listen,<br>surrender,<br>follow.<br>Let it emerge.<br>Enjoy.</span><br><br>')
    .pauseFor(1000)
    .typeString('<span class="finish-text">Volume 2.</span><br>')
    .pauseFor(1000)
    .typeString('<span class="finish-text">4 days<br>6 hours<br>23 minutes<br>43 seconds</span><br><br>') 
    .start()    
    .callFunction(endAnime);
}

export default typeWriteTextFinish;