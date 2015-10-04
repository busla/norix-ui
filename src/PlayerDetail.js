'use strict';

var React = require('react');

var PlayerDetail = React.createClass({
  /*
  getInitialState: function () {
    return {
      attended: this.props.attended
    }
  },
*/
  handlePlayerAttended: function(ssn) {
    //this.setState({attended: !this.state.attended})
    this.props.handlePlayerAttended(ssn);

  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return this.props.attended !== nextProps.attended;
  },
  
  /*


  componentWillReceiveProps: function (nextProps) {
    this.setState({attended: nextProps.attended})
  },
  */

  render: function() { 
    
    //console.log('playerDetail: ', this.state.attended);
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