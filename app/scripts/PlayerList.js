'use strict';

var React = require('react');
var Main = require('./Main');
var PlayerDetail = require('./PlayerDetail');

var PlayerList = React.createClass({

  handleSaveAttendance: function() {
    this.props.handleSaveAttendance();
  },
  
  handleAdd: function(currentAttendance) {
    this.props.handleAdd(currentAttendance);
  },

  handlePlayerAttended: function(ssn) {
    this.props.handlePlayerAttended(ssn);
  },


  saveAttendance: function() {

    $.ajax({
      url: 'http://localhost:1337/attendance/'+this.props.attendance.id,
      dataType: 'json', 
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer '+localStorage.token
      },      
      async: true,
      data: this.props.attendance,

      success: function(data) {
        this.handleSaveAttendance();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("http://localhost:1337/attendance", status, err.toString());
      }.bind(this)
    });  
    
  },

  render: function() {

    var players = [];  

    if (this.props.attendance) {      
      var info = 'Fann enga mætingu';
      this.props.players.forEach(function(player) {
        this.props.attendance.attended.filter(function(a){
          
          if (a.ssn == player.ssn) {
            players.push(
              <PlayerDetail 
                date={this.props.date}
                attendance={this.props.attendance}
                attended={a.attended}
                player={player} 
                key={player.ssn}
                handlePlayerAttended={this.handlePlayerAttended.bind(this, player.ssn)} />);            
          }           
        }.bind(this));
      }.bind(this));
    }                

    else {
      this.props.players.forEach(function(player) {
        players.push(
          <PlayerDetail 
            date={this.props.date}
            attendance={this.props.attendance}
            player={player} 
            key={player.ssn}
            handlePlayerAttended={this.handlePlayerAttended.bind(this, player.ssn)} />);
      }.bind(this)); 
    };

    return (  
      <div className="row">
        <div className="col-xs-12">                                         
          <div className="row">
            <div className="col-xs-12">
              <div className="table-responsive">                
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nafn</th>
                      <th>Sími</th>
                      <th>Netfang</th>                      
                    </tr>
                  </thead>
                  <tbody>
                    {players}
                  </tbody>
                </table>
              </div> 
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 text-center">             
              <button 
                type="button"                
                className="btn btn-success btn-lg btn-save-attendance"
                disabled={this.props.attendance ? false:true} 
                onClick={this.saveAttendance}>Vista</button>            
            </div>
          </div>                                           
        </div>
      </div>    
    );    
  }    
});

module.exports = PlayerList