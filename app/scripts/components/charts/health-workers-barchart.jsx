import React, { PropTypes } from 'react';
import { Result } from '../../utils/functional';
import T from '../misc/t';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import HighCharts from 'highcharts';
import colours from '../../utils/colours';
import ChartDataLink from '../boilerplate/chart-data-link';

require('stylesheets/charts/health-workers-barchart');

const HealthWorkersBarChart = React.createClass({
  propTypes: {
    data: PropTypes.array.isRequired,
  },

  mixins: [
    ShouldRenderMixin,
  ],

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

  sumAll(regions) {
    return regions.reduce( (ret, item) => {
      Object.keys(item).filter(k => k !== 'total').forEach(k => ret.total += item[k]);
      return ret;
    }, {total: 0}).total;
  },

  findValue(items, region) {
    return items.reduce( (ret, item) => {
      if (item.hasOwnProperty(region)) {
        ret.value = item[region];
      }
      return ret;
    }, {value: 0}).value;
  },

  parseData(summary, regions) {
    return Object.keys(summary)
          .map(age => {
            return {
              color: colours.theme,
              name: age,
              data: regions.map(region => this.findValue(summary[age], region)),
            };
          });
  },

  getChart() {
    if (this.props.data.length === 0) {
      return false;
    }
    const regions = Object.keys(this.props.data[0]).filter(key => key !== 'HEALTH WORKERS' && key !== 'YEAR' && key !== '_id');
    const sum = Result.sumByGroupBy(this.props.data, 'YEAR', regions);
    const stats = this.parseData(sum, regions);
    this.chart = new HighCharts.Chart({
      chart: {
        height: 400,
        type: 'column',
        renderTo: 'health-workers-barchart',
      },

      title: {
        text: '',
      },

      xAxis: {
        categories: regions,
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
    return this.chart;
  },

  render() {
    if (this.props.data.length === 0) {
      return false;
    }
    return (
      <div className="health-workers-barchart">
        <h3 className="chart-title"><T k="chart.health-worker.title" /></h3>
        <span className="helptext"><ChartDataLink /></span>
        <div className="chart-container" id="health-workers-barchart"></div>
      </div>

    );
  },
});

export default HealthWorkersBarChart;
