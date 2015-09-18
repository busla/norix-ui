var React = require('react');

var DateTimeField= require('react-bootstrap-datetimepicker');
var PlayerList = require('./PlayerList');
var moment = require('moment');

var Attendance = React.createClass({
  getInitialState: function() {
    return {
      date: moment().format('YYYY-MM-DDTHH:mm:ss.SSS')

    }
  },

  changeDate: function(currentAttendance, newDate) {    
    this.props.changeDate(newDate, currentAttendance);
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
      headers: {
        'Authorization': 'Bearer '+localStorage.token
      },      
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

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.currentAttendance) {

      this.setState({date: moment(nextProps.attendance.date).format('YYYY-MM-DDTHH:mm:ss.SSS')});
    }
  },

  render: function() {
    var info = 'Fann enga mætingu';

    return (  
        <div className="row">
          <div className="col-xs-12"> 
            <div className="row">
              <div className="col-xs-6 col-md-3 text-left"> 
                <fieldset disabled={this.props.currentAttendance ? false:true}>
                  <DateTimeField 
                    inputFormat='D. MMM - h:mm' 
                    onChange={this.changeDate.bind(this, this.props.currentAttendance)}
                    format="YYYY-MM-DDTHH:mm:ss.SSS"
                    dateTime={this.state.date} />
                </fieldset>
              </div>
              <div className="col-xs-6 col-md-3 text-right">
                <button 
                  type="button"                 
                  className="btn btn-success btn-md" 
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

module.exports = Attendance