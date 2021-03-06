import React, { PropTypes } from 'react';
import {Result} from '../../utils/functional';
import T from '../misc/t';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import HighCharts from 'highcharts';
import colours from '../../utils/colours';
import ChartDataLink from '../boilerplate/chart-data-link';

require('stylesheets/charts/tetanus-barchart');

const TetanusBarChart = React.createClass({
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

  getValue(values, metric) {
    return values.reduce((ret, item) => {
      if (item.hasOwnProperty(metric)) {
        ret.value = item[metric];
      }
      return ret;
    }, {value: 0}).value;
  },

  parseData(summary) {
    return Object.keys(summary).map(year => {
      return {
        color: colours.theme,
        name: year,
        data: summary[year].map(itemWithData => itemWithData['TT2 VACCINATION COVERAGE']),
      };
    });
  },

  getChart() {
    if (this.props.data.length === 0) {
      return false;
    }
    const regions = Object.keys(Result.groupBy(this.props.data, 'REGIONS'));
    const sum = Result.groupBy(this.props.data, 'YEAR');
    const stats = this.parseData(sum);
    this.chart = new HighCharts.Chart({
      chart: {
        height: 400,
        type: 'column',
        renderTo: 'tt2-chart',
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
      <div className="tetanus-barchart">
        <h3 className="chart-title"><T k="chart.tetanus-barchart.title" /></h3>
        <span className="helptext"><ChartDataLink dataId="tetanus"/></span>
        <div className="chart-container" id="tt2-chart"></div>
      </div>

    );
  },
});

export default TetanusBarChart;
