'use strict';

var React = require('react');

var AttendanceMenuItem = require('./AttendanceMenuItem');

var AttendanceMenu = React.createClass({    
  handleChangeAttendance: function(aid){
    this.props.handleChangeAttendance(aid);
  },

  render: function() {
    var rows = [];
    this.props.attendance.forEach(function(attendance, index) {

      rows.push(
        <AttendanceMenuItem 
          attendance={attendance} 
          key={index}
          handleChangeAttendance={this.handleChangeAttendance}/>)
      }.bind(this));

    return (
      <div className="table-responsive">                
        <table className="table table-striped">
          <thead>
            <tr>                
              <th>Eldri mætingarlistar</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>                          
      </div>

    );
  }    
});

module.exports = AttendanceMenu