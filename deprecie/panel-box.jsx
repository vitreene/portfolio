import React from 'react'
import ReactDOM from 'react-dom'
import Marked from 'marked'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
//import ReactCSSTransitionReplace from 'react-css-transition-replace';
import CloseBox from './close-box'
import ActiverMenu from './activer-menu'
import CarrouselPanel from './carousel-panel'


const PanelBox = React.createClass({

  closePanel: function(){
    this.props.togglePanel('close') ;
  },
  rawMarkup: function(txt) {
    var rawMarkup = Marked(txt.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },
  componentWillMount: function () {
   ActiverMenu.menuClose() ;
   ActiverMenu.minimizeMenuIcon('panel-box') ;
  },
  componentWillUnmount: function () {
  ActiverMenu.expandMenuIcon('panel-box') ;
  },
  componentDidMount: function(){
    var element = document.getElementById("my-scroll"),
     to =  ReactDOM.findDOMNode(this).offsetTop -16,
     duration = 300;
     scrollTo(element, to, duration) ;
  },
  render: function(){
    let classPanel = 'panel ' + this.props.data.modele ;

    console.log(this.props.data.id, this.props.data.files);
    
    return (
    <ReactCSSTransitionGroup
      transitionName="open-panel"
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}
      component = 'div'
      className={classPanel}
      id="panel"
      key={this.props.key}
      >
        <CloseBox
          onClick = {this.closePanel}
          className = "panel-close"
          />
        <h2 className = "panel-titre">{this.props.data.titre}</h2>
        <div className = "panel-carrousel">
          <CarrouselPanel
            files = {this.props.data.files}
            modele = {this.props.data.modele}
            id = {this.props.data.id}
          />
          <article
            className = "panel-texte--contexte"
            dangerouslySetInnerHTML={this.rawMarkup(this.props.data.intro)}
          />
        </div>
        <article
          className = "panel-texte-commentaire"
          dangerouslySetInnerHTML =
          {this.rawMarkup(this.props.data.texte)}
        />
    </ReactCSSTransitionGroup>
    );
  }
});

export default PanelBox ;

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
