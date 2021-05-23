import Vimeo from '@vimeo/player'
const videoVimeo = async () => {  
  const collectionId = '8487711';
  const token = 'bea56d634c470a012f74981880877eed';
  const clientIdentifier = '22ffed12611207f1629fe3f17ca066440d01e246';
  let videos=[],urls=[];
  let indVideo = 0;
  let players = [];
  let playerWidth = document.querySelector('.main').clientWidth;
  let playerHeight = document.querySelector('.main').clientHeight; 
  let iframePlayerWidth  = playerWidth;
  let iframePlayerHeight = playerHeight; 

  const changeSizeIframe = (w,h) => {
    document.querySelector('#vimeoPlayer iframe').width=w;
    document.querySelector('#vimeoPlayer iframe').height=h;
  }  
  const getVimeoData = async ()=>{
    //per_page=30&page:1
    const response = await fetch(`https://api.vimeo.com//albums/${collectionId}/videos?per_page=30&page:1`,{
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin      
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, *same-origin, omit    
      headers: new Headers({
        'Authorization': `Bearer ${token}`,      
        'Content-Type': 'application/json',      
        'Accept': 'application/vnd.vimeo.*+json;version=3.4', 
      })
    })
    return response.json();    
  }
  const getVimeoVideos = async ()=>{
    const json = await getVimeoData();    
    return json.data;
  }  
  videos = await getVimeoVideos();
  urls = videos.map(el=>el.link);
  console.log("videos:",videos);
  console.log("urls:",urls);
  console.log("uri:",videos.map(el=>el.uri));
  const createOptions = (url) => {    
    return {
      url: url,
      // id: 507026918, 
      height: iframePlayerHeight, //TOTO CALC WIDTH/HEIGHT
      width: iframePlayerWidth,   //TOTO CALC WIDTH/HEIGHT    
      background: 1,  
      // responsive: true,
      autoplay: true,
      muted: true,
      loop: false,
      speed: true
    }
  }
  const endVideoPlay = () => {
    if(players[indVideo]){   
      players[indVideo].off('ended', endVideoPlay);
      players[indVideo].destroy();
    }    
    if(indVideo < urls.length-1){
      indVideo++;  
      playVideo(indVideo)
    }else{
      endPlayVideos();
    }
  }
  const playVideo = (ind) => { 
    recalcSize();
    players[ind] = new Vimeo(document.getElementById('vimeoPlayer'), createOptions(urls[ind])); 
    players[ind].on('ended', endVideoPlay);
  }  
  const startPlayVideos = () => {    
    document.querySelector('#start-screen').remove();
    if(urls.length){
      document.createElement('div');
      let vimaoPlayerContainer = document.createElement('div');
      vimaoPlayerContainer.classList.add('vimeoPlayer');
      vimaoPlayerContainer.setAttribute("id", "vimeoPlayer");    
      document.querySelector('.main').appendChild(vimaoPlayerContainer);      
      window.addEventListener('resize', debounce(resizeResolver,50));
      // document.getElementById('next-video').addEventListener('click', endVideoPlay);
      playVideo(indVideo);      
    }else{
      showFinishScreen();
    }
  }
  const resizeResolver = () => {
    playerWidth = document.querySelector('.main').clientWidth;
    playerHeight = document.querySelector('.main').clientHeight;
    recalcSize(true);
  }
  const endPlayVideos = () => {
    document.getElementById('vimeoPlayer').remove();
    indVideo = 0;
    showFinishScreen();
  }
  const showFinishScreen = () => {
    document.getElementById('finish-screen').classList.add('active');
  }
  const startButton = document.getElementById('start-video');
  startButton.addEventListener('click',startPlayVideos);
  const recalcSize = (resizeFrameFlag) => {     
    // document.getElementById('videoW').innerHTML = videos[indVideo].width;
    // document.getElementById('videoH').innerHTML = videos[indVideo].height;
    // document.getElementById('playerW').innerHTML = playerWidth;
    // document.getElementById('playerH').innerHTML = playerHeight;
    // document.getElementById('videoAspWH').innerHTML = videos[indVideo].width/videos[indVideo].height;
    // document.getElementById('playerAspWH').innerHTML = playerWidth/playerHeight;
    let kV = videos[indVideo].width / videos[indVideo].height;
    let kP = playerWidth / playerHeight;
    if(kV > kP){
      iframePlayerWidth = playerWidth * kV / kP; 
      iframePlayerHeight = playerHeight;
      if(resizeFrameFlag){
        changeSizeIframe(iframePlayerWidth,playerHeight);
      }
    }
    if(kV === kP){      
      if(resizeFrameFlag){
        changeSizeIframe(playerWidth,playerHeight);
      }
    }
    if(kV < kP){       
      iframePlayerWidth = playerWidth;
      iframePlayerHeight = playerHeight * kP / kV;           
      if(resizeFrameFlag){
        changeSizeIframe(playerWidth,iframePlayerHeight);
      }
    }       
  }
  function debounce(f, ms) {
    let isCooldown = false;  
    return function() {
      if (isCooldown) return;  
      f.apply(this, arguments);  
      isCooldown = true;  
      setTimeout(() => isCooldown = false, ms);
    };  
  }  
};

export default videoVimeo;