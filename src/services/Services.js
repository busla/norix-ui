var authHeader = {
  header: 'Authorization', 
  value: 'Bearer '+localStorage.token
};

var apiUrl = "http://localhost:1337";

var newAttendance = function(apiUrl, payload, cb) {
    console.log(apiUrl);
    var self = this;
    var xhr = new XMLHttpRequest();    
    xhr.open('post', apiUrl, true);
    xhr.setRequestHeader(authHeader.header, authHeader.value);

    xhr.onload = function() {
      self.data = JSON.parse(xhr.responseText);    
      
      if ('err' in self.data) {              
        cb(self.data.err, null);    
        return;
      }
      
      cb(null, self.data);
      
    }.bind(this);

    xhr.send(JSON.stringify(payload));
};

var putAttendance = function(apiUrl, payload, cb) {

    var self = this;
    var xhr = new XMLHttpRequest();    
    xhr.open('put', apiUrl, true);
    xhr.setRequestHeader(authHeader.header, authHeader.value);

    xhr.onload = function() {
      self.data = JSON.parse(xhr.responseText);    
      
      if ('err' in self.data) {              
        cb(self.data.err, null);    
        return;
      }
      
      cb(null, self.data);
      
    }.bind(this);

    xhr.send(JSON.stringify(payload));
};

var getSeminars = function(apiUrl, cb) {
  var self = this;
  var xhr = new XMLHttpRequest();    
  xhr.open('get', apiUrl, true);
  xhr.setRequestHeader(authHeader.header, authHeader.value);
  xhr.onload = function() {
    self.data = JSON.parse(xhr.responseText);    
    
    if ('err' in self.data) {              
      cb(self.data.err, null);    
      return;
    }
    
    cb(null, self.data);
    
  }.bind(this);

  xhr.send();

};

var loginRequest = function (loginUrl, apiUrl, payload, cb) { 
    var self = this;
    var xhr = new XMLHttpRequest();    
    xhr.open('post', loginUrl, true);
    
    xhr.onload = function() {
      self.data = JSON.parse(xhr.responseText);    
      
      if ('err' in self.data) {              
        cb(self.data.err, null);    
        return;
      }
      
      cb(null, self.data);
      
    }.bind(this);

    xhr.send(JSON.stringify(payload));      
};

var authenticate = function(apiUrl, token, cb) { 
  var self = this;
  var payload = {header: 'Authorization', value: 'Bearer '+token}    

  var xhr = new XMLHttpRequest();    
  xhr.open('get', apiUrl, true);
  console.log(payload);
  xhr.setRequestHeader(payload.header, payload.value);
  xhr.onload = function() {
    self.data = JSON.parse(xhr.responseText);
    console.log('Services: ', self.data);
  
    if ('err' in self.data) {              
      cb(self.data.err, null);    
      return;
    }
    
    cb(null, self.data);

  }.bind(this);

  xhr.send();    
};

module.exports = {
  loginRequest: loginRequest,
  authenticate: authenticate,
  getSeminars: getSeminars,
  newAttendance: newAttendance,
  putAttendance: putAttendance,
  apiUrl: apiUrl
}