'use strict';

var React = require('react');
var Waiting = require('./Waiting');
var SeminarNavigation = require('./SeminarNavigation');
var Attendance = require('./Attendance');
var AttendanceMenu = require('./AttendanceMenu');
var _ = require('underscore');
var NoriLoginForm = require('./NoriLoginForm');
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
        currentAttendance: null,
        isAuthenticated: true        
    }
  },

  sync: function(e) {    
    e.preventDefault();
    this.setState({loading: true});
    console.log(localStorage.token);
    SeminarService.authenticate(SeminarService.apiUrl+'/sync', localStorage.token, function(err, results) {      
      if (err) {
        console.log(err);
        this.logout();
      }
      else {
        //this.setState({isAuthenticated: true});
        //React.render(<Main url={SeminarService.apiUrl+'/seminar'} />, document.getElementById('main') );
        this.setState({ data: results.data, loading: false});

      }
      
    }.bind(this));
    
    //console.log(this.state.loading);
  },  

  logout: function() {
    delete localStorage.token;
    delete localStorage.username;
    this.setState({ isAuthenticated: false });
    //React.unmountComponentAtNode(document.getElementById('main'));
  },

  logIn: function(loginUrl, apiUrl, payload) {
   
    SeminarService.loginRequest(loginUrl, apiUrl, payload, function(err, data) {
      if (err) {
        console.log(err)
        this.setState({loading: false });
      }

      else {
        //console.log(data)
        localStorage.token = data.token;
        localStorage.username = data.username;
        this.setState({ data: data.data, isAuthenticated: true}); 

        //React.render(<Main data={data.data} url={SeminarService.apiUrl+'/seminar'} />, document.getElementById('main') );
      }
      
    }.bind(this));
    
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
    SeminarService.authenticate(SeminarService.apiUrl+'/seminar', localStorage.token, function(err, data) {            

      if (err) {
        console.log(err);
        this.logout();
      }
      else {
        this.setState({data: data.data});
        //React.render(<Main data={data.data} url={SeminarService.apiUrl+'/seminar'} />, document.getElementById('main') );
      }
      
    }.bind(this));
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
    
    if (this.state.isAuthenticated) {

      if (this.state.data.length === 0) {
        return null;
      }


      //console.log('currentAttendance: ',this.state.currentAttendance);
      //var currentAttendance = this.state.currentAttendance;
      
      if (this.state.currentAttendance) {
        
        var attendance = _.findWhere(this.state.data[this.state.currentSeminar].attendance, {id: this.state.currentAttendance});      
        //console.log(attendance);
      }
      
      return(
        <div>  
          <Navbar 
          brand="NORIX">
                                   
              <ButtonToolbar className="pull-right">
                    <Button 
                      bsStyle="primary" 
                      className="navbar-btn">
                        <Glyphicon glyph="user"/> {localStorage.username}
                    </Button>            
                    <Button 
                      disabled={this.state.loading ? true:false}
                      bsStyle="success" 
                      className="navbar-btn"              
                      onClick={this.sync}>
                        <Glyphicon glyph={this.state.loading ? "glyphicon glyphicon-refresh glyphicon-refresh-animate":"refresh"}/> Uppfæra
                    </Button>             
                    <Button 
                      bsStyle="danger" 
                      className="navbar-btn"              
                      onClick={this.logout}>
                        <Glyphicon glyph="log-out"/> Hætta
                    </Button>
              </ButtonToolbar>
            
          </Navbar>
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
        </div>
      );
    
    }
    else {
      return (
        <NoriLoginForm logIn={this.logIn}/>
      );
    }
    
    
  }
});



module.exports = Main
