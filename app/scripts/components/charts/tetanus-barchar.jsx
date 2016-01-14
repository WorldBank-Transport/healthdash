import React, { PropTypes } from 'react';
import {Result} from '../../utils/functional';
import T from '../misc/t';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import HighCharts from 'highcharts';

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
    return new HighCharts.Chart({
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
  },

  render() {
    if (this.props.data.length === 0) {
      return (<div>empty</div>);
    }
    return (
      <div className="tetanus-barchart">
        <h3 className="chart-title"><T k="chart.tetanus-barchart.title" /> - <span className="chart-helptext"><T k="chart.tetanus-barchart.helptext" /></span></h3>
        <div className="chart-container" id="tt2-chart"></div>
      </div>

    );
  },
});

export default TetanusBarChart;
