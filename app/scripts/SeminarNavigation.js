var React = require('react');

var SeminarItem = require('./SeminarItem');

var SeminarNavigation = React.createClass({

  handleClick: function(index) {    
    this.props.changeSeminar(index);
  }, 

  render: function() {

  var seminars = [];
      this.props.seminarList.forEach(function(seminar, index) {
          seminars.push(
            <SeminarItem
              handleClick={this.handleClick.bind(this, index)}
              isCurrent={(this.props.currentSeminar === index)}
              seminar={seminar}
              key={seminar.seminar_id}
              changeSeminar={this.changeSeminar}/>)
      }.bind(this));
   
   
  
    return (
        <ul className="nav nav-pills">{seminars}</ul>        
    );
  }
});

module.exports = SeminarNavigation