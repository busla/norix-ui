'use strict';

var React = require('react');

var SeminarItem = React.createClass({
    handleClick: function(e){
      console.log('handleClick: ', e);
      e.preventDefault();
      //this.props.handleClick();
    },

    render: function() {
        var name = this.props.seminar.age_group;
        var players = this.props.seminar.players;

        return (          
          <a 
            href={this.props.seminar.seminar_id} 
            type="button" 
            className="btn btn-primary" 
            onClick={this.handleClick}>
              
              {name}    <span className="badge">
                {this.props.seminar.players.length}
              </span>
          </a>          
        );
    }
});

module.exports = SeminarItem