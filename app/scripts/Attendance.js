'use strict';
var React = require('react');
var ReactBootstrap = require('react-bootstrap'),
    Glyphicon = ReactBootstrap.Glyphicon,
    Button = ReactBootstrap.Button,
    Col = ReactBootstrap.Col,
    Row = ReactBootstrap.Row;

var DateTimeField= require('react-bootstrap-datetimepicker');
var PlayerList = require('./PlayerList');
var moment = require('moment');

var Attendance = React.createClass({

  getInitialState: function() {
    return {
      date: moment().format('YYYY-MM-DDTHH:mm:ss.SSS'),

    }
  },

  componentWillReceiveProps: function(nextProps) {    
    if (nextProps.attendance) {
      this.setState({date: moment(nextProps.attendance.date).format('YYYY-MM-DDTHH:mm:ss.SSS')})  
    }
    
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
  changeDate: function(currentAttendance, newDate) {
    console.log(newDate);    
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
    //this.setState({date: moment().format('YYYY-MM-DDTHH:mm:ss.SSS')});    
    attendance.date = moment().format('YYYY-MM-DDTHH:mm:ss.SSS');

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
          console.log(data);
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
    console.log(this.state.date);
    console.log(this.props.attendance);    
    console.log('this.props.attendance.date: ', (this.props.attendance ? this.props.attendance.date:""));
    return (  
        <Row>
          <Col xs={12}> 
            <Row>
              <Col xs={6} md={3} bsStyle={"text-left"}>              
                <fieldset disabled={this.props.currentAttendance ? false:true}>
                  <DateTimeField 
                    inputFormat='D. MMM - h:mm' 
                    onChange={this.changeDate.bind(this, this.props.currentAttendance)}
                    format="YYYY-MM-DDTHH:mm:ss.SSS"
                    dateTime={this.state.date} />
                </fieldset>
              </Col>
              <Col xs={6} md={3} bsStyle="text-right">
                <Button 
                  bsStyle="success"

                  onClick={this.addAttendance}>
                    <Glyphicon glyph="plus"/> Ný mæting
                </Button>              
              </Col>
            </Row>    
            <Row>
              <Col xs={12}>                               
                <PlayerList
                  handleSaveAttendance={this.handleSaveAttendance}
                  handleAdd={this.handleAdd}
                  date={this.state.date}
                  players={this.props.seminar.players}
                  seminar={this.props.seminar.seminar_id}
                  handlePlayerAttended={this.handlePlayerAttended}                 
                  attendance={this.props.attendance}/>                
              </Col>
            </Row>
            <Row>
              <Button
                bsStyle="success"
                className="btn-save-attendance"                
                disabled={this.props.attendance ? false:true} 
                onClick={this.saveAttendance}>
                  <Glyphicon glyph="ok"/> Vista
              </Button> 
            </Row>                              
          </Col>
        </Row>

    );
  }    
});

module.exports = Attendance