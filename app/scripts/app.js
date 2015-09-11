'use strict';

var React = require('react');
var DateTimeField= require('react-bootstrap-datetimepicker');
var moment = require('moment');
var _ = require('underscore');

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
              <th>Dagsetning</th>
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
          {this.props.player.email}                 
        </td>
        <td>                                      
          {this.props.date}
        </td>        
      </tr>            
             
    );
  }    
});

var PlayerList = React.createClass({

  changeDate: function(date) {    
    this.setState({ date: date });    
  },

  handleSaveAttendance: function() {
    this.props.handleSaveAttendance();
  },
  
  handleAdd: function(currentAttendance) {
    this.props.handleAdd(currentAttendance);
  },

  handlePlayerAttended: function(ssn) {
    this.props.handlePlayerAttended(ssn);
  },

  addAttendance: function() {
    var seminars = [];
    var attendance = {};
    var players = [];
    var temp = [];

    attendance.date = this.state.date;

    this.props.players.forEach(function(player, index) {      
      players.push(
        {
          ssn: player.ssn,
          attended: true
        });
    });
    
    
    attendance.attended = players;
    var url = 'http://localhost:1337/seminar/'+this.props.seminar.seminar_id+'/attendance';

    $.ajax({
      url: url,
      dataType: 'json',  
      method: 'POST',
      async: true,
      data: attendance,

      success: function(data) {
        
        if (this.isMounted()) {
          var lastItem = (data.attendance.length - 1);
          this.handleAdd(data.attendance[lastItem].id);
        }
        
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });  
    
  },
  saveAttendance: function() {

    $.ajax({
      url: 'http://localhost:1337/attendance/'+this.props.attendance.id,
      dataType: 'json', 
      method: 'PUT',
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
            <div className="col-xs-12">             
              <button 
                type="button" 
                className="btn btn-success btn-lg btn-block"
                disabled={this.props.attendance ? false:true} 
                onClick={this.saveAttendance}>Vista</button>            
            </div>
          </div>                                           
        </div>
      </div>    
    );    
  }    
});

var Attendance = React.createClass({
  getInitialState: function() {
    return {
      date: moment().format('YYYY-MM-DDTHH:mm:ss.SSS')

    }
  },

  handleSaveAttendance: function() {
    this.props.handleSaveAttendance();
  },
  
  handleAdd: function(currentAttendance) {
    this.props.handleAdd(currentAttendance);
  },
  
  handlePlayerAttended: function(ssn) {
    this.props.handlePlayerAttended(ssn);
  },

  addAttendance: function() {
    var seminars = [];
    var attendance = {};
    var players = [];
    var temp = [];

    attendance.date = this.state.date;

    this.props.seminar.players.forEach(function(player, index) {      
      players.push(
        {
          ssn: player.ssn,
          attended: true
        });
    });
    
    attendance.attended = players;
    var url = 'http://localhost:1337/seminar/'+this.props.seminar.seminar_id+'/attendance';

    $.ajax({
      url: url,
      dataType: 'json',  
      method: 'POST',
      async: true,
      data: attendance,

      success: function(data) {
        
        if (this.isMounted()) {
          var lastItem = (data.attendance.length - 1);
          this.handleAdd(data.attendance[lastItem].id);
        }
        
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });  
    
  },

  render: function() {
    var info = 'Fann enga mætingu';

    var attendanceDate = (this.props.currentAttendance ? moment(this.props.attendance.date).format('YYYY-MM-DDTHH:mm:ss.SSS'):this.state.date);    

    return (  
        <div className="row">
          <div className="col-xs-12"> 
            <div className="row">
              <div className="col-xs-12 col-md-3"> 

                <fieldset disabled={this.props.currentAttendance ? false:true}>
                  <DateTimeField 
                                 
                    inputFormat='D. MMM - h:mm' 
                    onChange={this.changeDate} 
                    
                    format="YYYY-MM-DDTHH:mm:ss.SSS"
                    dateTime={attendanceDate} />
                </fieldset>
              </div>
              <div className="col-xs-12 col-md-3">
                <button 
                  type="button"                 
                  className="btn btn-primary btn-md btn-block" 
                  onClick={this.addAttendance}>Ný mæting</button>
              </div>
            </div>    
            <div className="row">
              <div className="col-xs-12">                               
                <PlayerList
                  handleSaveAttendance={this.handleSaveAttendance}
                  handleAdd={this.handleAdd}
                  date={this.state.date}
                  players={this.props.seminar.players}
                  seminar={this.props.seminar.seminar_id}
                  handlePlayerAttended={this.handlePlayerAttended}                 
                  attendance={this.props.attendance}/>                
              </div>
            </div>                  
          </div>
        </div>

    );
  }    
});

var Waiting = React.createClass({

    render: function() {

        return (
        <div className="alert alert-info">
          {this.props.info}
        </div>
        );
    }
});


var SeminarItem = React.createClass({
    handleClick: function(e){
      e.preventDefault();
      this.props.handleClick();
    },

    render: function() {
        var name = this.props.seminar.seminar_name;
        var players = this.props.seminar.players;

        return (
          <li className={this.props.isCurrent ? 'active' : null} role="presentation">
            <a href={this.props.seminar.seminar_id} onClick={this.handleClick}>{name}</a>
          </li>                
        );
    }
});


var SeminarNavigation = React.createClass({

  handleClick: function(index) {    
    this.props.changeSeminar(index);
  }, 

  render: function() {

  var seminars = [];
      this.props.seminarList.forEach(function(seminar, index) {
          seminars.push(
            <SeminarItem
              handleClick={this.handleClick.bind(this, index)}
              isCurrent={(this.props.currentSeminar === index)}
              seminar={seminar}
              key={seminar.seminar_id}
              changeSeminar={this.changeSeminar}/>)
      }.bind(this));
   
   
  
    return (
        <ul className="nav nav-tabs">{seminars}</ul>      
    );
  }
});

var App = React.createClass({

  getInitialState: function () { 
    
    return {
        seminars: [],
        data: [],
        currentSeminar: 0,
        currentAttendance: null        
    };
  },

  getSeminars: function(currentAttendance) {
    $.ajax({      
          url: this.props.url,
          cache: true,
          success: function(data) {
            if (this.isMounted()) {
              data.forEach(function(seminar) {
                seminar.attendance.forEach(function(attendance) {            
                  attendance.attended.forEach(function(attended) {                    
                    attended.attended = (attended.attended === 'true');
                  });
                });
              });
              
              this.setState({ data: data});
              
              if (currentAttendance) {
                this.setState({currentAttendance: currentAttendance})
              }
            }
          }.bind(this),

          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
  },

  componentDidMount: function() {    
    this.getSeminars();    
  },
  

  handlePlayerAttended: function(ssn) {

    _.each(this.state.data[this.state.currentSeminar].attendance, function(attendance) {      
      _.each(attendance.attended, function(player) {
          if (player.ssn == ssn) {
            player.attended = !player.attended;  
          }        
      });
    });

    this.setState({data: this.state.data});
  },
   
  handleAdd: function(currentAttendance) {
    this.getSeminars(currentAttendance);    
  },

  changeSeminar: function(index) {
    this.setState({ currentSeminar: index });
    this.setState({ currentAttendance: null });    
  },

  handleChangeAttendance: function(aid) {
    this.setState({ currentAttendance: aid });
  },

  render: function(){
    var info = 'Sæki gögn.....'
    
    if (this.state.data.length === 0) {
      return ( <Waiting info={info}/> );
    }
    else {
    var attendance = this.state.currentAttendance;
    
    if (attendance) {
      attendance = _.findWhere(this.state.data[this.state.currentSeminar].attendance, {id: this.state.currentAttendance});      
      
    }

      return(
        <div>
          <div className="col-xs-12 col-md-9">
            <div className="row">
              <div className="col-xs-12">            
                <SeminarNavigation
                  currentSeminar={this.state.currentSeminar}
                  seminarList={this.state.data}
                  changeSeminar={this.changeSeminar} />
              </div>
            </div>                      
            <div className="row">
              <div className="col-xs-12">
                <Attendance 
                  handleSaveAttendance={this.getSeminars}
                  handleAdd={this.handleAdd} 
                  attendance={attendance}                 
                  seminar={this.state.data[this.state.currentSeminar]}
                  handlePlayerAttended={this.handlePlayerAttended} 
                  currentAttendance={this.state.currentAttendance}/>
              </div>
            </div>         
          </div>
          <div className="col-xs-12 col-md-3" >
            <AttendanceMenu 
              attendance={this.state.data[this.state.currentSeminar].attendance}
              handleChangeAttendance={this.handleChangeAttendance} />
          </div>
        </div>  
      );
    }  
  }
});


React.render(<App url="http://localhost:1337/seminar" />, document.getElementById('app') );