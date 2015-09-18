var React = require('react');

var SeminarItem = React.createClass({
    handleClick: function(e){
      e.preventDefault();
      this.props.handleClick();
    },

    render: function() {
        var name = this.props.seminar.age_group.substring(0, 15);
        var players = this.props.seminar.players;

        return (
          <li className={this.props.isCurrent ? 'active' : null} role="presentation">
            <a href={this.props.seminar.seminar_id} onClick={this.handleClick}>{name}</a>
          </li>                
        );
    }
});

module.exports = SeminarItem