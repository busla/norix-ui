'use strict';

var React = require('react');
var ReactSwipe = require('react-swipe')

var SeminarItem = require('./SeminarItem');

var SeminarNavigation = React.createClass({

  handleClick: function(index) {    
    this.props.changeSeminar(index);
  }, 

  handleSwipe: function(e) {
    this.props.changeSeminar(e);
    console.log(e);
  },

  handleTrans: function(e) {
    console.log(e);
  },

  render: function() {

  var seminars = [];
      this.props.seminarList.forEach(function(seminar, index) {
          seminars.push(
            <span className="text-center" key={index}>
            <SeminarItem
              handleClick={this.handleClick.bind(this, index)}
              isCurrent={(this.props.currentSeminar === index)}
              seminar={seminar}
              key={seminar.seminar_id}
              changeSeminar={this.changeSeminar}/></span>)
      }.bind(this));
   
   
  
    return (
              <div className="row">
              <ReactSwipe
                  continuous={true}
                  transitionEnd={this.handleSwipe}>
                      {seminars}
              </ReactSwipe>
              </div>

        
    );
  }
});

module.exports = SeminarNavigation