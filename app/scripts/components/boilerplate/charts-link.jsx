import React, { PropTypes } from 'react';
import { Icon } from 'react-font-awesome';
import T from '../misc/t';

require('stylesheets/boilerplate/charts-link');

const ChartsLink = React.createClass({

  propTypes: {
    onToggle: PropTypes.func.isRequired,
  },

  render() {
    return (
      <button className="charts-trigger" onClick={this.props.onToggle}>
        <div className="charts-link"><Icon type={`area-chart`}/><T k="charts.toggle.closed" /></div>
      </button>
    );
  },
});
export default ChartsLink;
