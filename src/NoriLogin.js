'use strict';

var React = require('react');
var Main = require('./Main');
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


var NoriLogin = React.createClass({
  /*
  statics: {
    authenticate: function(apiUrl, token, cb) { 

      var payload = {header: 'Authorization', value: 'Bearer '+token}    

      var xhr = new XMLHttpRequest();    
      xhr.open('get', apiUrl, true);
      console.log(payload);
      xhr.setRequestHeader(payload.header, payload.value);
      xhr.onload = function() {
        var data = JSON.parse(xhr.responseText);
        console.log('DATA: ', data);
        
        cb(data);

      }.bind(this);

      xhr.send();    
    },

  },
  */
  getInitialState: function () {
    return {
      isAuthenticated: (localStorage.token ? true:false),
      loading: false
    }    
  },

  logIn: function(e) {
    e.preventDefault();
    this.setState({loading: true});  
    var loginUrl = SeminarService.apiUrl+'/login';
    var apiUrl = SeminarService.apiUrl+'/seminar';
    var payload = {      
        user: this.refs.user.getValue(),
        password: this.refs.password.getValue(),
        club: this.refs.club.getValue()
    };
   
    SeminarService.loginRequest(loginUrl, apiUrl, payload, function(err, data) {
      if (err) {
        console.log(err)
        this.setState({loading: false });
      }

      else {
        //console.log(data)
        localStorage.token = data.token;
        localStorage.username = data.username;
        this.setState({ isAuthenticated: true, loading: false }); 
        React.render(<Main data={data.data} url={SeminarService.apiUrl+'/seminar'} />, document.getElementById('main') );
      }
      
    }.bind(this));
    
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
        this.setState({isAuthenticated: true});
        React.render(<Main url={SeminarService.apiUrl+'/seminar'} />, document.getElementById('main') );
        this.setState({loading: false});
      }
      
    }.bind(this));
    
    //console.log(this.state.loading);
  },    

  /*
  componentWillMount: function() {
    React.unmountComponentAtNode(document.getElementById('main'));
  },
  */
  
  
  componentDidMount: function() {
    //this.getSeminars();   
      
    SeminarService.authenticate(SeminarService.apiUrl+'/seminar', localStorage.token, function(err, data) {            

      if (err) {
        console.log(err);
        this.logout();
      }
      else {
        React.render(<Main data={data.data} url={SeminarService.apiUrl+'/seminar'} />, document.getElementById('main') );
      }
      
    }.bind(this));
  
      
  },
  
  logout: function() {
    delete localStorage.token;
    delete localStorage.username;
    this.setState({ isAuthenticated: false });
    React.unmountComponentAtNode(document.getElementById('main'));
  },

  render: function() {   
    

    if (this.state.isAuthenticated) {
      var navMarkup = (
        <Col 
          xs={12} 
          md={12}
          className="text-center">
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
        </Col>
        
      );
    }
    else {
      var navMarkup = (
        
          <form className='navbar-form'>
            <div className="form-group">
              <Input ref="club" type='text' placeholder='félag' />{' '}
            </div>
            <div className="form-group">
              <Input ref="user" type='text' placeholder='notandanafn' />{' '}
            </div>
            <div className="form-group">
              <Input ref="password" type='password' placeholder='lykilorð' />{' '}
            </div>
            <Button 
              onClick={this.logIn} 
              bsStyle='success' 
              type="submit"
              disabled={this.state.loading ? true:false}>
              <Glyphicon glyph={this.state.loading ? "glyphicon glyphicon-refresh glyphicon-refresh-animate":"log-in"}/> Innskrá
            </Button>
          </form>
        
      );
    };

    return (
      <Navbar 
      brand="NORIX">
        <Nav right>
          {navMarkup}
        </Nav>
      </Navbar>      
    )
  }
});

module.exports = NoriLogin