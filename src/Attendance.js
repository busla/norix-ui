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
var SeminarService = require('./services/Services');
var _ = require('underscore');

var Attendance = React.createClass({

  getInitialState: function() {
    return {
      date: moment().format('YYYY-MM-DDTHH:mm:ss.SSS'),

    }
  },

  componentWillReceiveProps: function(nextProps) { 
    //console.log('nextProps.attendance.attended: ', nextProps.attendance.attended);   
    if (nextProps.attendance) {
      this.setState({date: moment(nextProps.attendance.date).format('YYYY-MM-DDTHH:mm:ss.SSS')})  
    }
    
  },

  changeDate: function(currentAttendance, newDate) {
    //console.log(newDate);    
    this.props.changeDate(newDate, currentAttendance);
  },

  
  handleAdd: function(currentAttendance) {
    this.props.handleAdd(currentAttendance);
  },
  
  handlePlayerAttended: function(ssn) {
   //var attendanceList = this.state.data[this.state.currentSeminar].attendance;
    //_.each(attendanceList, function(attendance) {      
      _.each(this.props.attendance.attended, function(player) {
          if (player.ssn == ssn) {
            player.attended = !player.attended;  
          }        
      });
    //});

    this.props.handlePlayerAttended(this.props.attendance);
  },

  newAttendance: function() {
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
    //console.log('attendance.attended: ', attendance.attended);

    var apiUrl = SeminarService.apiUrl+'/seminar/'+this.props.seminar.seminar_id+'/attendance';
    var payload = attendance;
    //console.log(apiUrl);

    SeminarService.newAttendance(apiUrl, payload, function(err, data) {
      if (err) {
        console.log(err)        
      }
      else {
        //console.log(data);
        if (this.isMounted()) {
          //console.log(data);
          var lastItem = (data.attendance.length - 1);
          this.handleAdd(data.attendance[lastItem].id);
        }        
      }
      
    }.bind(this));     

    
  },

  render: function() {
    var info = 'Fann enga mætingu';
    //console.log(this.state.date);
    //console.log(this.props.attendance);    
    //console.log('this.props.attendance.date: ', (this.props.attendance ? this.props.attendance.date:""));
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

                  onClick={this.newAttendance}>
                    <Glyphicon glyph="plus"/> Ný mæting
                </Button>              
              </Col>
            </Row>    
            <Row>
              <Col xs={12}>                               
                <PlayerList
                  handlePutAttendance={this.handlePutAttendance}
                  handleAdd={this.handleAdd}
                  date={this.state.date}
                  players={this.props.seminar.players}
                  seminar={this.props.seminar.seminar_id}
                  handlePlayerAttended={this.handlePlayerAttended}                 
                  attendance={this.props.attendance}/>                
              </Col>
            </Row>                             
          </Col>
        </Row>

    );
  }    
});

module.exports = Attendance