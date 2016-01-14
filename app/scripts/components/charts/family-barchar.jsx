import React, { PropTypes } from 'react';
import { Result } from '../../utils/functional';
import T from '../misc/t';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import HighCharts from 'highcharts';

require('stylesheets/charts/family-barchart');

const FamilityBarChart = React.createClass({
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

  parseData(summary, keys, regions) {
    return keys.map(metric => {
      return {
        name: metric,
        data: regions.map(region => this.getValue(summary[region], metric)),
      };
    });
  },

  getChart() {
    const keys = ['NEW CLIENTS', 'FAMILY PLANNING CONTINUIOUS'];
    const sum = Result.sumByGroupBy(this.props.data, 'REGION', keys);
    const regions = Object.keys(sum).filter(key => key !== 'total');
    const stats = this.parseData(sum, keys, regions);
    return new HighCharts.Chart({
      chart: {
        height: 400,
        type: 'column',
        renderTo: 'family-barchart',
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
      <div className="family-barchart">
        <h3 className="chart-title"><T k="chart.family-barchart.title" /> - <span className="chart-helptext"><T k="chart.family-barchart.helptext" /></span></h3>
        <div className="chart-container" id="family-barchart"></div>
      </div>
    );
  },
});

export default FamilityBarChart;
