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
    //console.log('CHECKED:', this.state.checked);
    //console.log(this.props.player.player_name + ' ATTENDED = ' + this.props.player.attended);

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
    //for (var i = 0; i < this.props.attendance.length; i++) {
      //console.log(attendance.date);
      rows.push(
        <AttendanceMenuItem 
          //handleClick={this.handleChangeAttendance}
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
  
  /*
  componentDidMount: function() {
    this.setState({attended: this.props.attended});
  },
  */
  handleAttendance: function(ssn) {
    //console.log(index);
    //console.log('index, attended', index, attended);
    /*
   var nextState = {
          ssn: this.state.player.ssn,
          attended: (this.state.player.ssn === ssn ? !this.state.player.attended : this.state.player.attended)
      };


    this.setState({player: nextState});
    console.log('this.state.player: ', this.state.player);
    */    
    //var newAttended = !this.state.attended;
    //this.setState({attended: newAttended});
    //var changedPlayer = {ssn: this.props.player.ssn, attended: newAttended};
    this.props.handleAttendance(ssn);

    //this.setState({player[attended]});
  },

  render: function() {
    //console.log('this.state.attended: ', this.state.attended);
    console.log('this.props.attended: ', this.props.attended);
    //console.log(this.props.player);
  //console.log('ATTENDED detail:', this.state.attended);
    //console.log(this.state.checked);
    //console.log(this.props.attended);    
    //console.log(this.state.data[this.state.currentSeminar]);
    //console.log(this.props.player.player_name + ' ATTENDED: ' + this.props.player.attended);
    
    return (
        
      <tr>
        <td>
          <label>
            <input 
              type="checkbox"
              disabled={this.props.attendance ? false:true}
              checked={this.props.attended}
              value="value"
              //defaultChecked={this.props.attendance ? false:true} 
              onChange={this.handleAttendance} />
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

  handleSave: function() {
    this.props.handleSave();
  },
  
  handleAdd: function(currentAttendance) {
    this.props.handleAdd(currentAttendance);
  },

  handleAttendance: function(ssn) {

    console.log('ssn: ', ssn);
    this.props.handleAttendance(ssn);

    /*

    this.state.attendance.attended.forEach(function(player, index) {
      
      if (player.ssn == ssn) {
        newAttended.push({ssn: ssn, attended: !(player.attended === 'true')});
      }

      else {
        newAttended.push({ssn: ssn, attended: player.attended});
      }
    });

    attendance.attended = newAttended;

    this.setState({attendance: attendance});
    */
  },

  addAttendance: function() {
    //console.log(this.state.data[this.state.currentSeminar].players);
    var seminars = [];
    var attendance = {};
    var players = [];
    var temp = [];
    //console.log(moment().toISOString());
    //console.log(this.props.seminar.players);

    attendance.date = this.state.date;
    //attendance.seminar = this.props.seminar.seminar_id

    this.props.players.forEach(function(player, index) {      
      players.push(
        {
          ssn: player.ssn,
          attended: true
        });
    });
    
    
    console.log('attendance.date: ', attendance.date);
    console.log('this.state.date: ', this.state.date);
    attendance.attended = players;
    var url = 'http://localhost:1337/seminar/'+this.props.seminar.seminar_id+'/attendance';

    $.ajax({
      url: url,
      dataType: 'json',
      //contentType: 'application/json',
      method: 'POST',
      async: true,
      //processData: false,
      data: attendance,

      success: function(data) {
        //console.log('SUCCESS: ', data);   
        
        if (this.isMounted()) {
          //console.log('RESPONSE:', data);          
          //console.log('ATTENDANCE:', data.attendance.length -1);
          var lastItem = (data.attendance.length - 1);
          //console.log('ATTENDANCE:', lastItem.id);
          this.handleAdd(data.attendance[lastItem].id);
        }
        
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });  
    
  },
  saveAttendance: function() {
 
    //console.log(moment().toISOString());
    //console.log(this.props.seminar.players);
    //attendance.date = this.props.date;

    $.ajax({
      url: 'http://localhost:1337/attendance/'+this.props.attendance.id,
      dataType: 'json', 
      //contentType: 'application/json',
      method: 'PUT',
      async: true,
      //processData: false,
      data: this.props.attendance,

      success: function(data) {
        console.log('SUCCESS: ', data);   
        /*
        if (this.isMounted()) {
          //console.log('CURRENT:', this.props.seminar);
          this.handleSave();         
        }
        */
        
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("http://localhost:1337/attendance", status, err.toString());
      }.bind(this)
    });  
    
  },


  /*
  handleAttended: function(player) {
    this.setState({attended: player});
  },
  */
  render: function() {

    var players = [];  

    if (this.props.attendance) {
      //console.log('currentAttendance: ',currentAttendance);
      
      var info = 'Fann enga mætingu';
      console.log('this.props.attendance.date: ', this.props.attendance.date);
      console.log('this.props.attendance: ', this.props.attendance);
      this.props.players.forEach(function(player) {
        this.props.attendance.attended.filter(function(a){
          
          if (a.ssn == player.ssn) {
            //console.log(a.attended);
            //var attended = (a.attended === 'true');
            //console.log('attended: ', attended);
            //playersAttended.push({ssn: player.ssn, attended: (a.attended === 'true')});
            players.push(
              <PlayerDetail 
                //handleAttended={this.handleAttended} 
                //disabled={false}
                date={this.props.date}
                //currentAttendance={this.props.currentAttendance}
                //attended={attended}
                //readOnly={false} 
                attendance={this.props.attendance}
                attended={a.attended}
                player={player} 
                key={player.ssn}
                handleAttendance={this.handleAttendance.bind(this, player.ssn)} />);            
          }           
        }.bind(this));
      }.bind(this));
      //console.log('players: ', players);
    }                

    else {
      //console.log('this.props.currentAttendance: ', this.props.currentAttendance);
      this.props.players.forEach(function(player) {
        //console.log('player: ', player.ssn, player.attended);
        players.push(
          <PlayerDetail 
            //handleAttended={this.handleAttended} 
            //disabled={false}
            date={this.props.date}
            //currentAttendance={this.props.currentAttendance}
            //readOnly={false} 
            //attended={player.attended}
            attendance={this.props.attendance}
            player={player} 
            key={player.ssn}
            handleAttendance={this.handleAttendance.bind(this, player.ssn)} />);
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
      //attendance: attendance,
      date: moment().format('YYYY-MM-DDTHH:mm:ss.SSS')

    }
  },

  handleSave: function() {
    this.props.handleSave();
  },
  
  handleAdd: function(currentAttendance) {
    this.props.handleAdd(currentAttendance);
  },
  
  handleAttendance: function(ssn) {
    console.log('ssn: ', ssn)
    this.props.handleAttendance(ssn);
  },

  addAttendance: function() {
    //console.log(this.state.data[this.state.currentSeminar].players);
    var seminars = [];
    var attendance = {};
    var players = [];
    var temp = [];
    //console.log(moment().toISOString());
    //console.log(this.props.seminar.players);

    attendance.date = this.state.date;
    //attendance.seminar = this.props.seminar.seminar_id

    this.props.seminar.players.forEach(function(player, index) {      
      players.push(
        {
          ssn: player.ssn,
          attended: true
        });
    });
    
    
    console.log('attendance.date: ', attendance.date);
    console.log('this.state.date: ', this.state.date);
    attendance.attended = players;
    var url = 'http://localhost:1337/seminar/'+this.props.seminar.seminar_id+'/attendance';

    $.ajax({
      url: url,
      dataType: 'json',
      //contentType: 'application/json',
      method: 'POST',
      async: true,
      //processData: false,
      data: attendance,

      success: function(data) {
        //console.log('SUCCESS: ', data);   
        
        if (this.isMounted()) {
          console.log('RESPONSE:', data.attendance);          
          console.log('ATTENDANCE:', data.attendance.length -1);
          var lastItem = (data.attendance.length - 1);
          //console.log('ATTENDANCE:', lastItem.id);
          this.handleAdd(data.attendance[lastItem].id);
        }
        
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });  
    
  },

  /*
  handleAttended: function(player) {
    this.setState({attended: player});
  },
  */
  render: function() {
    var info = 'Fann enga mætingu';
    //var attendance = {};
    //console.log(this.props.currentAttendance);
    //var players = [];
    //var allPlayers = this.props.seminar.players;
    var attendance = this.props.currentAttendance;

    //console.log('this.props.currentAttendance: ', this.props.currentAttendance);


    if (attendance) {
      attendance = _.findWhere(this.props.seminar.attendance, {id: this.props.currentAttendance});      
    }

    console.log('attendance: ', attendance); 
    //console.log('this.props.seminar.players: ', this.props.seminar.players);
    

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
                    dateTime={this.state.date} />
                </fieldset>
              </div>
              <div className="col-xs-12 col-md-3">
                <button 
                  type="button" 
                  disabled={this.props.currentAttendance ? true:false}
                  className="btn btn-primary btn-md btn-block" 
                  onClick={this.addAttendance}>Ný mæting</button>
              </div>
            </div>    
            <div className="row">
              <div className="col-xs-12">                               
                <PlayerList
                  handleAdd={this.handleAdd}
                  date={this.state.date}
                  players={this.props.seminar.players}
                  seminar={this.props.seminar.seminar_id}
                  handleAttendance={this.handleAttendance}                 
                  attendance={attendance}/>                
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
                  //console.log(attendance);
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
    console.log('Mounting App....');
    
  },
  

  handleAttendance: function(ssn) {
    console.log('ssn: ', ssn);

    var previous = this;

    _.each(this.state.data[this.state.currentSeminar].attendance, function(attendance) {
      //console.log(attendance);
      _.each(attendance.attended, function(player) {
          if (player.ssn == ssn) {
            //console.log(player);
            player.attended = !player.attended;  
          }        
      });
    });

    console.log(this.state.data[this.state.currentSeminar].attendance);
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
    //console.log('EVENT DATE: ', this.state.date);
    var info = 'Sæki gögn.....'
    //console.log('Current seminar: ', this.state.currentSeminar)
    console.log('this.state.currentAttendance: ', this.state.currentAttendance);
    console.log('this.state.currentSeminar: ', this.state.currentSeminar);
    if (this.state.data.length === 0) {
      return ( <Waiting info={info}/> );
    }
    else {
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
                  handleAdd={this.handleAdd}                  
                  seminar={this.state.data[this.state.currentSeminar]}
                  handleAttendance={this.handleAttendance} 
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
//React.render(<DateTimeField />, document.getElementById('demo') );