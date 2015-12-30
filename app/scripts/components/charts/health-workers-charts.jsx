import React, { PropTypes } from 'react';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import YearSelector from '../filters/year-selector';
import MetricSummary from './metric-summary-chart';
import HealthWorkersBarChart from './health-workers-barchart';
import { Result } from '../../utils/functional';

const HealthWorkersCharts = React.createClass({
  propTypes: {
    children: PropTypes.node, // injected
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    setSelected: PropTypes.func,
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  getTotalWorkers() {
    if (this.props.data.length > 0) {
      const keys = Object.keys(this.props.data[0]).filter(key => key !== 'HEALTH WORKERS' && key !== 'YEAR' && key !== '_id');
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
      <div className="container">
        <div className="row">
          <YearSelector />
        </div>
        <div className="row">
          <MetricSummary icon="workers.png" metric={this.getTotalWorkers()} title="chart.workers.title"/>
        </div>
        <div className="row">
          <HealthWorkersBarChart workers={this.props.data}/>
        </div>
      </div>);
  },
});

export default HealthWorkersCharts;
