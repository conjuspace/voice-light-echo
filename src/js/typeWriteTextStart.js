import Typewriter from 'typewriter-effect/dist/core';
const typeWriteTextStart = () => {
  let t1writer; 
  const endAnime = () => {
    document.querySelector('#t1').querySelector('.Typewriter__cursor').remove(); 
    document.querySelectorAll('#start-screen button').forEach(e=>{      
      e.removeAttribute("disabled");
      [...document.querySelectorAll('.start-screen .logo-1,.start-screen .copyright')].map(el=>el.classList.add('active'));
    })    
  }   
  t1writer = new Typewriter(document.getElementById('t1'), {
    loop: false,
    delay: 75,    
  });
  t1writer
    .pauseFor(1000)
    .typeString('<span class="start-text">Unpredictable, audio & visuals.<br>3 minutes, every Monday.</span><br><br>')
    .pauseFor(1000)
    .typeString('<span class="start-text">No scroll,<br>No search,<br>No algorithm.</span><br><br>')    
    .pauseFor(1000)
    .typeString('<span class="start-text">Ready?</span>')       
    .start()    
    .callFunction(endAnime);
}
export default typeWriteTextStart;