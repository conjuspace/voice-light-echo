import Typewriter from 'typewriter-effect/dist/core';
const typeWriteTextFinish = () => {
  let days,hours,minutes,seconds;
  let countDownDate;

  // tests
  // let countDownText = document.createElement('div'); 
  // countDownText.id = "demo";    
  // document.querySelector('.finish-texts').insertAdjacentElement('beforebegin',countDownText);

  const setMondayDataTime = () =>{
    countDownDate = new Date();
    countDownDate.setDate(countDownDate.getDate() + ( 1 + 7 - countDownDate.getDay()) % 7);
    countDownDate.setHours(17,0,0);
    if( countDownDate <= new Date() ){      
      countDownDate.setDate(countDownDate.getDate() + 7);
    }    
    countDown();
  }
  const countDown = () => {        
    let x = setInterval(function() {      
      let now = new Date().getTime();      
      let distance = countDownDate - now;
      days = Math.floor(distance / (1000 * 60 * 60 * 24));
      if(days<0) days = 0;
      hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      if(hours<0) hours = 0;
      minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      if(minutes<0) minutes = 0;
      seconds = Math.floor((distance % (1000 * 60)) / 1000);   
      if(seconds<0) seconds = 0;   
      // countDownText.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
      let dd = document.querySelector('#t3 .days');
      if(dd) dd.innerHTML = days;
      let hh = document.querySelector('#t3 .hours');
      if(hh) hh.innerHTML = hours;
      let mm = document.querySelector('#t3 .minutes');
      if(mm) mm.innerHTML = minutes;
      let ss = document.querySelector('#t3 .seconds');
      if(ss) ss.innerHTML = seconds;
      if (distance < 0) {        
        clearInterval(x);
        // document.getElementById("demo").innerHTML = "EXPIRED";
        // countDownDate = new Date("Jun 13, 2021 05:00:00").getTime(); //todo get next Monday 05:00:00
        setMondayDataTime();
      }
    }, 1000);
  } 
  setMondayDataTime();
  
  
  let t1writer2 = new Typewriter(document.getElementById('t2'), {
    loop: false,
    delay: 75,
  });
  const endAnime2 = () => {    
    document.querySelector('#t2').querySelector('.Typewriter__cursor').remove();
    let t1writer3 = new Typewriter(document.getElementById('t3'), {
      loop: false,
      delay: 75,
    }); 
    t1writer3
    .pauseFor(1000)   
    .typeString('<span class="finish-text"><span class="days"></span> days<br><span class="hours"></span> hours<br><span class="minutes"></span> minutes<br><span class="seconds"></span> seconds</span>') 
    .start()    
    .callFunction(endAnime3);
  }
  const endAnime3 = () => {     
    document.querySelector('#t3').querySelector('.Typewriter__cursor').remove();  
    document.querySelector('.finish-input').removeAttribute("disabled");
    document.querySelectorAll('#finish-screen button').forEach(e=>{      
      e.removeAttribute("disabled"); 
      [...document.querySelectorAll('.finish-screen .logo-1,.finish-screen .copyright')].map(el=>el.classList.add('active'));     
    })    
  }
  t1writer2
    .pauseFor(1000)
    .typeString('<span class="finish-text">Listen,<br>let it emerge.<br>surrender,<br>Enjoy.</span><br><br>')
    .pauseFor(1000)
    .typeString('<span class="finish-text">Volume 2.</span>')
    .pauseFor(1000)       
    .start()    
    .callFunction(endAnime2);
}

export default typeWriteTextFinish;