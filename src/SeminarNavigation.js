'use strict';

var React = require('react');
var ReactSwipe = require('react-swipe')
var ReactBootstrap = require('react-bootstrap'),
    Glyphicon = ReactBootstrap.Glyphicon;
var SeminarItem = require('./SeminarItem');
var MediaQuery = require('react-responsive');

var SeminarNavigation = React.createClass({

  handleClick: function(index) {    
    this.props.changeSeminar(index);
  }, 

  handleClick: function(index) {    
    this.props.changeSeminar(index);
  },

  handleSwipe: function(e) {
    console.log(e);
    this.props.changeSeminar(e);    
  },
  
  render: function() {
  var seminarsMobile = [];
  var seminarsDesktop = [];

    this.props.seminarList.forEach(function(seminar, index) {        
        seminarsMobile.push(

          <span className="seminar-navigation" key={index}>              
          <Glyphicon 
            glyph={index !== 0 ? "chevron-left":""}
            className="glyph-light"/>
              <SeminarItem
                device="mobile"                  
                isCurrent={(this.props.currentSeminar === index)}
                seminar={seminar}
                key={seminar.seminar_id}
                handleClick={this.handleClick.bind(this, index)}/>
          <Glyphicon 
            glyph={index !== (this.props.seminarList.length - 1) ? "chevron-right":""}
            className="glyph-light"/>                                
          </span>)
    }.bind(this));

    this.props.seminarList.forEach(function(seminar, index) {
        seminarsDesktop.push(
          <SeminarItem
            device="desktop"
            handleClick={this.handleClick.bind(this, index)}
            isCurrent={(this.props.currentSeminar === index)}
            seminar={seminar}
            key={seminar.seminar_id}
            changeSeminar={this.changeSeminar}/>)
    }.bind(this));    
  
    return (
      <div>
        <MediaQuery query='(max-device-width: 1224px)'>
          <div className="row">
            <ReactSwipe
                continuous={false}
                transitionEnd={this.handleSwipe}>
                    {seminarsMobile}
            </ReactSwipe>
          </div>
        </MediaQuery>
        <MediaQuery query='(min-device-width: 1224px)'>
          <ul className="nav nav-pills">{seminarsDesktop}</ul> 
        </MediaQuery>
      </div>
    );
  }
});

module.exports = SeminarNavigation