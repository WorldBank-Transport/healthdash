import React, { PropTypes } from 'react';
import { connect } from 'reflux';
import DataTypes from '../../constants/data-types';
import { Result } from '../../utils/functional';
import T from '../misc/t';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import DataStore from '../../stores/data';
import HighCharts from 'highcharts';
import { Color } from '../../utils/colours';
import ChartDataLink from '../boilerplate/chart-data-link';

require('stylesheets/charts/family-barchart');

const TetanusPlanChart = React.createClass({

  propTypes: {
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
  },

  mixins: [
    connect(DataStore, 'data'),
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

  parseData(summary, keys, years) {
    return keys.map(metric => {
      return {
        color: Color.getFacilityColor(metric),
        name: metric,
        data: years.map(year => this.getValue(summary[year], metric)),
      };
    });
  },

  getChart() {
    const data = this.state.data[this.props.dataType.toParam()];
    if (data.length === 0) {
      return null;
    }
    const keys = ['PROJECTED CLIENTS', 'TOTAL ATTENDANCE'];
    const sum = Result.sumByGroupBy(data, 'YEAR', keys);
    const years = Object.keys(sum).filter(key => key !== 'total');
    const stats = this.parseData(sum, keys, years);
    this.chart = new HighCharts.Chart({
      chart: {
        height: 400,
        type: 'area',
        renderTo: 'tetanus-plan-chart',
      },

      title: {
        text: '',
      },

      xAxis: {
        categories: years,
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
    return (
      <div className="family-barchart">
        <h3 className="chart-title"><T k="chart.tetanus-plan-chart.title" /></h3>
        <span className="helptext"><ChartDataLink dataId="tetanus"/></span>
        <div className="chart-container" id="tetanus-plan-chart"></div>
      </div>
    );
  },
});

export default TetanusPlanChart;
