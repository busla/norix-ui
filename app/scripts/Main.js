var React = require('react');

var Waiting = require('./Waiting');
var SeminarNavigation = require('./SeminarNavigation');
var Attendance = require('./Attendance');
var AttendanceMenu = require('./AttendanceMenu');
var _ = require('underscore');

var Main = React.createClass({

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
          headers: {
            'Authorization': 'Bearer '+localStorage.token
          },          
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
  
  componentWillReceiveProps: function(nextProps) {
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
   
  changeDate: function(newDate, currentAttendance) {    
    _.each(this.state.data[this.state.currentSeminar].attendance, function(attendance) {      
      if (attendance.id == currentAttendance) {
        attendance.date = newDate;          
      }              
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
      return null;
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
                  changeDate={this.changeDate}
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



module.exports = Main
