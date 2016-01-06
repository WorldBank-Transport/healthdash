import React, { PropTypes } from 'react';
import Checkbox from '../misc/checkbox';
import { changeMetric } from '../../actions/metrics';

require('stylesheets/filters/metric-selector');

const MetricSelector = React.createClass({

  propTypes: {
    metrics: PropTypes.object.isRequired,
  },

  select(value) {
    return (e) => {
      e.preventDefault();
      changeMetric(value);
    };
  },

  render() {
    if (Object.keys(this.props.metrics).length <= 1) {
      return false;
    }
    const listOfOptions = Object.keys(this.props.metrics).map(metric => {
      return (<li key={`filter-${metric}`}><Checkbox action={this.select(metric)} checked={this.props.metrics[metric]} label={`filter.metric.${metric}`} /></li>);
    });
    return (
      <div className="metric-selector">
        <ul className="metrics">
          {listOfOptions}
        </ul>
      </div>
    );
  },
});

export default MetricSelector;
