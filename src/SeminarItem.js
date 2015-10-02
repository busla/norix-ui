'use strict';

var React = require('react');

var SeminarItem = React.createClass({
    handleClick: function(e){
      console.log('handleClick: ', e);
      e.preventDefault();
      this.props.handleClick();
    },

    render: function() {
        var name = this.props.seminar.age_group;
        var players = this.props.seminar.players;
        
        switch (this.props.device) {
          case "mobile":
            return (          
              <a 
                href="#"
                type="button" 
                className="btn btn-primary">
                  
                  {name}    <span className="badge">
                    {this.props.seminar.players.length}
                  </span>
              </a>          
            );
            break;
          case "desktop":
            return (
              <li className={this.props.isCurrent ? 'active' : null} role="presentation">
                <a href={this.props.seminar.seminar_id} onClick={this.handleClick}>{name}</a>
              </li>                
            );           
            break;
        };
    }
});

module.exports = SeminarItem