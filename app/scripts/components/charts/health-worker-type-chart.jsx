import React, { PropTypes } from 'react';
import { Result } from '../../utils/functional';
import T from '../misc/t';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import HighCharts from 'highcharts';

require('stylesheets/charts/death-by-age-chart');

const HealthWorkerTypeChart = React.createClass({
  propTypes: {
    data: PropTypes.array.isRequired,
  },

  mixins: [ShouldRenderMixin],

  componentDidMount() {
    this.getChart();
  },

  componentDidUpdate() {
    this.getChart();
  },

  sumAll(data) {
    const regions = Object.keys(data).filter(key => key !== 'HEALTH WORKERS' && key !== 'YEAR' && key !== '_id');
    return regions.reduce( (ret, item) => {
      ret.total += data[item];
      return ret;
    }, {total: 0}).total;
  },

  parseData(summary) {
    const result = [];
    Object.keys(summary)
          .forEach(year => {
            summary[year].forEach(data => {
              result.push({
                name: data['HEALTH WORKERS'],
                value: this.sumAll(data),
              });
            });
          });
    return result;
  },

  getChart() {
    const sum = Result.groupBy(this.props.data, 'YEAR');
    const stats = this.parseData(sum);
    return new HighCharts.Chart({
      chart: {
        height: 600,
        renderTo: 'worker-by-type',
      },

      title: {
        text: '',
      },

      series: [{
        type: 'treemap',
        layoutAlgorithm: 'squarified',
        alternateStartingDirection: true,
        data: stats,
      }],
    });
  },

  render() {
    if (this.props.data.length === 0) {
      return (<div>empty</div>);
    }
    return (
      <div className="death-by-age-chart">
        <h3 className="chart-title"><T k="chart.worker-by-type.title" /> - <span className="chart-helptext"><T k="chart.worker-by-type.helptext" /></span></h3>
        <div className="chart-container" id="worker-by-type"></div>
      </div>
    );
  },
});

export default HealthWorkerTypeChart;
