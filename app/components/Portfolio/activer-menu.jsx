
/// MENU
 const ActiverMenu  = (function () {
  console.log('dans React activerMenu' );
  var nav = document.getElementById('zone-menu');
  var menu = document.getElementById('menu-logo');

  if(menu){
    var menuLinks = document.getElementById('menu-links');
    var menuItemAccueil = document.getElementById('menu-accueil');
    menu.addEventListener('click', menuOpen );
    window.addEventListener("scroll" , scrollAtTop ); //menuClose );

  //  if (nav.classList.contains('init-close')) menuClose();
  }

  function menuOpen(evt) {
    console.log('open bar');
    if(menu){
      if(evt) evt.preventDefault() ;
      if  (menuLinks.classList.contains('invisible')){
        menu.removeEventListener('click', menuOpen );
        // classes
        menuLinks.classList.remove('invisible') ;
        menu.classList.remove('menu-logo-hover') ;
        menu.classList.add('menu-open') ;
        menuItemAccueil.classList.add('accueil') ;
      }
    }
  }

  function scrollAtTop(evt) {
    if (window.pageYOffset <30){
      menuOpen(evt);
    } else{
      menuClose();
    }
    // console.log(window.pageYOffset);
  }

  function menuClose() {
    console.log('On ferme.');
    if(menu){
      if  (!menuLinks.classList.contains('invisible')){
        var timeoutID = window.setTimeout(function () {
          menu.addEventListener('click', menuOpen );
          // classes
          menuLinks.classList.add('invisible') ;
          menu.classList.remove('menu-open');
          menu.classList.add('menu-logo-hover');
          menuItemAccueil.classList.remove('accueil') ;
          console.log('Menu fermé');
        }, 500) ;
      }
    }
  }
//  console.log('activerMenu.menuClose', activerMenu.menuClose());

return {
  menuOpen: menuOpen,
  menuClose:  menuClose
};
})() ;

export default ActiverMenu
