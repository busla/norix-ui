'use strict';

var React = require('react');
var moment = require('moment');

var AttendanceMenuItem = React.createClass({

  handleChangeAttendance: function(e){
    e.preventDefault();
    this.props.handleChangeAttendance(this.props.attendance.id);
  },

  render: function() {

    var niceDate = moment(this.props.attendance.date).format('DD. MMMM - HH:mm');    
    return (
        
      <tr>
        <td>                                      
          <a href={this.props.attendance.id} onClick={this.handleChangeAttendance}>{niceDate}</a>
        </td>
      </tr>            
             
    );
  }    
});

module.exports = AttendanceMenuItem