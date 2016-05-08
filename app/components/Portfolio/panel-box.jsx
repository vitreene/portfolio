import React from 'react'
import Marked from 'marked'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import CarrouselPanel from './carousel-panel'
import ActiverMenu from './activer-menu'
import CloseBox from './close-box'
import ReactDOM from 'react-dom'


const PanelBox = React.createClass({
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
  componentWillMount: function () {
    ActiverMenu.menuClose() ;
    // activerMenu() ;
  },
  componentWillUnmount: function () {
    //activerMenu.menuOpen() ;
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
    //console.log('diff', to - element.scrollTop );
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
    transitionName="open-panel"
    transitionAppear={true}
    transitionAppearTimeout={500}
    transitionEnterTimeout={500}
    transitionLeaveTimeout={300}
    component = 'div'
      className="panel"
      id="panel"
      key={this.props.key} >
        <CloseBox
          onClick={this.closePanel}
          className="panel-close" />
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

export default PanelBox ;
