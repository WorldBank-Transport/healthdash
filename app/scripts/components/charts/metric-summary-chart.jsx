import React, { PropTypes } from 'react';
import T from '../misc/t';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import {FormattedNumber, IntlMixin} from 'react-intl';

require('stylesheets/charts/metric-summary-chart');

const MetricSummary = React.createClass({
  propTypes: {
    format: PropTypes.func,
    icon: PropTypes.string,
    metric: PropTypes.number.isRequired,
    sufix: PropTypes.string,
    title: PropTypes.string.isRequired,
  },

  mixins: [ShouldRenderMixin, IntlMixin],

  render() {
    const formattedValue = this.props.format ? this.props.format(this.props.metric) : this.props.metric;
    const icon = this.props.icon ? (<img className="panel-icon" src={`images/${this.props.icon}`} />) : '';
    return (
      <div className="metric-summary">
        <h3 className="chart-title"><T k={this.props.title} /></h3>
        <div className="summary chart-container">
          <div className="group-content">
            {icon}
            <div className="medium-number padding">
              <span className="number"><FormattedNumber value={formattedValue} /></span>
              {this.props.sufix}
            </div>
          </div>
        </div>
      </div>);
  },
});

module.exports = MetricSummary;
