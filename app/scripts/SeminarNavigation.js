'use strict';

var React = require('react');
var ReactSwipe = require('react-swipe')
var ReactBootstrap = require('react-bootstrap'),
    Glyphicon = ReactBootstrap.Glyphicon;
var SeminarItem = require('./SeminarItem');

var SeminarNavigation = React.createClass({

  handleClick: function(index) {    
    this.props.changeSeminar(index);
  }, 

  handleSwipe: function(e) {
    console.log(e);
    this.props.changeSeminar(e);    
  },
  
  render: function() {
  var seminars = [];
    this.props.seminarList.forEach(function(seminar, index) {        
        seminars.push(

          <span className="seminar-navigation" key={index}>              
          <Glyphicon 
            glyph={index !== 0 ? "chevron-left":""}
            className="glyph-light"/>
              <SeminarItem                  
                isCurrent={(this.props.currentSeminar === index)}
                seminar={seminar}
                key={seminar.seminar_id}
                handleClick={this.handleClick.bind(this, index)}/>
          <Glyphicon 
            glyph={index !== (this.props.seminarList.length - 1) ? "chevron-right":""}
            className="glyph-light"/>                                
          </span>)
    }.bind(this));
  
    return (
      <div className="row">
        <ReactSwipe
            continuous={false}
            transitionEnd={this.handleSwipe}>
                {seminars}
        </ReactSwipe>
      </div>
    );
  }
});

module.exports = SeminarNavigation