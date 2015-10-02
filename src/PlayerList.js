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

  render: function() {
    //console.log('attendance: ', this.props.attendance);
    var players = [];  


    if (this.props.attendance) { 

      var attendance = this.props.attendance;   
      var info = 'Fann enga mætingu';
      this.props.players.forEach(function(player) {
        attendance.attended.filter(function(a){
          
          if (a.ssn == player.ssn) {
            players.push(
              <PlayerDetail 
                date={this.props.date}
                attendance={attendance}
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
            attendance={attendance}
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
           
            </div>
          </div>                                           
        </div>
      </div>    
    );    
  }    
});

module.exports = PlayerList