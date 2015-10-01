'use strict';

var React = require('react');
var Waiting = require('./Waiting');
var SeminarNavigation = require('./SeminarNavigation');
var Attendance = require('./Attendance');
var AttendanceMenu = require('./AttendanceMenu');
var _ = require('underscore');
var SeminarService = require('./services/Services');

var ReactBootstrap = require('react-bootstrap'),
    Nav = ReactBootstrap.Nav,
    NavItem = ReactBootstrap.NavItem,
    Navbar = ReactBootstrap.Navbar,
    MenuItem = ReactBootstrap.MenuItem,
    NavDropdown = ReactBootstrap.NavDropdown,
    Glyphicon = ReactBootstrap.Glyphicon,
    Button = ReactBootstrap.Button,
    ButtonToolbar = ReactBootstrap.ButtonToolbar,
    ButtonGroup = ReactBootstrap.ButtonGroup,
    Input = ReactBootstrap.Input,
    Col = ReactBootstrap.Col,
    Row = ReactBootstrap.Row;

var Main = React.createClass({

  getInitialState: function () { 
    
    return {
        seminars: [],
        data: [],
        currentSeminar: 0,
        currentAttendance: null        
    }
  },

  getSeminars: function(currentAttendance) {    
    SeminarService.getSeminars('http://localhost:1337/seminar', function(err, data) {     
      console.log('getSeminars: ', data); 
      if (err) {
        console.log(err);
        //this.logout();
      }
      else {
        if (this.isMounted()) {
          data.data.forEach(function(seminar) {
            seminar.attendance.forEach(function(attendance) {            
              attendance.attended.forEach(function(attended) {                    
                attended.attended = (attended.attended === 'true');
              });
            });
          });
          
          this.setState({ data: data.data});
          
          if (currentAttendance) {
            this.setState({currentAttendance: currentAttendance})
          }
        }
      }
      
    }.bind(this));
  },
  

  componentDidMount: function() {        
    console.log(this.state.data);
    this.setState({data: this.props.data})
  },

  /*
  componentWillReceiveProps: function(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.setState({data: nextProps.data})  
    }
    
  },
  */

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
    console.log('changeSeminar: function(index): ', index)
    this.setState({ currentSeminar: index });
    this.setState({ currentAttendance: null });    
  },

  handleChangeAttendance: function(aid) {
    this.setState({ currentAttendance: aid });
  },


  render: function(){    
    var info = 'Sæki gögn.....'
    //console.log(this.state.data[this.state.currentSeminar]);
    if (this.state.data.length === 0) {
      return null;
    }

    else {
      var attendance = this.state.currentAttendance;
      
      if (attendance) {
        attendance = _.findWhere(this.state.data[this.state.currentSeminar].attendance, {id: this.state.currentAttendance});      
        
    }
      return(
        <div className="container">                  
          <Row>
            <Col xs={12} md={9}>            
              <Row>
                <Col xs={12}>
                  <SeminarNavigation
                    currentSeminar={this.state.currentSeminar}
                    seminarList={this.state.data}
                    changeSeminar={this.changeSeminar} />
                </Col>
              </Row>                      
              <Row>
                <Col xs={12}>
                  <Attendance 
                    changeDate={this.changeDate}
                    handleSaveAttendance={this.getSeminars}
                    handleAdd={this.handleAdd} 
                    attendance={attendance}                 
                    seminar={this.state.data[this.state.currentSeminar]}
                    handlePlayerAttended={this.handlePlayerAttended} 
                    currentAttendance={this.state.currentAttendance}/>
                </Col>
              </Row>                   
            </Col>
            
            <Col xs={12} md={3} className="attendance attendance-list-container">              
              <AttendanceMenu 
                attendance={this.state.data[this.state.currentSeminar].attendance}
                handleChangeAttendance={this.handleChangeAttendance} />
            </Col>
            
          </Row>
        </div>  
      );
    }  
  }
});



module.exports = Main
