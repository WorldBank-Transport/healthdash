import React, { PropTypes } from 'react';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import MetricSummary from '../charts/metric-summary-chart';
import { Result } from '../../utils/functional';
import MetricSummaryList from './metric-summary-list';
import ChartsLink from '../boilerplate/charts-link';
import T from '../misc/t';

const DeathRightPanel = React.createClass({
  propTypes: {
    children: PropTypes.node, // injected
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    setSelected: PropTypes.func,
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  getTotalDeath(summary) {
    return Object.keys(summary).reduce( (ret, item) => {
      ret.total += summary[item].value;
      return ret;
    }, {total: 0}).total;
  },

  sumDeath(summary) {
    return summary.reduce( (ret, item) => {
      ret.total += item[Object.keys(item).filter(key => key !== 'total')];
      return ret;
    }, {total: 0}).total;
  },

  getDeathCauses(keys) {
    const summary = Result.sumByGroupBy(this.props.data, 'DISEASE', keys);
    const deseases = Object.keys(summary).map(desease => ({
      name: desease,
      value: this.sumDeath(summary[desease], keys),
    })).sort((a, b) => b.value - a.value);
    return deseases.slice(0, 5);
  },

  render() {
    if (this.props.data.length === 0) {
      return false;
    }
    const regions = Object.keys(this.props.data[0]).filter(key => key !== 'CHILD_TYPE' && key !== 'DISEASE' && key !== 'YEAR' && key !== '_id');
    const summary = Result.sumByAll(this.props.data, regions);
    const death = this.getTotalDeath(summary);
    const desease = {
      values: this.getDeathCauses(regions),
      total: death,
    };
    return (
      <div className="container other-selections">
      <h3><T k="data-type.death" /></h3>
        <div className="row">
          <div className="col-half">
            <MetricSummary icon="deaths.png" metric={death} title="chart.deaths.title"/>
          </div>
          <div className="col-half">
            <MetricSummary icon="deaths.png" metric={Math.round(death / regions.length)} title="chart.deaths-avg.title"/>
          </div>
        </div>
        <div className="row">
          <MetricSummaryList metric={desease} showPercentage={true} title="chart.death-deseases.title"/>
        </div>
        <button className="charts-trigger" href=""><ChartsLink /></button>
      </div>);
  },
});

export default DeathRightPanel;
