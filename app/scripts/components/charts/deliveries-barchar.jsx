import React, { PropTypes } from 'react';
import * as func from '../../utils/functional';
import T from '../misc/t';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import HighCharts from 'highcharts';

require('stylesheets/charts/deliveries-barchart');

const DeliveriesBarChart = React.createClass({
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
        name: metric,
        data: regions.map(region => this.getValue(summary[region], metric)),
      };
    });
  },

  getChart() {
    if (this.props.data.length === 0) {
      return false;
    }
    const keys = ['HEALTH FACILITY DELIVERIES', 'TRADITIONAL BIRTH ATTENDANTS (TBA)', 'BORN BEFORE ARRIVAL (BBA)', 'HOME DELIVERY'];
    const sum = func.Result.sumByGroupBy(this.props.data, 'REGION', keys);
    const regions = Object.keys(sum).filter(key => key !== 'total');
    const stats = this.parseData(sum, keys, regions);
    this.chart = new HighCharts.Chart({
      chart: {
        height: 400,
        type: 'column',
        renderTo: 'deliveries-barchart',
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
        column: {
          stacking: 'normal',
        },
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
      <div className="container">
        <div className="secondaryCharts">
          <div className="row">
            <div className="mainChart">
              <div className="deliveries-barchart">
                <h3 className="chart-title"><T k="chart.deliveries-barchart.title" /> - <span className="chart-helptext"><T k="chart.deliveries-barchart.helptext" /></span></h3>
                <div className="chart-container" id="deliveries-barchart"></div>
              </div>
            </div>
          </div>
        </div>
      </div>);
  },
});

export default DeliveriesBarChart;
