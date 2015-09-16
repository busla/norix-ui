var React = require('react');
var Main = require('./Main');

var ReactBootstrap = require('react-bootstrap'),
    Nav = ReactBootstrap.Nav,
    NavItem = ReactBootstrap.NavItem,
    Navbar = ReactBootstrap.Navbar,
    MenuItem = ReactBootstrap.MenuItem,
    NavDropdown = ReactBootstrap.NavDropdown,
    Glyphicon = ReactBootstrap.Glyphicon,
    Button = ReactBootstrap.Button,
    ButtonToolbar = ReactBootstrap.ButtonToolbar,
    Input = ReactBootstrap.Input,
    Col = ReactBootstrap.Col,
    Row = ReactBootstrap.Row;

var NoriLogin = React.createClass({

  statics: {
    authenticate: function(apiUrl, token, cb) {      
      var payload = {header: 'Authorization', value: 'Bearer '+token}    

      var xhr = new XMLHttpRequest();    
      xhr.open('get', apiUrl, true);

      xhr.setRequestHeader(payload.header, payload.value);
      xhr.onload = function() {
        var data = JSON.parse(xhr.responseText);
        //console.log('DATA: ', data);
        
        cb(data);

      }.bind(this);

      xhr.send();    
    }
  },
  
  getInitialState: function () {
    return {
      isAuthenticated: (localStorage.token ? true:false),
      loading: false     
    }    
  },

  loginRequest: function(loginUrl, apiUrl, payload) {
    
    var xhr = new XMLHttpRequest();    
    xhr.open('post', loginUrl, true);
    
    xhr.onload = function() {
      var data = JSON.parse(xhr.responseText);
      //console.log(data);
      
      if (!('err' in data)) {
        localStorage.token = data.token;
        localStorage.username = data.user.username;
        this.setState({ isAuthenticated: true }); 
        React.render(<Main url={apiUrl} />, document.getElementById('main') );       
      }
      
    }.bind(this);

    xhr.send(JSON.stringify(payload)); 
  },

  logIn: function(e) {
    e.preventDefault();

    var loginUrl = 'http://localhost:1337/login';
    var apiUrl = 'http://localhost:1337/seminar';
    var payload = {      
        user: this.refs.user.getValue(),
        password: this.refs.password.getValue(),
        club: this.refs.club.getValue()
    };
   
    this.loginRequest(loginUrl, apiUrl, payload);
    
  },
  
  sync: function(e) {
    console.log(this.state.loading);
    this.setState({loading: true});
    e.preventDefault();
    NoriLogin.authenticate('http://localhost:1337/sync', localStorage.token, function(results) {      
      if (!('err' in results)) {   
          console.log(results)           
          this.setState({isAuthenticated: true});
          React.render(<Main url="http://localhost:1337/seminar" />, document.getElementById('main') );
          this.setState({loading: false});
      }
      else {
        console.log(results);
        this.logout();  
      }
      
    }.bind(this))
    
    console.log(this.state.loading);
  },    

  componentDidMount: function() {    
    NoriLogin.authenticate('http://localhost:1337/seminar', localStorage.token, function(results) {      
      if (!('err' in results)) {              
          this.setState({isAuthenticated: true});
          React.render(<Main url="http://localhost:1337/seminar" />, document.getElementById('main') );
      }
      else {
        console.log(results);
        this.logout();  
      }
      
    }.bind(this))
  },

  logout: function() {
    delete localStorage.token;
    delete localStorage.username;
    this.setState({ isAuthenticated: false });
    React.unmountComponentAtNode(document.getElementById('main'));
  },

  render: function() {   
    //console.log(this.state.isAuthenticated); 
    if (this.state.isAuthenticated) {
      var navMarkup = (
        <ButtonToolbar>
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
      );
    }
    else {
      var navMarkup = (
        
          <form className='navbar-form'>
            <Input ref="club" type='text' placeholder='félag' />{' '}
            <Input ref="user" type='text' placeholder='notandanafn' />{' '}
            <Input ref="password" type='password' placeholder='lykilorð' />{' '}
            <Button onClick={this.logIn} bsStyle='success' type="submit">Áfram <Glyphicon glyph="log-in"/></Button>
          </form>
        
      );
    };

    return (
      <Navbar brand="NORIX">
        <Nav right>
          {navMarkup}
        </Nav>
      </Navbar>      
    )
  }
});

module.exports = NoriLogin