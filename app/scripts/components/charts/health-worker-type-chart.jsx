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
    return Object.keys(summary)
          .map(year => {
            return {
              name: year,
              data: summary[year].map(data => this.sumAll(data)),
            };
          });
  },

  getChart() {
    const types = Object.keys(Result.groupBy(this.props.data, 'HEALTH WORKERS'));
    const sum = Result.groupBy(this.props.data, 'YEAR');
    const stats = this.parseData(sum);
    return new HighCharts.Chart({
      chart: {
        height: 1200,
        type: 'bar',
        renderTo: 'worker-by-type',
      },

      title: {
        text: '',
      },

      xAxis: {
        categories: types,
      },

      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true,
      },

      plotOptions: {
        spline: {
          marker: {
            radius: 4,
            lineColor: '#666666',
            lineWidth: 1,
          },
        },
      },

      series: stats,
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
