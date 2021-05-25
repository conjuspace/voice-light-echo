let form = document.getElementById('submit-form');
const sendContactInfo = (e)=>{
  e.preventDefault();
  let info = e.target.querySelector('.finish-input').value;  
  console.log("sent info:", info);  
  fetch("https://submit-form.com/cy0Nqgwz",
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
    setTimeout(()=>{
      document.querySelector('#finish-screen').classList.remove('active');
      document.querySelector('#remind-me').innerHTML='Remind me';
      document.querySelector('#start-screen').classList.add('active');      
    },2000)    
  }
}
form.addEventListener('submit', sendContactInfo);