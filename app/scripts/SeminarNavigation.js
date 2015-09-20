'use strict';

var React = require('react');
var ReactSwipe = require('react-swipe')
var ReactBootstrap = require('react-bootstrap'),
    Glyphicon = ReactBootstrap.Glyphicon;
var SeminarItem = require('./SeminarItem');

var SeminarNavigation = React.createClass({

  handleClick: function(index) {    
    //this.props.changeSeminar(index);
  }, 

  handleSwipe: function(e) {
    console.log(e);
    this.props.changeSeminar(e);
    
  },
  
  _isInArray: function (value, array) {
    return array.indexOf(value) > -1;
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
                  handleClick={this.handleClick.bind(this, index)}
                  isCurrent={(this.props.currentSeminar === index)}
                  seminar={seminar}
                  key={seminar.seminar_id}
                  changeSeminar={this.changeSeminar}/>
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