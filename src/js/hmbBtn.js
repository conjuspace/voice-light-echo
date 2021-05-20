const hmbBtn = (() => {
  const menuBtn = document.getElementById('menu-btn');
  const navMenu = document.getElementById('nav-menu');    
  const togglemenu = () => {
    menuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
  };
  if (menuBtn) {
    menuBtn.addEventListener('click', togglemenu);
  }
})();

export default hmbBtn;
