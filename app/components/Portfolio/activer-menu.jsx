
/// MENU


 const ActiverMenu  = (function () {
  //console.log('dans React activerMenu' );
  var menuIsClose = false ;
  var nav = document.getElementById('menu');
  var menu = document.getElementById('menu-logo');
  var scroll = document.getElementById("my-scroll") ;
  if(menu){
    var menuLinks = document.getElementById('menu-links');
    var menuItemAccueil = document.getElementById('menu-accueil');
    menu.addEventListener('click', menuOpen );
    scroll.addEventListener('scroll', scrollAtTop , false);
    //console.log('ActiverMenu : init ');
    //console.log('SCROLL', scroll);
  }

  function menuOpen(evt) {
    //console.log('open :', menu);
    if(menu){
      if(evt) evt.preventDefault() ;
      //menu.classList.remove('has-panel');
      menu.classList.remove('menu-logo-hover') ;
      menu.classList.add('menu-open') ;
      nav.classList.remove('short') ;


      if  (menuLinks.classList.contains('invisible')){
        menu.removeEventListener('click', menuOpen );
        expandMenuIcon('activeMenu') ;
        // classes
        menuLinks.classList.remove('invisible') ;
        menuItemAccueil.classList.add('accueil') ;
        menuIsClose = false ;
      }
    }
  }


  function scrollAtTop(evt) {
    //console.log('scroll', evt);
    //console.log('scroll', scroll.scrollTop);
    if (scroll.scrollTop <30){
      if (menuIsClose) menuOpen(evt);
    } else{
      if (!menuIsClose) menuClose();
    }
  }


  function menuClose() {
    //  console.log('On ferme : ' , menu);
    if(menu){

      if  (!menuLinks.classList.contains('invisible')){
        var timeoutID = window.setTimeout(function () {
          menu.addEventListener('click', menuOpen );
          // classes
          menuLinks.classList.add('invisible') ;
          menu.classList.remove('menu-open');
          menu.classList.add('menu-logo-hover');
          menuItemAccueil.classList.remove('accueil') ;
          nav.classList.add('short') ;
          //console.log('Menu fermé');
        }, 500) ;
        menuIsClose = true ;
      }
    }
  }
//  console.log('activerMenu.menuClose', activerMenu.menuClose());
  function hasPanelToggle() {
    // ne pas poursuivre si le menu est ouvert
    //if (menu.classList.contains('menu-open') ) return ;
    //  console.log('toggle :', menu);
    if(menu && menuLinks.classList.contains('invisible') ){
      if ( menu.classList.contains('has-panel') )
      { expandMenuIcon('toggle') ; }
      else
      { minimizeMenuIcon('toggle') ; }
    }
  }

  function minimizeMenuIcon(info) {
    //console.log('minimizeMenuIcon', info);
    menu.classList.add('has-panel');
  }
  function expandMenuIcon(info) {
    //console.log("expandMenuIcon", info );
    menu.classList.remove('has-panel');
  }

return {
  menuOpen  : menuOpen,
  menuClose : menuClose,
  hasPanelToggle : hasPanelToggle,
  minimizeMenuIcon : minimizeMenuIcon,
  expandMenuIcon : expandMenuIcon
};
})() ;

export default ActiverMenu
