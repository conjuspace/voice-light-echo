import Typewriter from 'typewriter-effect/dist/core';
const typeWriteTextStart = () => {
  let t1writer; 
  const endAnime = () => {
    document.querySelectorAll('#start-screen button').forEach(e=>{      
      e.removeAttribute("disabled"); 
    })    
  }   
  t1writer = new Typewriter(document.getElementById('t1'), {
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
    .start()    
    .callFunction(endAnime);
}
export default typeWriteTextStart;