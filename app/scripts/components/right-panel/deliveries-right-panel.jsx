import React, { PropTypes } from 'react';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import MetricSummary from '../charts/metric-summary-chart';
import { Result } from '../../utils/functional';
import T from '../misc/t';

const metrics = ['TOTAL', 'HEALTH FACILITY DELIVERIES', 'TRADITIONAL BIRTH ATTENDANTS (TBA)', 'ANTENATAL CARE PROJECTION', 'BORN BEFORE ARRIVAL (BBA)', 'HOME DELIVERY'];

const DeliveriesRightPanel = React.createClass({
  propTypes: {
    children: PropTypes.node, // injected
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    setSelected: PropTypes.func,
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },
  getDeliveries(stats, m) {
    return stats[m].value || 0;
  },

  render() {
    const stats = Result.sumByAll(this.props.data, metrics);
    return (
      <div className="container other-selections">
      <h3><T k="data-type.deliveries" /></h3>
        <div className="row">
          <MetricSummary icon="deliveries.png" metric={Math.round(stats.TOTAL.value / stats.TOTAL.total)} title={`chart.deliveries-average.title`}/>
        </div>
        <ul className="deliveries-list">
        {metrics.map(m => (
          <li>
            <MetricSummary icon="deliveries.png" metric={this.getDeliveries(stats, m)} title={`chart.deliveries-${m}.title`}/>
          </li>
        ))}
        </ul>
      </div>);
  },
});

export default DeliveriesRightPanel;
