import React, { PropTypes } from 'react';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import MetricSummary from '../charts/metric-summary-chart';
import { Result } from '../../utils/functional';

const DeathRightPanel = React.createClass({
  propTypes: {
    children: PropTypes.node, // injected
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    setSelected: PropTypes.func,
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  getTotalDeath() {
    if (this.props.data.length > 0) {
      const keys = Object.keys(this.props.data[0]).filter(key => key !== 'CHILD_TYPE' && key !== 'DISEASE' && key !== 'YEAR' && key !== '_id');
      const summary = Result.sumByAll(this.props.data, keys);
      return Object.keys(summary).reduce( (ret, item) => {
        ret.total += summary[item].value;
        return ret;
      }, {total: 0}).total;
    } else {
      return 0;
    }
  },

  render() {
    return (
      <div className="container other-selections">
        <div className="row">
          <MetricSummary icon="deaths.png" metric={this.getTotalDeath()} title="chart.deaths.title"/>
        </div>
      </div>);
  },
});

export default DeathRightPanel;
