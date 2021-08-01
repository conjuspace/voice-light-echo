import Vimeo from '@vimeo/player'
import typeWriteTextFinish from './typeWriteTextFinish';
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
  let descriptionsVideos = [];
  let descriptionsVideosTimes = [];
  let fadeDuration = 0.2;
  let soundFadeDuration = 0.2;
  let iphoneFlag=false;
  if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
    if (document.cookie.indexOf("iphone_redirect=false") == -1) iphoneFlag=true;
  }

  const changeSizeIframe = (w,h) => {
    document.querySelector('#vimeoPlayer iframe').width=w;
    document.querySelector('#vimeoPlayer iframe').height=h;
  }  
  const getVimeoData = async ()=>{
    //per_page=30&page:1
    const response = await fetch(`https://api.vimeo.com/albums/${collectionId}/videos?per_page=30&page:1`,{
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
  const getDescriptionsData = async ()=>{
    //per_page=30&page:1
    const response = await fetch(`https://api.vimeo.com/albums/${collectionId}`,{
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
  const getDescriptionsVideos = async ()=>{
    const json = await getDescriptionsData();    
    return json.description;
  }
  videos = await getVimeoVideos();
  urls = videos.map(el=>el.link);
  // console.log("videos:",videos);
  // console.log("urls:",urls);
  // console.log("uri:",videos.map(el=>el.uri));
  let descriptionsVideosStr = await getDescriptionsVideos();
  descriptionsVideos = descriptionsVideosStr.split('\n');
  // console.log("descriptionsVideos:",descriptionsVideos);
  descriptionsVideosTimes = descriptionsVideos.map(
    el=>el.split('&').reduce((acc,cur,ind)=>{
      let el;
      switch (ind) {
        case 0:
          el= {'url': cur}
          break;
        case 1:
          el= {'start': false}
          let timestr = cur.slice(5);
          if(timestr.split(':').length === 2){
            let [min,sec] = timestr.split(':');
            // el= {'start': `${min}m${sec}s`}
            el= {'start': (+min * 60) + +sec}
          }else if(timestr.split(':').length === 3){
            let [hours,min,sec] = timestr.split(':');
            // el= {'start': `${hours}h${min}m${sec}s`}
            el= {'start': (+hours * 3600) + (+min * 60) + +sec}
          }else if(timestr.split(':').length === 1){
            let [sec] = timestr.split(':');
            // el= {'start': `${sec}s`}
            el= {'start': +sec}
          }           
          break;
        case 2:
          // el= {'end': cur.slice(3)}
          el= {'end': false}
          let timestrEnd = cur.slice(3);
          if(timestrEnd.split(':').length === 2){
            let [min,sec] = timestrEnd.split(':');
            // el= {'end': `${min}m${sec}s`}
            el= {'end': (+min * 60) + +sec}
          }else if(timestrEnd.split(':').length === 3){
            let [hours,min,sec] = timestrEnd.split(':');
            // el= {'end': `${hours}h${min}m${sec}s`}
            el= {'end': (+hours * 3600) + (+min * 60) + +sec}
          }else if(timestrEnd.split(':').length === 1){
            let [sec] = timestrEnd.split(':');
            // el= {'end': `${sec}s`}
            el= {'end': +sec}
          }
          break;
      }      
        return {
          ...acc,
          ...el,
        }
    },{})
  );
  // console.log("descriptionsVideosTimes:",descriptionsVideosTimes);
  const createOptions = (url) => {     
    return {
      url: url,
      // id: 507026918, 
      height: iframePlayerHeight, //TOTO CALC WIDTH/HEIGHT
      width: iframePlayerWidth,   //TOTO CALC WIDTH/HEIGHT    
      background: 0,     
      controls: iphoneFlag,
      // responsive: true,
      autoplay: true,
      muted: iphoneFlag,      
      loop: false,      
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
  const onTimeupdateControll = (data, endtime) => {    
    if(data.seconds >= endtime){
      endVideoPlay();
    }
  }
  const addFadeFog = (timeoutFlag) => {
    let oldFog = document.getElementById('fadeFog');    
    if (oldFog) {
      oldFog.remove();
    }    
    let fadeFog = document.createElement('div');
    fadeFog.setAttribute("id", "fadeFog");
    if(timeoutFlag){      
      fadeFog.classList.add('fadeFog');    
      document.querySelector('.js-main').appendChild(fadeFog);
      setTimeout(()=>document.getElementById('fadeFog').classList.add('active'),0);      
    }else{
      fadeFog.classList.add('fadeFog','active');    
      document.querySelector('.js-main').appendChild(fadeFog);      
    }    
  }
  const hideFadeFog = () => { 
    let fog = document.querySelector('#fadeFog');
    if(fog){
      fog.classList.remove('active');
      setTimeout(()=>document.getElementById('fadeFog').remove(),soundFadeDuration * 1000);   
    }
  }
  const changeVolume = (player,start,end,step,duration) => {
    let valueVolume = start;
    let intervalT = (duration * 1000) / 4;
    let min = Math.min(start,end);
    let max = Math.max(start,end);
    let fadeVolumeInterval = setInterval(() => { 
      valueVolume = valueVolume + step;      
      if (valueVolume>1) valueVolume=1;
      if (valueVolume<0) valueVolume=0;      
      if(player){     
        player.setVolume(valueVolume.toFixed(1));      
      }
      if( valueVolume.toFixed(1) >= max || valueVolume.toFixed(1) <= min ) clearInterval(fadeVolumeInterval);
    }, intervalT);       
  }
  const playVideo = (ind) => { 
    recalcSize();
    players[ind] = new Vimeo(document.getElementById('vimeoPlayer'), createOptions(`${urls[ind]}`)); 
    let descriptions = descriptionsVideosTimes.find(el=>el.url===urls[ind]);  
    let timeToEndFade, timeToEndSoundFade, timeToEndFadeFlag = false, timeToEndSoundFadeFlag = false, fadeEffectFlag = false;
    
    if(descriptions){      
      players[ind].setCurrentTime(descriptions.start);
      players[ind].on('timeupdate', e=>onTimeupdateControll(e,descriptions.end));         
    }else{
      console.log("without timing especially for video with wrong url");      
    }    
    // players[ind].on('bufferend', function(){
    //   // this event not stalill fired!!!      
    //   hideFadeFog();
    //   changeVolume(players[ind],0.2,1,0.2,soundFadeDuration);
    //   fadeEffectFlag = true;
    // } );

    
    players[ind].on('play', function(data){      
      if(!iphoneFlag){
        this.setVolume(0.2);    
        if(descriptions){      
          timeToEndFade = descriptions.end - fadeDuration;
          timeToEndSoundFade = descriptions.end - soundFadeDuration - 0.2; //correction
        }else{
          timeToEndFade = data.duration - fadeDuration;
          timeToEndSoundFade = data.duration - soundFadeDuration - 0.2; //correction
        } 
      }
    }); 
    players[ind].on('timeupdate', function(data){ 
      console.log("timeupdate data:",data);
      if(!fadeEffectFlag){        
        hideFadeFog();
        if(!iphoneFlag){
          changeVolume(this,0.2,1,0.2,soundFadeDuration);
        }
        fadeEffectFlag = true;
      }      
      if(!timeToEndFadeFlag && (data.seconds > timeToEndFade) ){        
        addFadeFog('with fade');        
        timeToEndFadeFlag = true;
      }   
      if(!timeToEndSoundFadeFlag && (data.seconds > timeToEndSoundFade) ){
        changeVolume(this,1,0.2,-0.2,soundFadeDuration);
        // if(!iphoneFlag){
        //   changeVolume(this,1,0.2,-0.2,soundFadeDuration);
        // }
        timeToEndSoundFadeFlag = true;
      }    
    });
    
    
    players[ind].on('ended', endVideoPlay);
  }  
  const startPlayVideos = () => { 
    addFadeFog();
    document.querySelector('#start-screen').classList.remove('active');
    if(urls.length){
      document.createElement('div');
      let vimaoPlayerContainer = document.createElement('div');
      vimaoPlayerContainer.classList.add('vimeoPlayer');
      vimaoPlayerContainer.setAttribute("id", "vimeoPlayer");    
      document.querySelector('.main').appendChild(vimaoPlayerContainer);      
      window.addEventListener('resize', debounce(resizeResolver,50));
      playVideo(indVideo);      
    }else{
      showFinishScreen();
    }
  }
  const resizeResolver = () => {
    if(document.querySelector('#vimeoPlayer iframe')){
      playerWidth = document.querySelector('.main').clientWidth;
      playerHeight = document.querySelector('.main').clientHeight;
      recalcSize(true);
    }
  }
  const endPlayVideos = () => {
    hideFadeFog();
    document.getElementById('vimeoPlayer').remove();
    indVideo = 0;
    showFinishScreen();
  }
  const testing = () => {
    document.querySelector('#start-screen').classList.remove('active');
    showFinishScreen();
  }
  const showFinishScreen = () => {
    document.getElementById('finish-screen').classList.add('active');
    typeWriteTextFinish();
  }
  const startButton = document.getElementById('start-video');
  startButton.addEventListener('click',startPlayVideos);
  // startButton.addEventListener('click',testing);
  const recalcSize = (resizeFrameFlag) => {
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