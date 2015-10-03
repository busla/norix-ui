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

  putAttendance: function(attendance) {
    var apiUrl = SeminarService.apiUrl + '/attendance/' + attendance.id;
    var payload = attendance;

    SeminarService.putAttendance(apiUrl, payload, function(err, data) {
      if (err) {
        console.log(err)        
      }
      else {
        //console.log('Vistaði mætingu: ', data);
        this.getSeminars(attendance.id)
      }
      
    }.bind(this));  
  },

  getSeminars: function(currentAttendance) {    
      SeminarService.getSeminars(SeminarService.apiUrl+'/seminar', function(err, data) {     
        //console.log('getSeminars: ', data); 
        if (err) {
          console.log(err);
          //this.logout();
        }
        else {
          if (this.isMounted()) {

            //console.log('data.data: ',  data.data);            
            //React.render(<Main data={data.data} getSeminars={this.getSeminars} url={SeminarService.apiUrl+'/seminar'} />, document.getElementById('main') );
            
            if (currentAttendance) {
              //console.log('currentAttendance: ', currentAttendance);
              this.setState({data: data.data, currentAttendance: currentAttendance});
              return;
            }

            this.setState({ data: data.data});
            
            
          }
        }
        
      }.bind(this));
    },  
  
  componentDidMount: function() {        
    //console.log('this.setState({data: this.props.data})', this.props.data);
    this.setState({data: this.props.data})
  },
  
  changeDate: function(attendance) {    
    
    this.putAttendance(attendance);
  },

  handleAdd: function(currentAttendance) {
    this.getSeminars(currentAttendance);    
  },

  changeSeminar: function(index) {
    //console.log('changeSeminar: function(index): ', index)
    this.setState({ currentSeminar: index });
    this.setState({ currentAttendance: null });    
  },
  handlePlayerAttended: function(attendance) {

    this.putAttendance(attendance);

  },

  handleChangeAttendance: function(aid) { 
    //console.log('handleChangeAttendance: ', this.state.data[this.state.currentSeminar].attendance);
    this.setState({ currentAttendance: aid });
  },


  render: function(){    

    var info = 'Sæki gögn.....'

    //console.log(this.state.data[this.state.currentSeminar]);
    if (this.state.data.length === 0) {
      return null;
    }

    else {
      //console.log('currentAttendance: ',this.state.currentAttendance);
      //var currentAttendance = this.state.currentAttendance;
      
      if (this.state.currentAttendance) {
        
        var attendance = _.findWhere(this.state.data[this.state.currentSeminar].attendance, {id: this.state.currentAttendance});      
        //console.log(attendance);
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
