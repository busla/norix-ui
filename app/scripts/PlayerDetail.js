var React = require('react');
var PlayerDetail = React.createClass({

  handlePlayerAttended: function(ssn) {

    this.props.handlePlayerAttended(ssn);

  },

  render: function() {    
    
    return (
        
      <tr>
        <td>
          <label>
            <input 
              type="checkbox"
              disabled={this.props.attendance ? false:true}
              checked={this.props.attended}
              value="value"
              onChange={this.handlePlayerAttended} />
          </label>
        </td>
        <td>                                      
          {this.props.player.player_name}                 
        </td>
        <td>                                      
          {this.props.player.phone}                 
        </td>
        <td>                                      
          {this.props.player.email}
        </td>        
      </tr>            
             
    );
  }    
});

module.exports = PlayerDetail