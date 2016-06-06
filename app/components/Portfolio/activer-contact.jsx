// FORMULAIRE DE CONTACT
import ActiverMenu from './activer-menu'

const ActiverContact = function () {
  console.log('ActiverContact');
  // ajouter close et modal
  var modal = document.getElementById('contact-modal');
  modal.classList.add('close','modal');

  // ajouter les comportements aux boutons contact
  var contacts = document.querySelectorAll('.item-contact') ;
  //console.log('contacts',contacts);
  for( var i=0 ; i< contacts.length ; i++){
    // console.log('contacts',contacts[i]);
    contacts[i].addEventListener('click', setContactOpen);
  }
  // activer le bouton close
  setContactClose();

  function setContactOpen() {
    ActiverMenu.menuClose () ;
    modal.classList.remove('close');
  }

  function setContactClose() {
    var close = document.getElementById('contact-close');
    //console.log("close", close);

    if(close){
      close.addEventListener('mousedown', contactClose );
    }
  }
  function contactClose() {
    //console.log("-> close");
    modal.classList.add('close');
  }

}

export default ActiverContact ;
