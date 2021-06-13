const contactInfo = () => {
  let form = document.getElementById('submit-form');
  const sendContactInfo = (e)=>{
    e.preventDefault();
    let info = e.target.querySelector('.finish-input').value;  
    // console.log("sent info:", info);  
    fetch("https://submit-form.com/2SmJ5kxQ",
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({contact: info})
    })
    .then(function(res){ 
      if(res.status===200){
        finishSending();
      }    
    })
    .catch(function(res){ 
      console.log("Err",res) 
    })
    const finishSending = () => {
      e.target.querySelector('.finish-input').value='';
      e.target.querySelector('#remind-me').innerHTML='We will :)';
      // setTimeout(()=>{
      //   document.querySelector('#finish-screen').classList.remove('active');
      //   document.querySelector('#remind-me').innerHTML='Remind me';
      //   document.querySelector('#start-screen').classList.add('active');      
      // },2000)    
    }
  }
  form.addEventListener('submit', sendContactInfo);

  let shareBtn = document.getElementById('share-whatsapp');
  let cpLink = window.location.href;
  let cpLinkText = document.createElement('input');
  cpLinkText.value=cpLink;
  cpLinkText.style.opacity = "0";
  cpLinkText.style.position = "absolute";  
  shareBtn.insertAdjacentElement('beforebegin',cpLinkText);

  const shareInfo = (e)=>{
    if(document.body.clientWidth > 575){
      cpLinkText.select();
      try {
        let successful = document.execCommand('copy');
        if(successful){
          shareBtn.innerHTML='now paste the URL :)';
        }
      } catch (err) {
        console.log('Oops, unable to copy');
      }
      e.preventDefault; 
    }else{
      let whatsappText = `Check out these unpredictable immersive audio & visuals ${cpLink}`;      
      window.open(`whatsapp://send?text=${whatsappText}`);
    }      
  }
  shareBtn.addEventListener('click', shareInfo);
}

export default contactInfo;