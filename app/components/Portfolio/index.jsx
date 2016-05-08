/* a faire :
- animer l'apparition du panneau ;
- mettre à jour les détails selon le sujet
- carrousel du panel;
- animation du carrousel;
- responsive;

*/



import React from 'react'
//import ReactDOM from 'react-dom'
// import Marked from 'marked'
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
//import ReactCSSTransitionReplace from 'react-css-transition-replace';

import PanelBox from './panel-box'

console.log('REACT LANCé');

var itemsInRow = 3 ;



var ControlListeSujetBox = React.createClass({
  getInitialState: function() {
    return {
      togglePanel: false,
      sujet: null
    };
  },

  setTogglePanel: function(etat, event) {
    console.log('DETECT', etat) ;
    console.log('event', event) ;

    var panel = {
      'close'  : false,
   //    mettre à jour ou fermer le panel
      'toggle' : (event == this.state.sujet) ? !this.state.togglePanel : true
    };
    console.log('panel[etat]', panel[etat]) ;

    var isSujet = (etat==='toggle' ? event : null ) ;
    var isId =  (isSujet) ? isSujet.toggle.id  : null ;

    this.setState({togglePanel: panel[etat] }) ;
    this.setState({sujet: isSujet }) ;
  },

  render: function() {

    return (
      <ListeSujetBox
      data = {this.props}
      panel = {this.state.togglePanel}
      sujet = {this.state.sujet}
      setTogglePanel = {this.setTogglePanel}
      />
    ) ;
  }
});


var ListeSujetBox = React.createClass({

  render: function() {
    //console.log('PROPS:sujets', this.props.data.sujets);
    //console.log('PROPS:details', this.props.data.details);
    console.log('PROPS', this.props);
    console.log('this.props.sujet', (this.props.sujet) );
    var sujets = [] ;

    // 3 conditions pour placer le panel :
    // - cliqué sur un sujet pour l'ouvrir,
    // - sur quelle ligne se trouve le sujet cliqué,
    // - quel est le dernier sujet sur cette ligne
    // le panneau est placé juste après.
    var isOpenPanel = this.props.panel; //-> state
    var isOnRow=0 ;
    var isFinDeLigne = 0 ;
    var details =(this.props.sujet) ?
        getDetail(this.props.sujet.toggle.id, this.props.data.details)[0] :
        null;
        console.log("DETAILS",details);

    for(var i=0; i<this.props.data.sujets.length; i++) {
      var sujet = this.props.data.sujets[i];

      if (this.props.sujet){
       isOnRow += ( sujet.id == this.props.sujet.toggle.id ) ;
      }

      isFinDeLigne = !( (i+1) % itemsInRow ) ||
         ( i === this.props.data.sujets.length -1 );

      sujets.push (
       <SujetBox
       data={sujet}
       key={sujet.id}
       isFinDeLigne={isFinDeLigne}
       togglePanel={this.props.setTogglePanel}
       /> )  ;

        // détails sera this.props.detail
      if (isOnRow && isFinDeLigne && isOpenPanel) {
        sujets.push (
          <PanelBox
          data={details}
          key={'panel' + sujet.id}
          togglePanel={this.props.setTogglePanel}
          /> ) ;
        isOnRow = 0 ; // eviter les doublons
      } ;

   }
   function getDetail(id, details) {
     return details.filter( function(detail){
       return (id===detail.id) ;
     });
   }
    return (
      <ul id="sujets" className="sujets">
       {sujets}
      </ul>
     );
  }
});

var SujetBox = React.createClass({
  togglePanel: function(){
    this.props.togglePanel('toggle', this.refs) ;
  },

  render: function() {
    var lastInRow = 'sujet' + (this.props.isFinDeLigne ? ' last' : '' ) ;
    var bgImg = require('../../assets/portfolio2/' + this.props.data.vignette);
    // style = {{backgroundImage:'url( ../../assets/portfolio2/' + this.props.data.vignette + ')' }}

    return (
    <li
      ref="toggle"
      onClick = {this.togglePanel}
      className = {lastInRow}
      id = {this.props.data.id}
      style = {{backgroundImage:'url(' + bgImg + ')' }}
    >
       <div className="legende-wrapper">
         <span className="legende">{this.props.data.vignetteTitre}</span>
       </div>
    </li>
    );
  }
});






export default ControlListeSujetBox ;
/*
ReactDOM.render(
  <ControlListeSujetBox data={sujets}/>,
  document.getElementById('box')
);
*/
/*
ReactDOM.render(
  <ListeSujetBox data={sujets}/>,
  document.getElementById('box')
);
*/
