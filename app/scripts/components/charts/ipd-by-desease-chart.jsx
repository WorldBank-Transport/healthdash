import React, { PropTypes } from 'react';
import { Result } from '../../utils/functional';
import T from '../misc/t';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import HighCharts from 'highcharts';

require('highcharts/modules/exporting')(HighCharts);
require('stylesheets/charts/death-by-age-chart');

const IpdByDeaseaseChart = React.createClass({
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
    const regions = Object.keys(data).filter(key => key !== 'CHILD_TYPE' && key !== 'DISEASES' && key !== 'YEAR' && key !== '_id');
    return regions.reduce( (ret, item) => {
      ret.total += data[item];
      return ret;
    }, {total: 0}).total;
  },

  parseData(summary) {
    return Object.keys(summary)
          .map(age => {
            return {
              name: age,
              data: summary[age].map(data => this.sumAll(data)),
            };
          });
  },

  getChart() {
    if (this.props.data.length === 0) {
      return false;
    }
    const deseases = Object.keys(Result.groupBy(this.props.data, 'DISEASES'));
    const sum = Result.groupBy(this.props.data, 'CHILD_TYPE');
    const stats = this.parseData(sum);
    return new HighCharts.Chart({
      chart: {
        height: 1200,
        type: 'bar',
        renderTo: 'ipd-by-desease-chart',
      },

      title: {
        text: '',
      },

      xAxis: {
        categories: deseases,
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
        <h3 className="chart-title"><T k="chart.ipd-by-desease.title" /> - <span className="chart-helptext"><T k="chart.ipd-by-desease.helptext" /></span></h3>
        <div className="chart-container" id="ipd-by-desease-chart"></div>
      </div>
    );
  },
});

export default IpdByDeaseaseChart;
