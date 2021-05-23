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
      height: playerHeight, //TOTO CALC WIDTH/HEIGHT
      width: playerWidth,   //TOTO CALC WIDTH/HEIGHT    
      background: 1,  
      // responsive: true,
      autoplay: true,
      muted: true,
      loop: false,
      speed: true
    }
  }
  const endVideoPlay = () => {
    players[indVideo].off('ended', endVideoPlay);
    players[indVideo].destroy();
    console.log("END PLAY the video >>",urls[indVideo]);
    console.log("indVideo:",indVideo);
    if(indVideo < urls.length-1){
      indVideo++;
      console.log("indVideo after ++:",indVideo);    
      playVideo(indVideo)
    }else{
      endPlayVideos();
    }
  }
  const playVideo = (ind) => { 
    console.log("play video>>>", ind);   
    players[ind] = new Vimeo(document.getElementById('vimeoPlayer'), createOptions(urls[ind]));     
    // players[ind].on('play', ()=>{
    //   console.log(`Played the video >> ${urls[ind]}`);
    // }); 
    players[ind].on('ended', endVideoPlay);
  }
  const startPlayVideos = () => {
    document.querySelector('#start-screen').remove();
    document.createElement('div');
    let vimaoPlayerContainer = document.createElement('div');
    vimaoPlayerContainer.classList.add('vimeoPlayer');
    vimaoPlayerContainer.setAttribute("id", "vimeoPlayer");    
    document.querySelector('.main').appendChild(vimaoPlayerContainer);
    // let vimaoPlayerContainer = document.getElementById('vimeoPlayer');
    // TODO
    playerWidth = vimaoPlayerContainer.clientWidth;
    playerHeight = vimaoPlayerContainer.clientHeight;  
    console.log("playerWidth:",playerWidth);
    console.log("playerHeight:",playerHeight);
    window.addEventListener('resize', () => {
      playerWidth = vimaoPlayerContainer.clientWidth;
      playerHeight = vimaoPlayerContainer.clientHeight;      
      changeSizeIframe(playerWidth,playerHeight);
      console.log("playerWidth:",playerWidth);
      console.log("playerHeight:",playerHeight);
    });

    playVideo(indVideo);
    console.log("Start all videos");
  }
  const endPlayVideos = () => {
    document.getElementById('vimeoPlayer').remove();
    indVideo = 0;
    console.log("End all videos");
    document.getElementById('finish-screen').classList.add('active');
  }
  const startButton = document.getElementById('start-video');
  startButton.addEventListener('click',startPlayVideos);
};

export default videoVimeo;