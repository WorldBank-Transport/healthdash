import React, { PropTypes } from 'react';

require('stylesheets/charts/charts');

const Charts = React.createClass({
  propTypes: {
    children: PropTypes.node,
  },

  render() {
    return (
        <div className="charts">
          charts
        </div>
      );
  },
});

export default Charts;