import React, { PropTypes } from 'react';
import { Result } from '../../utils/functional';
import T from '../misc/t';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import HighCharts from 'highcharts';
import colours from '../../utils/colours';
import ChartDataLink from '../boilerplate/chart-data-link';

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

  componentWillUnmount() {
    if (this.chart) {
      this.chart.destroy();
      delete this.chart;
    }
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
                color: colours.theme,
                name: data['HEALTH WORKERS'],
                value: this.sumAll(data),
              });
            });
          });
    return result;
  },

  getChart() {
    if (this.props.data.length === 0) {
      return false;
    }
    const sum = Result.groupBy(this.props.data, 'YEAR');
    const stats = this.parseData(sum);
    this.chart = new HighCharts.Chart({
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
    return this.chart;
  },

  render() {
    if (this.props.data.length === 0) {
      return false;
    }
    return (
      <div className="death-by-age-chart">
        <h3 className="chart-title"><T k="chart.worker-by-type.title" /></h3>
        <span className="helptext"><ChartDataLink /> <T k="chart.worker-by-type.helptext" /></span>
        <div className="chart-container" id="worker-by-type"></div>
      </div>
    );
  },
});

export default HealthWorkerTypeChart;
