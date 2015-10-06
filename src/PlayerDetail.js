'use strict';

var React = require('react');

var PlayerDetail = React.createClass({
  
  getInitialState: function () {
    return {
      attended: this.props.attended
    }
  },
  
  handlePlayerAttended: function(e) {
    this.setState({attended: React.findDOMNode(this.refs.playerCheckbox).checked})
    //console.log(React.findDOMNode(this.refs.playerCheckbox).checked);
    //console.log(e);
    this.props.handlePlayerAttended(e);

  },
  
  componentWillReceiveProps: function (nextProps) {
    this.setState({attended: nextProps.attended});
    //React.findDOMNode(this.refs.playerCheckbox).checked)
    //console.log('nextProps: ', nextProps.attended);
    /*
    if (this.props.attendance) {
      if (this.props.attendance.id == nextProps.attendance.id) {
      
        if (React.findDOMNode(this.refs.playerCheckbox).checked !==  this.state.attended) {
          this.setState({attended: nextProps.attended})
        }        
      }
    }
    else {
      this.setState({attended: this.props.attended});
    }
    */
  },
  /*
  shouldComponentUpdate: function(nextProps, nextState) {
    //console.log('(nextProps.attendance == this.props.attendance): ', (nextProps.attendance == this.props.attendance))
    if (this.props.attendance) {
      if (nextProps.attendance.id == this.props.attendance.id) {
        return this.state.attended !== React.findDOMNode(this.refs.playerCheckbox).checked;  
      }
      else {
        return true;  
      }

    }
    else {
      return true;  
    }
  },
  */
  
  /*
  componentDidUpdate: function () {
    //this.setState({attended: this.props.attended})
    console.log('WAAAAAAAAAT')
  },
  */
  

  render: function() { 
    
    
    return (
        
      <tr>
        <td>
          <label>
            <input 
              type="checkbox"
              disabled={this.props.attendance ? false:true}
              ref="playerCheckbox"
              checked={this.state.attended}
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