import React, { PropTypes } from 'react';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import MetricSummary from '../charts/metric-summary-chart';
import { Result } from '../../utils/functional';

const OpdRightPanel = React.createClass({
  propTypes: {
    children: PropTypes.node, // injected
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    setSelected: PropTypes.func,
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  getTotalOpd(keys) {
    const summary = Result.sumByAll(this.props.data, keys);
    return Object.keys(summary).reduce( (ret, item) => {
      ret.total += summary[item].value;
      return ret;
    }, {total: 0}).total;
  },

  getTotalOpdByAge(statsByAge, keys) {
    return statsByAge.reduce( (ret, item, i) => {
      ret.total += item[keys[i]];
      return ret;
    }, {total: 0}).total;
  },


  render() {
    if (this.props.data.length === 0) {
      return false;
    }
    const keys = Object.keys(this.props.data[0]).filter(key => key !== 'CHILD_TYPE' && key !== 'DISEASES' && key !== 'YEAR' && key !== '_id');
    const total = this.getTotalOpd(keys);
    const statsByAge = Result.sumByGroupBy(this.props.data, 'CHILD_TYPE', keys);
    return (
      <div className="container other-selections">
        <div className="row">
          <MetricSummary icon="opd.png" metric={total} title="chart.opd.title"/>
        </div>
        <div className="row">
          <MetricSummary icon="opd.png" metric={Math.round(total / keys.length)} title="chart.opd-region.title"/>
        </div>
        {Object.keys(statsByAge).map(age => (
          <div className="row">
            <MetricSummary icon="opd.png" metric={this.getTotalOpdByAge(statsByAge[age], keys)} title={`chart.opd-${age}.title`}/>
          </div>
        ))}
      </div>);
  },
});

export default OpdRightPanel;
