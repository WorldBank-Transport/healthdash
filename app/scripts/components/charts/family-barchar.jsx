import React, { PropTypes } from 'react';
import { Result } from '../../utils/functional';
import T from '../misc/t';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import HighCharts from 'highcharts';
import { Color } from '../../utils/colours';
import ChartDataLink from '../boilerplate/chart-data-link';

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

  parseData(summary, keys, regions) {
    return keys.map(metric => {
      return {
        color: Color.getFacilityColor(metric),
        name: metric,
        data: regions.map(region => this.getValue(summary[region], metric)),
      };
    });
  },

  getChart() {
    if (this.props.data.length === 0) {
      return false;
    }
    const keys = ['NEW CLIENTS', 'FAMILY PLANNING CONTINUIOUS'];
    const sum = Result.sumByGroupBy(this.props.data, 'REGION', keys);
    const regions = Object.keys(sum).filter(key => key !== 'total');
    const stats = this.parseData(sum, keys, regions);
    this.chart = new HighCharts.Chart({
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
    return this.chart;
  },

  render() {
    if (this.props.data.length === 0) {
      return false;
    }
    return (
      <div className="family-barchart">
        <h3 className="chart-title"><T k="chart.family-barchart.title" /></h3>
        <span className="helptext"><ChartDataLink dataId="family-planing"/> <T k="chart.family-barchart.helptext" /></span>
        <div className="chart-container" id="family-barchart"></div>
      </div>
    );
  },
});

export default FamilityBarChart;
