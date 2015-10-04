'use strict';

var React = require('react');
var Main = require('./Main');
//var NoriNavbar = require('./NoriNavbar');
var SeminarService = require('./services/Services');
var MediaQuery = require('react-responsive');

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


var NoriLoginForm = React.createClass({

  getInitialState: function () {
    return {
      isAuthenticated: (localStorage.token ? true:false),
      loading: false,
      disclaimer: false,
      data: []
    }    
  },

  logIn: function (e) {
    e.preventDefault();
    this.setState({loading: true});  
    var loginUrl = SeminarService.apiUrl+'/login';
    var apiUrl = SeminarService.apiUrl+'/seminar';
    var payload = {      
        user: this.refs.user.getValue(),
        password: this.refs.password.getValue(),
        club: this.refs.club.getValue()
    };

    this.props.logIn(loginUrl, apiUrl, payload);
    this.setState({loading: false});
  },
  
  /*
  componentDidMount: function () {
    this.setState({disclaimer: false})
  },
  */
  /*
  componentWillMount: function() {
    React.unmountComponentAtNode(document.getElementById('main'));
  },
  */
  
  handleChecked: function () {
    this.setState({disclaimer: !this.state.disclaimer})
  },

  render: function() {   
    
    /*
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
      var containerMarkup = (
        <div className="container">

          <form className="form-signin">
            <h2 className="form-signin-heading">Norix innskráning</h2>
            <Input className="form-control" ref="club" type='text' placeholder='félag' required="" autofocus="" />
            <Input className="form-control" ref="user" type='text' placeholder='notandanafn' required=""/>
            <Input ref="password" type='password' placeholder='lykilorð' required=""/>

            <Button 
              onClick={this.logIn} 
              bsStyle='primary'
              className=''
              bsSize='large'
              block
              type="submit"
              disabled={this.state.loading ? true:false}>
              <Glyphicon glyph={this.state.loading ? "glyphicon glyphicon-refresh glyphicon-refresh-animate":"log-in"}/> Innskrá
            </Button>
          </form>

        </div> 
      );      
       
    };
    */
    
    var loginForm = (

        <form className="form-signin">
          <h2 className="form-signin-heading text-center">NORIX</h2>
          <Input className="form-control" ref="club" type='text' placeholder='félag' required="" autofocus="" />
          <Input className="form-control" ref="user" type='text' placeholder='notandanafn' required=""/>
          <Input ref="password" type='password' placeholder='lykilorð' required=""/>
          <Input type="checkbox" onChange={this.handleChecked} label="NORIX kladdakerfið er ekki tengt Greiðslumiðlun (eiganda Nora) með neinum hætti. Ég samþykki að öll gögn sem ég hef aðgang að í Nora (ásamt notandanafni og lykilorði) verði einnig geymd í gagnagrunn NORIX. Öll lykilorð eru dulkóðuð í gagnagrunn Norix." />
          <Button 
            onClick={this.logIn} 
            bsStyle='primary'
            className=''
            bsSize='large'
            block
            type="submit"
            disabled={this.state.disclaimer ? false:true}>
            <Glyphicon glyph={this.state.loading ? "glyphicon glyphicon-refresh glyphicon-refresh-animate":"log-in"}/> Innskrá
          </Button>
        </form>

      
    );

    if (!this.state.isAuthenticated) {
      return (
        <div className="container">
          <Row>
            <Col sm={4} smOffset={4} xs={12}>          
              {loginForm}
            </Col>
          </Row>
        </div>


      );              
    }

    else {
      return (
        <Main data={this.state.data} />        
      );
    }
  }
});

module.exports = NoriLoginForm