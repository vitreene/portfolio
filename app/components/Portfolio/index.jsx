/* a faire :
- animer l'apparition du panneau ;
- mettre à jour les détails selon le sujet
- carrousel du panel;
- animation du carrousel;
- responsive;

*/

import React from 'react'
import ReactDOM from 'react-dom'
import Marked from 'marked'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

console.log('REACT LANCé');

const sujets = [
  {
    "id":"sujet001",
  "vignette": "home-huwans-vgn.jpg",
  "vignetteTitre" : "e-commerce : accueil",
  "categorie": "site",
  "type": "web",
  "marque": "huwans clubaventure"
  },
  {
    "id":"sujet002",
  "vignette": "catal-club-vgn.jpg",
  "vignetteTitre" : "treks et randonnées : catalogue",
  "categorie": "catalogue",
  "type": "print",
  "marque": "clubaventure"
  },
  {
    "id":"sujet003",
  "vignette": "avprem-vgn.jpg",
  "vignetteTitre" : "Action commerciale : ventes privées",
  "categorie": "ope-co",
  "type": "web",
  "marque": "huwans clubaventure"
  },
  {
    "id":"sujet004",
  "vignette": "recherch-vgn.jpg",
  "vignetteTitre" : "page de recherche",
  "categorie": "site",
  "type": "web",
  "marque": "huwans clubaventure"
  }
];

const details = {
  "modele":"defaut",
  "titre": "Page d'accueil",
  "intro": "### La marque \n Huwans est un tour-opérateur spécialisé dans le voyage-randonnée en groupes constitués, dans le monde entier. \n Cette approche singulière du voyage – le slow travel – nécessite d’en expliquer le concept, tout en gardant la priorité sur l’approche commerciale de la vente.",
  "files1":
      {
        "file": "home-huwans-01.jpg",
        "legende" : "page d'accueil du site",
        "action": "slide-vertical"
      },

  "files":[
    {
      "file": "home-huwans-01.jpg",
      "legende" : "page d'accueil du site",
      "action": "slide-vertical"
    },
    {
      "file": "home-huwans-03.jpg",
      "legende" : "Carrousel",
      "action": ""
    },
    {
      "file": "home-huwans-04.jpg",
      "legende" : "Carrousel",
      "action": ""
    },
    {
      "file": "home-huwans-02.jpg",
      "legende" : "détail de la recherche",
      "action": "vertical"
    },
  ],
  "texte":"### Carrousel corporate \n Déprécié, le carrousel est acceptable dans ce cas ou un seul  concept est exprimé par plusieurs images. Ici, des situations identiques de rencontres sur plusieurs continents, réunis par une même accroche. \n ### Le détail  \n Un slider propose une sélection de voyages dont il n'est montré qu’une partie. L’ombré de part et d’autre donne la sensation d’une découpe à travers laquelle défilent les offres. \n  La plus à droite est légèrement tronquée pour accentuer l’impression. Les flèches et l’ascenseur horizontal, très discrets, vient confirmer la possibilité d'un défilement. \n ### CTA \n L’action privilégiée sur cette page est d’initier une recherche. Le bloc déborde sur l’image du carrousel, le calcul du nombre d’offres disponibles se met à jour dynamiquement."
  };

var itemsInRow = 3 ;

var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.forEach(clearInterval);
  }
};

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
      data = {this.props.data}
      panel = {this.state.togglePanel}
      sujet = {this.state.sujet}
      setTogglePanel = {this.setTogglePanel}
      />
    ) ;
  }
});


var ListeSujetBox = React.createClass({

  render: function() {
    console.log('PROPS', this.props.data);
    var sujets = [] ;

    // 3 conditions pour placer le panel :
    // - cliqué sur un sujet pour l'ouvrir,
    // - sur quelle ligne se trouve le sujet cliqué,
    // - quel est le dernier sujet sur cette ligne
    // le panneau est placé juste après.
    var isOpenPanel = this.props.panel; //-> state
    var isOnRow=0 ;
    var isFinDeLigne = 0 ;

    for(var i=0; i<this.props.data.length; i++) {
      var sujet = this.props.data[i];

      if (this.props.sujet){
       isOnRow += ( sujet.id == this.props.sujet.toggle.id ) ;
      }

      isFinDeLigne = !( (i+1) % itemsInRow ) ||
         ( i === this.props.data.length -1 );

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

var PanelBox = React.createClass({
  getInitialState: function () {
    return{
    };
  },
  closePanel: function(){
    this.props.togglePanel('close') ;
  },
  rawMarkup: function(txt) {
    var rawMarkup = Marked(txt.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },
  componentDidMount: function(){
    // var element = document.body,
    var element = document.getElementById("my-scroll"),
    //  to = document.getElementById("panel").offsetTop -16,
     to =  ReactDOM.findDOMNode(this).offsetTop -16,
     duration = 300;
     //console.log("element",element);
     scrollTo(element, to, duration) ;
    // element.scrollIntoView(false);
    console.log('diff', to - element.scrollTop );
    function scrollTo(element, to, duration) {
        if (duration <= 0) return;
      //  console.log('scrollTop', element.scrollTop);
        var difference = to - element.scrollTop;
        var perTick =  Math.round ( difference / duration * 10) ;
        //console.log('duration', duration, difference);

        setTimeout(function() {
            element.scrollTop = element.scrollTop + perTick;
            if (element.scrollTop === to) return;
            scrollTo(element, to, duration - 10);
        }, 10);
    }


  },
  componentDidUpdate: function() {
  },
  render: function(){
    return (
    <ReactCSSTransitionGroup
    transitionName="example"
    transitionAppear={true}
    transitionAppearTimeout={500}
    transitionEnterTimeout={500}
    transitionLeaveTimeout={300}
    component = 'div'
      className="panel"
      id="panel"
      key={this.props.key} >
        <button
          ref="close"
          onClick={this.closePanel}
          className="panel-close" > X </button>
          <h2 className="panel-titre">{this.props.data.titre}</h2>
          <div className="panel-carrousel">

            <CarrouselPanel data={this.props.data.files} />

              <article className="panel-texte--contexte"
              dangerouslySetInnerHTML={this.rawMarkup(this.props.data.intro)} />
          </div>
          <article
          className="panel-texte-commentaire"
          dangerouslySetInnerHTML={this.rawMarkup(this.props.data.texte)} />
    </ReactCSSTransitionGroup>

    );
  }
});

var CarrouselPanel = React.createClass({

  mixins: [SetIntervalMixin], // Use the mixin
  getInitialState: function(){
    return{
      visible: 0,
      pause: false,
      timer: undefined
    };
  },

  componentDidMount: function() {
    this.setState({timer : this.setInterval(this.timer, 2000, true) }); // Call a method on the mixin
    window.addEventListener('keydown', this.keypressed);
  },
  componentWillUnmount: function() {
    window.removeEventListener('keydown', this.keypressed);
  },
  timer:function(next){
    next = (typeof(next) == 'Number' ) ? next : !this.state.pause ;
    var visible = (this.state.visible + next ) % this.props.data.length ;
    visible = (visible < 0) ? this.props.data.length -1 : visible ;
    console.log('NEXT', visible, next, !this.state.pause );
    this.setState({ visible : visible } ) ;
  },
  pause:function(){
    this.setState({ pause : true } ) ;
  },
  play:function(){
    this.setState({ pause : false } ) ;
  },

  toggle:function(){
    this.setState({ pause : !this.state.pause } ) ;
  },

  goto:function(event){
    clearInterval(this.state.timer) ;
    var key = Number( event.target.id.split('plots')[1] ) ;
    this.setState({ visible : key } ) ;
   //console.log('key', key, event.target ) ;
  },
  keypressed:function (event) {
    var charCode = {
      '37' : -1, // fleche gauche
      '39' : 1 // fleche droite
    };
    // console.log('KEY', event.keyCode, charCode[event.keyCode] );
    clearInterval(this.state.timer) ;
    this.timer(charCode[event.keyCode] || 0 ) ;
  },
  render: function(){
    var imgs = this.props.data.map( function(img, i) {
      var _id = 'cadre-img' + i ;
      var visible = ( this.state.visible == i) ? 'show' : 'hide' ;
     // console.log(img, i, visible,   this.state ) ;
     var bgImg = require('../../assets/portfolio2/' + img.file );
     var clName = "panel-carrousel--cadre-img "  + visible +' '+ img.action ;
      return (
        <div
        className = { clName }
        id = {_id}
        key = {_id}
        onMouseOver = {this.pause }
        onMouseOut = {this.play}
        onTouchStart={this.toggle}
        onClick={this.toggle}
        >
         <img
          src = { bgImg }
          alt = {img.legende}
          className = "panel-cadre-img"  />
        </div>
        )
    }, this );

    var plots =[] ;
      for(var i=0; i<this.props.data.length; i++){
        plots.push(
        (<li
         onClick = {this.goto}
         id={'plots' + i}
         key={'plots' + i}
         className={ ( this.state.visible == i) ? "plots-current" : ''} >•</li>
        ) );
    }

   // console.log('plot', this.state.visible) ;

    return (
      <div
      className= "panel-carrousel--cadre">
        <div
        className="panel-carrousel--cadre-vues">
          {imgs}
      </div>
        <ul className="panel-carrousel--cadre-plots">{plots}</ul>
      </div>
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
