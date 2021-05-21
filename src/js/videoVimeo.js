import Vimeo from '@vimeo/player'
const videoVimeo = (() => {  
  document.addEventListener('DOMContentLoaded', () => {
    console.log("videovimeo start");
    // let screenWidth = document.getElementById('vimeoPlayer').clientWidth;
    // let screenHeight = document.getElementById('vimeoPlayer').clientHeight;
    // let options = {
    //   url: 'https://vimeo.com/507026918',
    //   // id: 507026918, 
    //   height: screenHeight,
    //   width: screenWidth,      
    //   background: 1,  
    //   // responsive: true,
    //   loop: false,    
    // }    
    // let player = new Vimeo('vimeoPlayer', options);
    // window.addEventListener('resize', () => {
    //   screenWidth = document.getElementById('vimeoPlayer').clientWidth;
    //   screenHeight = document.getElementById('vimeoPlayer').clientHeight;      
    //   document.getElementsByTagName('iframe')[0].width=screenWidth;
    //   document.getElementsByTagName('iframe')[0].height=screenHeight;
    // });

    let options1 = {
      url: 'https://vimeo.com/507026918',
      // id: 507026918, 
      height: 640,
      width: 480,      
      background: 1,  
      // responsive: true,
      loop: false,    
    }
    let player1 = new Vimeo('vimeoPlayer1', options1);

    let options2 = {
      url: 'https://vimeo.com/171118412',
      // id: 507026918, 
      height: 640,
      width: 480,      
      background: 1,  
      // responsive: true,
      loop: false,    
    }
    let player2 = new Vimeo('vimeoPlayer2', options2);
  })
  
})();

export default videoVimeo;