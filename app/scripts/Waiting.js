var React = require('react');

var Waiting = React.createClass({

    render: function() {

        return (
        <div className="alert alert-info">
          {this.props.info}
        </div>
        );
    }
});

module.exports = Waiting