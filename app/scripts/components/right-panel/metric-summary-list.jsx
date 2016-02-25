import React, { PropTypes } from 'react';
import T from '../misc/t';
import { Icon } from 'react-font-awesome';
import { getNumberOr0 } from '../../utils/number';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import {FormattedNumber, IntlMixin} from 'react-intl';

require('stylesheets/right-panel/metric-summary-list');

const MetricSummaryList = React.createClass({
  propTypes: {
    format: PropTypes.func,
    icons: PropTypes.object,
    metric: PropTypes.object.isRequired,
    showPercentage: PropTypes.bool,
    title: PropTypes.string.isRequired,
  },

  mixins: [ShouldRenderMixin, IntlMixin],

  render() {
    const metric = this.props.metric;
    const icons = this.props.icons ? this.props.icons : {};
    const summaryDiv = metric.values.map(item => {
      const value = this.props.format ? this.props.format(getNumberOr0(item.value)) : getNumberOr0(item.value);
      const icon = icons[item.name] ? (<Icon type={icons[item.name]}/>) : (<div />);
      const perc = this.props.showPercentage ? (<div><span className="number"><FormattedNumber minimumFractionDigits="2" style="percent" value={(value / metric.total)}/></span></div>) : (<div />);
      return (
          <div className="group-content">
            {icon}
            <div className="context">
              <T k={`metric.summary-list.${item.name}`} />
            </div>
            <div className="row">
              <div className="medium-number">
                {perc}
              </div>
              <div className="small-number">
                <FormattedNumber value={value}/>
              </div>
            </div>
          </div>
      );
    });

    return (
      <div className="metric-summary-list">
        <h3 className="chart-title"><T k={this.props.title} /></h3>
        <div className="summary chart-container">{summaryDiv}</div>
      </div>);
  },
});

module.exports = MetricSummaryList;
