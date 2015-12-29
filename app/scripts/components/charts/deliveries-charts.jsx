import React, { PropTypes } from 'react';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import DeliveriesBarChart from './deliveries-barchar';
import MetricSummary from './metric-summary-chart';
import { Result } from '../../utils/functional';

const DeliveriesCharts = React.createClass({
  propTypes: {
    children: PropTypes.node, // injected
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    setSelected: PropTypes.func,
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },
  getDeliveries() {
    return Result.sumBy(this.props.data, 'TOTAL').TOTAL;
  },

  render() {
    return (
      <div className="container">
        <div className="row">
          <MetricSummary icon="deliveries.png" metric={this.getDeliveries()} title="chart.deliveries.title"/>
        </div>
        <div className="row">
          <div className="mainChart">
            <DeliveriesBarChart deliveries={this.props.data} viewMode={this.props.viewMode} />
          </div>
        </div>
      </div>);
  },
});

export default DeliveriesCharts;
