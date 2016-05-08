import React from 'react'
import ReactCSSTransitionReplace from 'react-css-transition-replace'
import SetIntervalMixin from './set-interval-mixin'




var CarrouselPanel = React.createClass({

  mixins: [SetIntervalMixin], // Use the mixin
  getInitialState: function(){
    return{
      visible : {
        precedent : null,
        current : 0
      },
      active: false,
      pause : false,
      timer : undefined
    };
  },

  componentDidMount: function() {
    this.setState({timer : this.setInterval(this.timer, 2000, true) }); // Call a method on the mixin
    window.addEventListener('keydown', this.keypressed);
  },
  componentWillUnmount: function() {
    window.removeEventListener('keydown', this.keypressed);
  },
  componentDidUpdate: function() {
    if (false === this.state.active) {
      requestAnimationFrame( function () {
        this.setState( {active : true} ) ;
        }.bind(this) )
    }
/*
      setTimeout(function () {
        this.setState( {active : true} ) ;
      }.bind(this),20)
    };
    */
  },
  timer:function(next){
    next = (typeof(next) == 'Number' ) ? next : !this.state.pause ;
    var visible = (this.state.visible.current + next ) % this.props.data.length ;
    visible = (visible < 0) ? this.props.data.length -1 : visible ;
  //  console.log('NEXT', visible, next, !this.state.pause );
    this.setState({
      visible : {
        precedent : this.state.visible.current,
        current : visible
        }
    }) ;
    this.setState( {active : false} ) ;
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
    this.setState({
      visible : {
        precedent : this.state.visible.current,
        current : key
        }
    }) ;
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
  creerIMG: function(el, i){
    // au départ precedent n'est pas défini
    if (el===null) return ;
    // le premier élément est : précédent
    var visible = (i) ? ' current' : ' precedent' ;

    var img = this.props.data[el] ;
    var bgImg = require('../../assets/portfolio2/' + img.file ) ;

    var active = (this.state.active) ? visible+'-img ' : '' ;
    var clName = 'panel-carrousel--cadre-img ' +
      (img.action || '') +
      visible +'-img-enter '+ active ;
  //  console.log('CLASS', enter);
    return (
     <div
       className = { clName }
       key = {img.file}
       onTouchStart={this.toggle}
       onClick={this.toggle}
     >
      <img
       src = { bgImg }
       alt = {img.legende}
       className = "panel-cadre-img"
      />
     </div>
     ) ;
  },
  render: function(){
  var imgs = [
    this.state.visible.precedent,
    this.state.visible.current
    ]
    .map( this.creerIMG, this)
    .filter(function(el){
      return el ;
    }) ;
  //  console.log('this.state.enter', this.state.enter);
  return (
    <div
    className= "panel-carrousel--cadre">
      <div
      className="panel-carrousel--cadre-vues">
        {imgs}
    </div>
    <Plots
      goto = {this.goto}
      length = {this.props.data.length}
      current = {this.state.visible.current}
      />
    </div>
  );
  }
});


var Plots = React.createClass({
  render: function(){
    var plots =[] ;
    for(var i=0; i<this.props.length; i++){
      plots.push(
        <li
         onClick = {this.props.goto}
         key = {'plots' + i}
         className = { ( this.props.current === i) ? "plots-current" : ''}
        >•</li>
       );
    }
    //  console.log('Plot',this.props.i );
    return (
      <ul className="panel-carrousel--cadre-plots">
      {plots}
      </ul>
      );
    }
  });
/*
var Plot = React.createClass({
    render: function(){
    //  console.log('Plot',this.props.i );
      return (
        <li
         onClick = {this.props.goto}
         key = {'plots' + this.props.i}
         className = { ( this.props.current === this.props.i) ? "plots-current" : ''}
        >•</li>
     );
   }
});
*/

export default CarrouselPanel
