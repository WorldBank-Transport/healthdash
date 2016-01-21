import React, { PropTypes } from 'react';
import { connect } from 'reflux';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import MetricSummary from '../charts/metric-summary-chart';
import { Result } from '../../utils/functional';
import PopulationStore from '../../stores/population';
import T from '../misc/t';

const HealthWorkersRightPanel = React.createClass({
  propTypes: {
    children: PropTypes.node, // injected
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    setSelected: PropTypes.func,
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  mixins: [
    connect(PopulationStore, 'population'),
  ],

  getTotalWorkers(summary) {
    if (this.props.data.length > 0) {
      return Object.keys(summary).reduce( (ret, item) => {
        ret.total += summary[item].value;
        return ret;
      }, {total: 0}).total;
    } else {
      return 0;
    }
  },

  getPopulation() {
    return Result.sumBy(this.state.population, 'TOTAL').TOTAL;
  },

  render() {
    if (this.props.data.length === 0) {
      return false;
    }
    const keys = Object.keys(this.props.data[0]).filter(key => key !== 'HEALTH WORKERS' && key !== 'YEAR' && key !== '_id');
    const summary = Result.sumByAll(this.props.data, keys);
    return (
      <div className="container other-selections">
      <h3><T k="data-type.health-workers" /></h3>
        <div className="row">
          <MetricSummary icon="workers.png" metric={this.getTotalWorkers(summary)} title="chart.workers.title"/>
        </div>
        <div className="row">
          <MetricSummary icon="workers.png" metric={Math.round(this.getTotalWorkers(summary) / keys.length)} title="chart.workers-avg.title"/>
        </div>
        <div className="row">
          <MetricSummary icon="workers.png" metric={Math.round(this.getPopulation() / this.getTotalWorkers(summary))} title="chart.workers-people.title"/>
        </div>
      </div>);
  },
});

export default HealthWorkersRightPanel;
