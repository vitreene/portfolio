import React from 'react'
// import ReactCSSTransitionReplace from 'react-css-transition-replace'
import SetIntervalMixin from './set-interval-mixin'

// cadrer les images ! -> peut fabriquer un panel trop long !

var CarrouselPanel = React.createClass({

  mixins: [SetIntervalMixin], // Use the mixin

  getInitialState: function(){
    return{
      // id : this.props.id,
      vue    : 0,
      active : false,
      pause  : false,
      timer  : undefined
    };
  },

  // numéros d'image active et précédente
  enter : 0,
  leave : null,
  images : [],

  componentDidMount: function() {
    const durees = {
      defaut : 2000,
      lightbox : 3500
    };
    const duree = durees[this.props.modele] ;
    // initialiser le timer
    this.setState({timer : this.setInterval(this.timer, duree, true) }); // Call a method on the mixin
    window.addEventListener('keydown', this.keypressed);
    // preload des images du carrousel

    this.updateImgs(this.props.files) ;
  },

  componentWillUnmount: function() {
    window.removeEventListener('keydown', this.keypressed);
  },
/*
  this.enter = 0 ;
  this.leave = null ;
  this.images = [] ;
  */
  componentWillReceiveProps: function (nextProps) {
    console.log('ID', this.props.id, nextProps.id);
   //if (nextProps.id !== this.props.id) this.updateImgs(nextProps.files) ;
  },

  componentWillUpdate: function(next) {
    // mise à jour des numéros d'images
    // console.log('vue', this.state.vue,'next vue', next.vue);
    if (this.state.vue !== next.vue) {
      this.leave = this.state.vue ;
      this.enter = next.vue ;
    }

  },

  componentDidUpdate: function() {
    // après la mise à jour, ajouter la transition css
    if (false === this.state.active) {
      /*
      requestAnimationFrame( function () {
        this.setState( {active : true} ) ;
        }.bind(this) )
        */
      // simplification pour etablir un délai de transition
      setTimeout( function () {
        this.setState( {active : true} ) ;
      }.bind(this),50 ) ;
    }
  },

  preload : function (imageArray, index) {
    index = index || 0;
    //console.log('INDEX images', index, this.images[index] );
    var that = this ;
    if (imageArray && imageArray.length > index) {
        var img = new Image ();
        img.onload = function() {
            that.preload(imageArray, index + 1);
        };
        img.src = this.images[index];
      };
  },

  updateImgs: function (files) {
    // let files = this.props.files ;
    console.log('update imgs', files);
    this.images = files.map( function(img) {
    //  console.log('IMAGES ', img.files[0].file);
     //img.src = require('../../assets/portfolio2/' + img.file);
     return require('../../assets/portfolio2/' + img.file);
    });
    this.preload(this.images);
  },

  timer:function(next){
    //console.log('next', next);
    if (!next) return ;
    // if (typeof(next) !== 'Number' )  next = !this.state.pause ;
    let visible = (this.state.vue + next) % this.props.data.length ;
    visible = (visible < 0) ? this.props.data.length -1 : visible ;
    //console.log('NEXT', next, 'VISIBLE', visible);
    this.setState({vue : visible});
    this.setState({active : false}) ;
  },

  pause:function(){
    this.setState({ pause : true } ) ;
    //console.log('PAUSE', this.state.pause);
  },

  play:function(){
    this.setState({ pause : false } ) ;
    //console.log('PAUSE', this.state.pause);
  },

  toggle:function(){
    this.setState({ pause : !this.state.pause } ) ;
  },

  goto:function(event){
    clearInterval(this.state.timer) ;
    var key = Number( event.target.id.split('plots')[1] ) ;
        this.setState({ vue : key});
    // console.log('key', key, event.target ) ;
  },

  keypressed:function (event) {
    var charCode = {
      '37' : -1, // fleche gauche
      '39' : 1 // fleche droite
    };
    console.log('KEY', event.keyCode, charCode[event.keyCode] );
    clearInterval(this.state.timer) ;
    this.timer(charCode[event.keyCode] || 0 ) ;
  },

  render: function(){
    const imgsIndex = [
      this.leave,
      this.enter
    ];
    return (
      <div className= "panel-carrousel--cadre">
        <Imgs
          images = {this.images}
          imgsIndex   = {imgsIndex}
          files   = {this.props.files}
          active = {this.state.active}
          start  = {this.toggle}
          enter  = {this.pause}
          leave  = {this.play}
        />
        <Plots
          goto    = {this.goto}
          enter   = {this.pause}
          leave   = {this.play}
          length  = {this.props.files.length}
          current = {this.state.vue}
          />
      </div>
    );
  }
});


var Imgs = React.createClass({
  // pour le fondu enchainé, deux images : enter et leave
  creerIMG: function(el, i){
    // au départ leave n'est pas défini
    if (el===null) return ;

    const img = this.props.files[el] ;
    //var bgImg = require('../../assets/portfolio2/' + img.file ) ;
    const bgImg = this.props.images[el] ;

    console.log('img', el, img, bgImg);
    // le premier élément i=0 est leave
    const visible = (i) ? '-enter' : '-leave' ;
    const effect = ' cross-fade' ;
    const active = (this.props.active) ?
        effect + visible + '-active' :
        '' ;
    const imgClass = 'panel-carrousel--cadre-img ' +
      (img.action || '') +
      effect + visible + active ;
  //  const legendeClass = 'panel-carrousel--cadre-legende ' + visible ;
  const legende = this.legende(i, img.legende) ;
  //  console.log('CLASS', clName);
  return (
    <div key  = {img.file} >
      <Img
        imgClass = {imgClass}
        src    = {bgImg}
        alt    = {img.legende}
        start  = {this.props.start}
        enter  = {this.props.enter}
        leave  = {this.props.leave}
        />
      {legende}
    </div>
  );
},
legende: function (i, legende) {
  if (i) return (
    <div className = 'panel-carrousel--cadre-legende '>
      {legende}
    </div>
  )
},
  render: function(){
   // couple précedent, actuel; filtrer si precedent = null
   const imgsIndex = this.props.imgsIndex
   .map( this.creerIMG )
   .filter(function(el){
     return el ;
   }) ;
   return(
     <div className="panel-carrousel--cadre-vues">
       {imgsIndex}
     </div>
   );
  }
});

function Img(props){
  return (
     <div
       className = { props.imgClass }
       key = {props.key}
       onClick={props.start}
       onTouchStart={props.start}
     >
      <img
       onMouseEnter={props.enter}
       onMouseLeave={props.leave}
       src = {props.src}
       alt = {props.alt}
       className = "panel-cadre-img"
      />
     </div>
   );
  };
/*
var Img = React.createClass({
  render: function(){
    return (
     <div
       className = { this.props.imgClass }
       key = {this.props.key}
       onClick={this.props.start}
       onTouchStart={this.props.start}
     >
      <img
       onMouseEnter={this.props.enter}
       onMouseLeave={this.props.leave}
       src = {this.props.src}
       alt = {this.props.alt}
       className = "panel-cadre-img"
      />
     </div>
   );
  }
});
*/
function Plots(props) {
    var plots =[] ;
    for(var i=0; i<props.length; i++){
      plots.push(
        <li
         onClick = {props.goto}
         key = {'plots' + i}
         id = {'plots' + i}
         className = { ( props.current === i) ? "plots-current" : ''}
        >•</li>
       );
    }
    //  console.log('Plot',this.props.i );
    return (
      <ul
      onMouseEnter={props.enter}
      onMouseLeave={props.leave}
      className="panel-carrousel--cadre-plots">
      {plots}
      </ul>
      );
  };

/*
  var Plots = React.createClass({
    render: function(){
      var plots =[] ;
      for(var i=0; i<this.props.length; i++){
        plots.push(
          <li
           onClick = {this.props.goto}
           key = {'plots' + i}
           id = {'plots' + i}
           className = { ( this.props.current === i) ? "plots-current" : ''}
          >•</li>
         );
      }
      //  console.log('Plot',this.props.i );
      return (
        <ul
        onMouseEnter={this.props.enter}
        onMouseLeave={this.props.leave}
        className="panel-carrousel--cadre-plots">
        {plots}
        </ul>
        );
      }
    });
*/

export default CarrouselPanel
